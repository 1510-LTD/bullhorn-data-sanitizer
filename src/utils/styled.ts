import styled from "styled-components";

export const FlexGapWrapper = styled.div<{ $gap?: string }>`
  display: flex;
  gap: ${({ $gap }) => $gap};
`;

export const FlexColumnGapWrapper = styled.div<{ $gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap};
`;
