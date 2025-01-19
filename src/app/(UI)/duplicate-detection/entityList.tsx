"use client";

import React from "react";
import styled from "styled-components";

import { FlexColumnGapWrapper } from "@/utils/styled";
import EntityCard from "./entityCard";
import { BhDuplicates } from "@/app/app-types";

type Props = {
  data: BhDuplicates;
  fieldMapping: {
    [key: string]: string;
  };
};

export default function EntityList({ data, fieldMapping }: Props) {
  return (
    <Container>
      <FlexColumnGapWrapper $gap={"0.5rem"}>
        {Object.entries(data).map(([key, value]) => (
          <EntityCard
            key={key}
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
