import { FC, ReactNode } from "react";

import styled from "styled-components";

import { FlexColumnGapWrapper } from "../utils/styled";
import { BodyText1 } from "@/utils/fonts";
import { Button } from "./button";
import { Card } from "./Card";

interface Props {
  title: string;
  children: ReactNode;
  onClick: () => void;
  leadingIcon?: JSX.Element; // Add other properties in the props if needed
}
const ListCard: FC<Props> = ({ title, leadingIcon, children, onClick }) => (
  <ListCardContainer>
    <ContentContainer $gap="1rem">
      <CardTitleText>{title}</CardTitleText>
      {children}
    </ContentContainer>
    <Button onClick={onClick} outlined leadingIcon={leadingIcon} />
  </ListCardContainer>
);

export default ListCard;

const ContentContainer = styled(FlexColumnGapWrapper)`
  width: 100%;
`;

const ListCardContainer = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
  gap: 1.5rem;
`;

const CardTitleText = styled(BodyText1)``;
