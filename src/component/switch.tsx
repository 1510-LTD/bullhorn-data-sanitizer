import React from "react";
import styled from "styled-components";
import * as RadixSwitch from "@radix-ui/react-switch";
import { v4 as uuidv4 } from "uuid";

/**
 *  Label for input fields
 */
export const InputLabel = styled.label<{ disabled?: boolean }>`
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  color: ${({ disabled }) =>
    disabled ? "var(--label-text-disabled)" : "var(--label-text)"};
  font-size: var(--fs-3);
  font-weight: 600;
  line-height: 1.25rem;
`;

export interface SwitchProps extends RadixSwitch.SwitchProps {
  label?: string;
}

const SwitchThumb = styled(RadixSwitch.SwitchThumb)`
  width: 20px;
  height: 20px;
  background-color: var(--switch-thumb-bg-unchecked);
  flex-shrink: 0;
  border-radius: 20px;
  box-shadow: // TODO: use tokens
    0px 2px 4px 0px rgba(26, 26, 26, 0.2),
    0px 1px 10px 0px rgba(26, 26, 26, 0.12);
  transition: transform 100ms;
  will-change: transform;
  z-index: 2;

  &[data-state="checked"] {
    transform: translateX(15px);
    background-color: var(--switch-thumb-bg-checked);
  }

  &[data-disabled] {
    background-color: var(--switch-thumb-bg-disabled);
    cursor: not-allowed;
  }
`;

const SwitchRoot = styled(RadixSwitch.Root)`
  display: flex;
  align-items: center;
  width: 34px;
  height: 14px;
  background-color: var(--switch-track-bg-unchecked);
  border-radius: 8px;
  flex-shrink: 0;
  position: relative;

  &[data-state="checked"] {
    background-color: var(--switch-track-bg-checked);
  }

  &[data-disabled] {
    background-color: var(--switch-track-bg-disabled);
    cursor: not-allowed;
  }

  &::before {
    content: "";
    position: absolute;
    opacity: 0;
    transition:
      transform 0.1s ease-in-out,
      opacity 0.1s ease-in-out;
    transform: scale(0.2);
    z-index: 1;
    border-radius: 100%;
    width: 36px;
    height: 36px;
    left: -8px;
    top: -11px;
    background-color: var(--clr-surfaces-primary-2);
  }

  &:not([data-disabled]) {
    cursor: pointer;

    &:hover {
      &::before {
        opacity: 1;
        transform: scale(1);
        transition: transform 0.1s ease-in-out;
      }
    }

    &[data-state="checked"] {
      &::before {
        transform: translateX(15px);
      }
    }
  }
`;

const SwitchLabelWrapper = styled("div")`
  height: 36px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

// eslint-disable-next-line react/display-name
const SwitchIndicator = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked = false, ...props }: SwitchProps, forwardedRef) => (
    <SwitchRoot checked={checked} {...props} ref={forwardedRef}>
      <SwitchThumb />
    </SwitchRoot>
  )
);

/**
 * A switch is a control used to independently toggle the on or off state of
 * items in a list.
 */
export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ label, id = uuidv4(), ...props }: SwitchProps, forwardedRef) => (
    <SwitchLabelWrapper>
      <SwitchIndicator {...props} ref={forwardedRef} id={id} />
      {label && (
        <InputLabel disabled={props.disabled} htmlFor={id}>
          {label}
        </InputLabel>
      )}
    </SwitchLabelWrapper>
  )
);

Switch.displayName = "Switch";
