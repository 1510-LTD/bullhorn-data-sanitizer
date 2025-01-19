import React from "react";
import styled from "styled-components";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}
interface InnerCardProps extends Omit<CardProps, "elevation"> {
  $elevation: number;
}

const CardBase = styled.div<InnerCardProps>`
  background: #ffffff;
  padding: var(--space-300);
  box-shadow: var(--elevation-${({ $elevation = 0 }) => $elevation});
  border-radius: var(--border-radius-ms);
  border: ${({ $elevation }) =>
    $elevation === 0 ? "1px solid rgba(232, 232, 232, 1)" : "none"};
  position: relative;
`;

export const Card = ({ elevation = 0, ...props }: CardProps) => {
  return <CardBase $elevation={elevation} {...props} />;
};
