import styled, { css } from "styled-components";

export interface ChipProps {
  label: string;
  disabled?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}
interface ChipPropsInner {
  label: string;
  disabled?: boolean;
  $leadingIcon?: React.ReactNode;
  $trailingIcon?: React.ReactNode;
}

const Icon = styled.div``;
const Span = styled.span``;

const Container = styled.div<Omit<ChipPropsInner, "label">>`
  --background: var(--chip-bg);
  --color: var(--chip-text-color);
  ${({ disabled }) =>
    disabled &&
    css`
      --background: var(--chip-bg-disabled);
      --color: var(--chip-text-color-disabled);
    `}
  display: inline-flex;
  align-items: center;
  gap: var(--space-050);
  padding: var(--space-050) var(--space-150);
  padding-left: ${({ $leadingIcon }) =>
    $leadingIcon ? "var(--space-100)" : "var(--space-150)"};
  padding-right: ${({ $trailingIcon }) =>
    $trailingIcon ? "var(--space-100)" : "var(--space-150)"};
  border-radius: var(--border-radius-s);
  font-size: var(--fs-2);
  line-height: var(--fs-4);
  color: var(--color);
  background-color: var(--background);
  > ${Span} {
    flex-shrink: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  > ${Icon} {
    height: var(--space-200);
    flex-shrink: 0;
    svg {
      color: var(--color);
    }
    &:nth-last-of-type() {
      display: none;
    }
  }
`;

/**
 * Chips assist in user selection processes, content filtering, and the
 * activation of specific functions.
 */
export const Chip = ({
  label,
  leadingIcon,
  trailingIcon,
  disabled
}: ChipProps) => {
  return (
    <Container
      $leadingIcon={leadingIcon}
      $trailingIcon={trailingIcon}
      disabled={disabled}
    >
      {leadingIcon && <Icon>{leadingIcon}</Icon>}
      <Span>{label}</Span>
      {trailingIcon && <Icon>{trailingIcon}</Icon>}
    </Container>
  );
};

Chip.displayName = "Chip";
