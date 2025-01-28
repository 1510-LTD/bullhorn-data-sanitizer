import { Button } from "@/component/button";
import { Card } from "@/component/Card";

import {
  ArrowForwardIcon,
  LabProfileIcon,
  SearchIcon
} from "@/component/icons";
import { CaptionText } from "@/utils/fonts";
import { FlexColumnGapWrapper, FlexGapWrapper } from "@/utils/styled";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const colorsTheme = {
  green: {
    icon: `rgb(var(--clr-rgb-success-40))`,
    background: `rgb(var(--clr-rgb-success-95))`,
    border: `rgb(var(--clr-rgb-success-90))`
  },
  purple: {
    icon: `rgb(var(--clr-rgb-primary-40))`,
    background: `rgb(var(--clr-rgb-primary-95))`,
    border: `rgb(var(--clr-rgb-primary-90))`
  },
  teal: {
    icon: `rgb(var(--clr-rgb-tertiary-40))`,
    background: `rgb(var(--clr-rgb-tertiary-99))`,
    border: `rgb(var(--clr-rgb-tertiary-95))`
  },
  blue: {
    icon: `rgb(var(--clr-rgb-secondary-40))`,
    background: `rgb(var(--clr-rgb-secondary-98))`,
    border: `rgb(var(--clr-rgb-secondary-95))`
  }
};

type DataCardIconColorTypes = keyof typeof colorsTheme;

type ToolCard = {
  label: string;
  icon: React.ReactNode;
  iconColor: DataCardIconColorTypes;
  description: string;
  isDisabled?: boolean;
};

const data: ToolCard[] = [
  {
    label: "Duplicate Detection",
    icon: <SearchIcon />,
    iconColor: "blue",
    description: "Detect duplicate entities in your bullhorn database"
  },
  {
    label: "Entity Validation",
    icon: <LabProfileIcon />,
    iconColor: "teal",
    description:
      "Search and validate incomplete entities in your bullhorn database"
  }
];

const ToolCards = () => {
  const router = useRouter();

  const handleClick = (tool: ToolCard) => {
    router.push(`/${tool.label.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <ToolsLayoutWrapper>
      <ToolCardWrapper>
        {data.map((card) => (
          <ToolCard
            elevation={2}
            key={card.label}
            onClick={() => !card.isDisabled && handleClick(card)}
          >
            <FlexRowGapWrapper>
              <CardHeaderIcon $iconColor={card.iconColor}>
                {card.icon}
              </CardHeaderIcon>

              <FlexColumnGapWrapper $gap="0.25rem">
                <CaptionText>{card.description}</CaptionText>
                <CardBodyText>{card.label}</CardBodyText>
              </FlexColumnGapWrapper>
              <Button
                leadingIcon={<ArrowForwardIcon />}
                outlined
                disabled={card.isDisabled}
                onClick={() => handleClick(card)}
              />
            </FlexRowGapWrapper>
          </ToolCard>
        ))}
      </ToolCardWrapper>
    </ToolsLayoutWrapper>
  );
};

export default ToolCards;

const ToolsLayoutWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 100%;
`;

const ToolCardWrapper = styled(FlexColumnGapWrapper)`
  width: 450px;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 100%;
`;

const ToolCard = styled(Card)`
  width: 100%;
`;

const FlexRowGapWrapper = styled(FlexGapWrapper)`
  justify-content: space-between;
  justify-items: center;
  align-items: center;
  gap: 0.75rem;
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

const CardBodyText = styled.div`
  font-size: 1.75rem;
  font-weight: 400;
  line-height: 2.25rem;
`;
