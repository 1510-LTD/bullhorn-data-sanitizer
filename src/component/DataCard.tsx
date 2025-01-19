import React from "react";

import styled from "styled-components";
import { Badge, BadgeProps } from "./badge";

const colorsTheme = {
  green: {
    icon: "var(--green-main)",
    background: "var(--green-secondary)",
    border: "var(--green-tertiary)"
  },
  purple: {
    icon: "var(--purple-main)",
    background: "var(--purple-secondary)",
    border: "var(--purple-tertiary)"
  },
  teal: {
    icon: "rgb(var(--clr-rgb-tertiary-40))",
    background: "rgb(var(--clr-rgb-tertiary-99))",
    border: "rgb(var(--clr-rgb-tertiary-95))"
  },
  blue: {
    icon: "rgb(var(--clr-rgb-secondary-40))",
    background: "rgb(var(--clr-rgb-secondary-98))",
    border: "rgb(var(--clr-rgb-secondary-95))"
  }
};

type DataCardIconColorTypes = keyof typeof colorsTheme;

interface DataCardHeaderProps {
  icon?: React.ReactNode;
  iconColor?: DataCardIconColorTypes;
  badgeValue?: string;
  badgeType?: BadgeProps["type"];
  subText?: string;
}

const CardHeaderView = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardHeaderIcon = styled.div<{ $iconColor: DataCardIconColorTypes }>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ $iconColor }) => colorsTheme[$iconColor].icon};
  border: 1px solid ${({ $iconColor }) => colorsTheme[$iconColor].border};
  background: ${({ $iconColor }) => colorsTheme[$iconColor].background};
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 0.25rem;
`;

const CardHeaderIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CardHeaderSubText = styled.div`
  font-size: 0.875rem;
  color: var(--text-gray);
  font-weight: 600;
  line-height: 1.25rem;
`;

export const DataCardHeader: React.FC<DataCardHeaderProps> = ({
  icon,
  iconColor,
  badgeValue,
  badgeType,
  subText
}) => {
  return (
    <CardHeaderView data-testid="dashboardStats">
      {icon && iconColor && (
        <CardHeaderIcon $iconColor={iconColor}>{icon}</CardHeaderIcon>
      )}
      <CardHeaderIconContainer>
        {badgeValue && badgeType && (
          <Badge type={badgeType} label={badgeValue} />
        )}
        {subText && <CardHeaderSubText>{subText}</CardHeaderSubText>}
      </CardHeaderIconContainer>
    </CardHeaderView>
  );
};

interface CardBodyProps {
  description?: string;
  value?: string;
  subText?: string;
}

const CardBodyView = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 0;
  margin-top: 1.5rem;
`;

const CardBodyText = styled.div`
  font-size: 0.75rem;
  color: var(--text-gray);
  letter-spacing: 0.4px;
  font-weight: 400;
  line-height: 1rem;
  /* margin: 0.5rem 0; */
`;

const CardBodyValue = styled.div`
  font-size: 1.75rem;
  font-weight: 400;
  line-height: 2.25rem;
`;

export const DataCardBody: React.FC<CardBodyProps> = ({
  description,
  value,
  subText
}: CardBodyProps) => {
  return (
    <CardBodyView>
      {description && <CardBodyText>{description}</CardBodyText>}
      {value && <CardBodyValue>{value}</CardBodyValue>}
      {subText && <CardBodyText>{subText}</CardBodyText>}
    </CardBodyView>
  );
};

const CardView = styled.div`
  background: var(--secondary-background-color);
  box-sizing: border-box;
  border-radius: var(--border-radius-ms);
  padding: 1.5rem;
  height: 100%;
  box-shadow:
    0px 2px 6px 2px rgba(0, 0, 0, 0.15),
    0px 1px 2px 0px rgba(0, 0, 0, 0.3);
`;

const DataCard = ({ children }: { children: React.ReactNode }) => {
  return <CardView>{children}</CardView>;
};

export default DataCard;
