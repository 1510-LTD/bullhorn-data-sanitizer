import styled, { css } from "styled-components";
import { v4 as uuidv4 } from "uuid";

import * as RadixCheckbox from "@radix-ui/react-checkbox";
import React from "react";

/**
 *  Label for input fields
 */
const InputLabel = styled.label<{ disabled?: boolean }>`
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  color: ${({ disabled }) =>
    disabled ? "var(--label-text-disabled)" : "var(--label-text)"};
  font-size: var(--fs-3);
  font-weight: 600;
  line-height: 1.25rem;
`;

export interface CheckboxProps extends RadixCheckbox.CheckboxProps {
  label?: string;
  error?: boolean;
}

type BehaviorProps = Pick<CheckboxProps, "checked" | "disabled"> & {
  $error?: boolean;
};

const getBackgroundColor = ({ $error }: BehaviorProps) => {
  if ($error) {
    return "var(--clr-opacity-error-8)";
  }
  return "var(--clr-opacity-primary-8)";
};

const getCheckboxColor = ({ $error, disabled, checked }: BehaviorProps) => {
  if (disabled) {
    return "var(--checkbox-disabled)";
  }
  if ($error) {
    return "var(--checkbox-error)";
  }
  if (checked === true) {
    return "var(--checkbox-checked)";
  }
  return "var(--checkbox-unchecked)";
};

const CheckboxIndicator = styled(RadixCheckbox.Indicator)<BehaviorProps>`
  outline: inherit;
  color: ${getCheckboxColor};
  width: 18px;
  height: 18px;
  & > svg {
    fill: currentColor;
    height: 100%;
    width: 100%;
  }
`;

const getCursor = ({ disabled }: BehaviorProps) =>
  disabled ? "not-allowed" : "pointer";

const CheckboxWrapper = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 11px;
  width: auto;
  height: 18px;
  cursor: ${getCursor};
`;

const CheckboxRoot = styled(RadixCheckbox.Root)<BehaviorProps>`
  position: relative;
  width: 18px;
  height: 100%;
  &::before {
    content: "";
    position: absolute;
    opacity: 0;
    transition:
      transform 0.1s ease-in-out,
      opacity 0.1s ease-in-out;
    transform: scale(0.7);
    z-index: 1;
    border-radius: 100%;
    width: 36px;
    height: 36px;
    left: -9px;
    top: -9px;
    cursor: ${getCursor};
    background-color: ${getBackgroundColor};
  }
  ${({ disabled }) =>
    !disabled &&
    css`
      &:hover {
        &::before {
          opacity: 1;
          transform: scale(1);
          transition: transform 0.1s ease-in-out;
        }
      }
    `}
  &:focus-visible {
    outline: none;
  }
  & > svg {
    position: absolute;
    pointer-events: none;
    z-index: 2;
    color: ${getCheckboxColor};
    fill: currentColor;
    border-radius: 2px;
    width: 18px;
    height: 18px;
    inset: 0;
  }
`;

const getIcon = (checked: RadixCheckbox.CheckedState) => {
  if (checked === true) {
    return (
      <path d="M10.6 16.2L17.65 9.15L16.25 7.75L10.6 13.4L7.75 10.55L6.35 11.95L10.6 16.2ZM5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5Z" />
    );
  }
  if (checked === "indeterminate") {
    return <path d="M7 11H17V13H7V11Z" />;
  }
  return <path d="M19 5V19H5V5H19ZM21 3H3V21H21V3Z" />;
};

/**
 * With checkboxes, users have the flexibility to choose one or several items
 * from a predefined set of options
 */
export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      label,
      checked = false,
      disabled = false,
      error = false,
      id = uuidv4(),
      ...props
    }: CheckboxProps,
    forwardedRef
  ) => {
    return (
      <CheckboxWrapper disabled={disabled}>
        <CheckboxRoot
          checked={checked}
          disabled={disabled}
          id={id}
          $error={error}
          {...props}
          ref={forwardedRef}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="3 3 18 18">
            {getIcon(false)}
          </svg>
          <CheckboxIndicator
            checked={checked}
            disabled={disabled}
            $error={error}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="3 3 18 18">
              {getIcon(checked)}
            </svg>
          </CheckboxIndicator>
        </CheckboxRoot>
        {label && (
          <InputLabel disabled={disabled} htmlFor={id}>
            {label}
          </InputLabel>
        )}
      </CheckboxWrapper>
    );
  }
);

Checkbox.displayName = "Checkbox";
