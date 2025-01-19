import { Heading } from "@/utils/fonts";
import React from "react";

import styled from "styled-components";

export interface LayoutHeadingProps {
  title: string;
  icon?: React.ReactNode;
}

const TopHeading: React.FC<LayoutHeadingProps> = ({ title, icon }) => {
  return (
    <TopHeadingWrapper>
      {!!icon && <IconWrapper>{icon}</IconWrapper>}
      <Heading>{title}</Heading>
    </TopHeadingWrapper>
  );
};

export default TopHeading;

const IconWrapper = styled.div`
  width: 1.75rem;

  span {
    width: 1.75rem;
    height: 1.75rem;
    height: 100%;
  }
`;

const TopHeadingWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;
