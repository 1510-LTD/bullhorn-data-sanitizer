import styled, { CSSProperties } from "styled-components";
import { IconProps, IconSize } from "./contracts";

const getSize = ({ size = "large" }: IconProps) => {
  const sizeMap: Record<IconSize, CSSProperties["height"]> = {
    smaller: "0.75rem",
    small: "1rem",
    medium: "1.25rem",
    large: "1.5rem",
    larger: "2rem"
  };
  return sizeMap[size];
};

export const IconWrapper = styled.span<IconProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  fill: currentColor;
  height: ${getSize};
  aspect-ratio: 1;
  > svg {
    height: 100%;
    width: 100%;
  }
`;
