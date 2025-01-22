"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, WrenchIcon } from "@/component/icons";
import TopHeading from "@/component/TopHeading";

import { BodyText2 } from "@/utils/fonts";
import styled from "styled-components";

import { FlexColumnGapWrapper } from "@/utils/styled";
import { Autocomplete } from "@/component/autocomplete";
import { titleCase } from "string-ts";
import {
  getBhEntityDuplicates,
  getBhEntityFields
} from "@/app/hooks/useBullhorn";
import EntityList from "./entityList";
import { Button } from "@/component/button";
import Loading from "@/component/Loading";
import toast from "react-hot-toast";
import { BhDuplicates } from "@/app/app-types";

const bullhornEntities = [
  "Candidate",
  "ClientContact",
  "ClientCorporation"
] as const;

export default function DuplicateDetection() {
  const [entity, setEntity] = useState<(typeof bullhornEntities)[number]>();
  const [availableFields, setAvailableFields] = useState<{
    [key in (typeof bullhornEntities)[number]]?: {
      label: string;
      name: string;
    }[];
  }>();
  const [fields, setFields] = useState<{ label: string; name: string }[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [duplicates, setDuplicates] = useState<BhDuplicates>({});
  const [start, setStart] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const fieldMapping = useMemo(() => {
    return fields.reduce(
      (acc, field) => {
        acc[field.name] = field.label;
        return acc;
      },
      {} as { [key: string]: string }
    );
  }, [fields]);

  useEffect(() => {
    async function fetchFields() {
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
  }, [entity]);

  const handleFindDuplicates = async () => {
    if (!entity) {
      toast.error("Please select an entity");
      return;
    }
    setIsLoading(true);

    try {
      const { duplicatesRecords, start: nextStart } =
        await getBhEntityDuplicates(
          entity,
          selectedFields,
          start,
          10,
          50 // return the response in 50 seconds to avoid timeout
        );
      if (Object.keys(duplicatesRecords).length === 0)
        toast.error("No duplicates found");

      setDuplicates(duplicatesRecords);
      setStart(nextStart);
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
      <TopHeading title={"Duplicate Detection"} icon={<WrenchIcon />} />
      <TitleBarContainer>
        <FlexColumnGapWrapper $gap="0.25">
          <BodyText2>
            Select an entity you want to work with and the fields you want to
            compare to find duplicates
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
        label="Select fields to compare"
        placeholder="Select fields to compare"
        disabled={!fields.length}
        multiple
        filterSelectedOptions
        value={selectedFields}
        options={fields.map((field) => ({
          value: field.name,
          label: field.label
        }))}
        onChange={(value) => {
          setSelectedFields(value as string[]);
        }}
      />

      <Button
        trailingIcon={<WrenchIcon />}
        label="Find Duplicates"
        onClick={handleFindDuplicates}
        disabled={!entity || !selectedFields.length}
      />

      <VerticalDivider />

      {entity && selectedFields.length > 0 && (
        <>
          <EntityList
            entity={entity}
            data={duplicates}
            fieldMapping={fieldMapping}
          />

          <PaginationContainer>
            <Button
              leadingIcon={<ArrowLeftIcon />}
              outlined
              label="First Page"
              disabled={start === 0}
              onClick={() => {
                setStart(0);
                handleFindDuplicates();
              }}
            />
            <Button
              label="Next"
              outlined
              trailingIcon={<ArrowRightIcon />}
              disabled={!selectedFields.length}
              onClick={handleFindDuplicates}
            />
          </PaginationContainer>
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1.5rem;
  line-height: 1.2;
`;
