import { ComponentProps } from "react";
import styled, { css } from "styled-components";
import { IconWrapper } from "./icons/iconWrapper";

export interface ButtonProps extends ComponentProps<"button"> {
  /**
   * Is this the principal call to action on the page?
   */
  outlined?: boolean;
  text?: boolean;
  label?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const ButtonBase = ({
  label,
  leadingIcon,
  trailingIcon,
  outlined: _outlined,
  text: _text,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button {...props}>
      {leadingIcon}
      {label ?? children}
      {trailingIcon}
    </button>
  );
};

const getIconVariants = ({ leadingIcon, trailingIcon, label }: ButtonProps) => {
  const singleIcon =
    (leadingIcon && !trailingIcon) || (trailingIcon && !leadingIcon);
  if (!label && singleIcon) {
    return css`
      border-radius: var(--border-radius-xs);
      padding: var(--space-125);
    `;
  }
  if (leadingIcon && trailingIcon) {
    return css`
      padding-inline: 1rem;
    `;
  }
  if (leadingIcon) {
    return css`
      padding-left: 1rem;
    `;
  }
  if (trailingIcon) {
    return css`
      padding-right: 1rem;
    `;
  }
};

const getPrimaryVariants = ({ outlined, text }: ButtonProps) => {
  if (outlined || text) {
    return css`
      --button-text-color-internal: var(--button-bg);
      --button-border-color-internal: var(
        --button-text-color-internal,
        var(--button-text-color)
      );

      --button-text-color-disabled-internal: var(--button-bg-disabled);
      --button-border-color-disabled-internal: var(
        --button-text-color-disabled-internal,
        var(--button-text-color-disabled)
      );

      --button-bg-hover-internal: var(--clr-surfaces-secondary-2);
      --button-box-shadow-internal: none;

      --button-bg-disabled-internal: transparent;
      --button-bg-internal: transparent;

      ${text &&
      css`
        --button-border-color-disabled-internal: var(--button-bg-internal);
        --button-border-color-internal: var(--button-bg-internal);
      `}
    `;
  }

  return css`
    --button-box-shadow-internal: var(--elevation-1);
  `;
};

const getDisabledStyle = ({ disabled }: ButtonProps) =>
  disabled &&
  css`
    cursor: not-allowed;
    --button-bg-internal: var(
      --button-bg-disabled-internal,
      var(--button-bg-disabled)
    );
    --button-bg-hover-internal: var(
      --button-bg-disabled-internal,
      var(--button-bg-disabled)
    );
    --button-text-color-internal: var(
      --button-text-color-disabled-internal,
      var(--button-text-color-disabled)
    );
    --button-border-color-internal: var(
      --button-border-color-disabled-internal,
      var(--button-bg-disabled)
    );
    --button-box-shadow-internal: none;
  `;

/**
 * A button is designed to trigger an event or action, thereby informing users
 * of the next course of action
 */
export const Button = styled(ButtonBase)<ButtonProps>`
  display: inline-flex;
  padding: var(--space-125) var(--space-300);
  border-radius: var(--border-radius-xl);
  font-family: Lato;
  font-size: var(--fs-button);
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem; /* 142.857% */
  letter-spacing: 0.00625rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  background: var(--button-bg-internal, var(--button-bg));
  color: var(--button-text-color-internal, var(--button-text-color));
  border: 1px solid var(--button-border-color-internal, var(--button-bg));
  &:hover {
    box-shadow: var(--button-box-shadow, var(--button-box-shadow-internal));
    background-color: var(--button-bg-hover-internal, var(--button-bg-hover));
  }

  ${getPrimaryVariants}
  ${getDisabledStyle}
  ${getIconVariants}
  ${IconWrapper} {
    width: 1.125rem;
    height: 1.125rem;
  }
`;

Button.displayName = "Button";
