"use client";

import React from "react";
import styled from "styled-components";

import { FlexColumnGapWrapper } from "@/utils/styled";
import EntityCard from "./entityCard";
import { BhDuplicates } from "@/app/app-types";

type Props = {
  entity: string;
  data: BhDuplicates;
  fieldMapping: {
    [key: string]: string;
  };
};

export default function EntityList({ entity, data, fieldMapping }: Props) {
  return (
    <Container>
      <FlexColumnGapWrapper $gap={"0.5rem"}>
        {Object.entries(data).map(([key, value]) => (
          <EntityCard
            key={key}
            entity={entity}
            data={{ [key]: value }}
            fieldMapping={fieldMapping}
          />
        ))}
      </FlexColumnGapWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: scroll;
  height: 450px;
`;
