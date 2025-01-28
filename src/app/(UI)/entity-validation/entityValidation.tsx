"use client";

import React, { useEffect, useMemo, useState } from "react";
import { WrenchIcon } from "@/component/icons";
import TopHeading from "@/component/TopHeading";

import { BodyText1, BodyText2 } from "@/utils/fonts";
import styled from "styled-components";

import { FlexColumnGapWrapper } from "@/utils/styled";
import { Autocomplete } from "@/component/autocomplete";
import { titleCase } from "string-ts";
import {
  getBhEntityFields,
  getBhInvalidEntities
} from "@/app/hooks/useBullhorn";
import EntityList from "./entityList";
import { Button } from "@/component/button";
import Loading from "@/component/Loading";
import toast from "react-hot-toast";
import { Badge } from "@/component/badge";

const bullhornEntities = [
  // "Candidate",
  "ClientContact"
] as const;

type Field = {
  label: string;
  name: string;
  type?: string;
  associatedEntity?: {
    entity: string;
    fields: Field[];
  };
  fields?: Field[];
};

const commonCompositeFields: { label: string; name: string }[] = [
  {
    label: "Address City",
    name: "address.city"
  },
  {
    label: "Address State",
    name: "address.state"
  }
];

export default function DuplicateDetection() {
  const [entity, setEntity] = useState<(typeof bullhornEntities)[number]>();
  const [availableFields, setAvailableFields] = useState<{
    [key in (typeof bullhornEntities)[number]]?: {
      label: string;
      name: string;
    }[];
  }>();
  const [fields, setFields] = useState<Field[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [invalidRecords, setInvalidRecords] = useState<
    {
      [key: string]: unknown;
    }[]
  >();
  const [start, setStart] = useState<number>(0);
  const [count, setCount] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const fieldMapping = useMemo(() => {
    return fields.reduce(
      (acc, field) => {
        if (field.type !== "SCALAR") return acc;

        acc[field.name] = field.label;

        return acc;
      },
      {} as { [key: string]: string }
    );
  }, [fields]);

  const searchableFields = useMemo(() => {
    return fields.reduce(
      (acc, field) => {
        if (field.type !== "SCALAR") return acc;

        acc[field.name] = field.label;

        return acc;
      },
      {} as { [key: string]: string }
    );
  }, [fields]);

  useEffect(() => {
    async function fetchFields() {
      setInvalidRecords(undefined);
      setTotalCount(0);
      if (entity) {
        if (availableFields && availableFields[entity]) {
          setFields(availableFields[entity]);
        } else {
          setFields([]);
          setIsLoading(true);
          try {
            const fields = await getBhEntityFields(entity);
            setFields(fields);
            setAvailableFields((prev) => ({
              ...prev,
              [entity]: fields
            }));
          } catch (error) {
            toast.error("Unable to fetch fields");
          }
          setIsLoading(false);
        }
      }
    }
    fetchFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entity]);

  const handleFindInvalidRecords = async (startIndex?: number) => {
    setInvalidRecords(undefined);
    if (!entity) {
      toast.error("Please select an entity");
      return;
    }
    setIsLoading(true);

    try {
      const {
        data: invalidRecords,
        total,
        start: started
      } = await getBhInvalidEntities(
        entity,
        selectedFields,
        startIndex ?? start,
        count
      );
      setTotalCount(total);
      setStart(started);
      if (invalidRecords.length === 0) toast.error("No duplicates found");

      setInvalidRecords(invalidRecords);
      setStart(count);
    } catch (error) {
      toast.error("Unable to fetch duplicates. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <Container>
      {isLoading && (
        <Loading>
          <BodyText2>
            We are conducting a thorough search in your Bullhorn Database. This
            might take a moment, thank you for your patience.
          </BodyText2>
        </Loading>
      )}
      <TopHeading title={"Entity Validation"} icon={<WrenchIcon />} />
      <TitleBarContainer>
        <FlexColumnGapWrapper $gap="0.25">
          <BodyText2>
            Select an entity you want to work with and the fields you want to
            check for invalid records
          </BodyText2>
        </FlexColumnGapWrapper>

        <Autocomplete
          label="Select entity to work with"
          placeholder="Select entity to work with"
          options={bullhornEntities.map((entity) => ({
            value: entity,
            label: titleCase(entity)
          }))}
          onChange={(value) => {
            setEntity(value as (typeof bullhornEntities)[number]);
            setStart(0);
          }}
          value={entity}
        />
      </TitleBarContainer>
      <Autocomplete
        label="Select fields to check for nullish values"
        placeholder="Select fields to check for nullish values"
        disabled={!fields.length}
        multiple
        filterSelectedOptions
        value={selectedFields}
        options={Object.entries(searchableFields)
          .map(([value, label]) => ({
            value,
            label
          }))
          .concat(
            commonCompositeFields.map((field) => ({
              value: field.name,
              label: field.label
            }))
          )}
        onChange={(value) => {
          setSelectedFields(value as string[]);
        }}
      />

      <Button
        trailingIcon={<WrenchIcon />}
        label="Find Invalid Records"
        onClick={() => handleFindInvalidRecords()}
        disabled={!entity || !selectedFields.length}
      />

      <VerticalDivider />

      {entity && selectedFields.length > 0 && invalidRecords && (
        <>
          <BodyText1>
            {titleCase(entity)} with nullish values in the selected fields :{" "}
            <Badge
              type={totalCount > 0 ? "error" : "success"}
              label={` ${totalCount}`}
            />
          </BodyText1>

          <EntityList
            entity={entity}
            data={invalidRecords}
            fieldMapping={fieldMapping}
            start={start}
            count={count}
            totalCount={totalCount}
            setStart={setStart}
            setCount={setCount}
            handleFindInvalidRecords={handleFindInvalidRecords}
          />
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
`;

const TitleBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
`;

const VerticalDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
  margin-bottom: 0.5rem;
`;
