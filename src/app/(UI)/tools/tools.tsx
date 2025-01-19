"use client";

import styled from "styled-components";
import ToolCards from "./toolCards";

export default function Tools() {
  return (
    <ToolsLayoutWrapper>
      <ToolCards />
    </ToolsLayoutWrapper>
  );
}

const ToolsLayoutWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  margin-inline: auto;
`;
