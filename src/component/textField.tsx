import React, { ComponentProps, useRef, useImperativeHandle } from "react";
import styled, { css } from "styled-components";
import { IconWrapper } from "./icons/iconWrapper";
import { v4 as uuidV4 } from "uuid";
interface ExtraProps {
  label?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  leadingInputNodes?: React.ReactNode;
  helperText?: string;
  error?: string;
}

type InputFieldProps = ComponentProps<"input">;

export interface TextFieldProps extends InputFieldProps, ExtraProps {}
export interface TextFieldInnerProps
  extends Omit<ExtraProps, "error" | "leadingIcon" | "trailingIcon"> {
  $error?: string;
  $disabled?: boolean;
  $leadingInputNodes?: React.ReactNode;
  $leadingIcon?: React.ReactNode;
  $trailingIcon?: React.ReactNode;
}

const getLabelWidth = ({
  $leadingIcon,
  $trailingIcon
}: TextFieldInnerProps) => {
  if ($leadingIcon && $trailingIcon) {
    return `calc(100% - 5em)`;
  }
  if ($leadingIcon || $trailingIcon) {
    return `calc(100% - 3.5em)`;
  } else {
    return `calc(100% - 2em)`;
  }
};

const getBorderColor = ({ $error, $disabled }: TextFieldInnerProps) => {
  if ($error) {
    return "var(--textfield-error-color)";
  }
  if ($disabled) {
    return "var(--textfield-border-disabled)";
  }
  return "var(--textfield-border-color)";
};

const getIconColorProperty = ({ $error, $disabled }: TextFieldInnerProps) => {
  if ($error) {
    return "var(--textfield-error-color)";
  }
  if ($disabled) {
    return "var(--textfield-text-disabled)";
  }
  return "var(--textfield-text-color)";
};

const getInputColorProperty = ({ $error, $disabled }: TextFieldInnerProps) => {
  if ($error) {
    return "var(--textfield-error-color)";
  }
  if ($disabled) {
    return "var(--textfield-text-disabled)";
  }
  return "var(--textfield-text-color)";
};

const getLabelColorProperty = ({ $error, $disabled }: TextFieldInnerProps) => {
  if ($error) {
    return "var(--textfield-error-color)";
  }
  if ($disabled) {
    return "var(--textfield-text-disabled)";
  }
  return "var(--textfield-text-color)";
};

const InputField = styled.input<TextFieldInnerProps>`
  width: 0;
  min-width: ${({ placeholder }) => {
    const showPlaceholder = placeholder && placeholder.length > 0; // && !(Array.isArray($leadingInputNodes) && $leadingInputNodes.length > 0);
    return showPlaceholder ? placeholder.length + 1 : 5;
  }}ch;
  flex-shrink: 1;
  flex-grow: 1;
  font-size: 1em;
  border: none;
  padding: 0;
  background-color: var(--_background-color);
  outline: none;
  line-height: inherit;
  color: ${getInputColorProperty};
  font-weight: inherit;
  box-sizing: border-box;
  letter-spacing: 0.03125em;
  &::placeholder {
    color: ${({ label }) =>
      label ? "transparent" : "var(--textfield-placeholder-color)"};
  }
  &:focus::placeholder,
  &:focus-within::placeholder {
    color: transparent;
  }
  &:placeholder-shown {
    user-select: none;
  }
  ${({ disabled }) =>
    disabled &&
    `
    user-select: none;
  `}
`;

const InputContainer = styled.div<TextFieldInnerProps>`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  justify-content: flex-start;
  overflow: hidden;
  gap: 0.5ch;
  padding-block: 1rem;
  ${InputField}:not(:first-child) {
    margin-left: 0;
  }
  > :not(${InputField}) {
    max-width: 95%;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const FocusedLabelStyle = css<TextFieldInnerProps>`
  cursor: default;
  transform: translate(
    calc(-1 * var(--left) + 0.8em),
    calc(-1 * var(--top) - 0.588em)
  );
  transition-duration: 0.12s;
  line-height: 1;
  font-size: 0.75em;
  user-select: none;
  font-weight: 400;
  max-width: calc(100% - 2em);
  padding-inline: var(--space-050);
  color: ${getBorderColor};
  overflow-y: visible;
  overflow-x: clip;
  &::before {
    content: "";
    /* transform: inherit; */
    position: absolute;
    bottom: 0;
    inset-inline: 0;
    height: calc(50% + var(--shadow-width));
    background: var(--_background-color);
    z-index: -1;
  }
`;

const InputLabel = styled.label<TextFieldInnerProps>`
  position: absolute;
  /* --top: calc(1em - 1 * var(--border-width)); */
  --top: 1em;
  top: var(--top);
  --left: ${({ $leadingIcon }) => ($leadingIcon ? "3.125em" : "1em")};
  left: var(--left);
  transition-property: transform, line-height, font-size, max-width,
    padding-inline, background-color;
  transition-duration: 0.12s;
  transition-timing-function: ease-out;
  overflow: hidden;
  cursor: text;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 1.5;
  font-size: 1em;
  max-width: ${getLabelWidth};
  color: ${getLabelColorProperty};
  font-weight: inherit;
  letter-spacing: 0.03125em;

  ${InputContainer}:has(${InputField}:focus) + &,
  ${InputContainer}:has(${InputField}[aria-expanded=true]) + &,
  ${InputContainer}:has(${InputField}:not(:placeholder-shown)) + & {
    ${FocusedLabelStyle}
  }
  ${({ $leadingInputNodes }) => {
    if (Array.isArray($leadingInputNodes) && $leadingInputNodes.length > 0) {
      return FocusedLabelStyle;
    }
  }}
  ${InputContainer}:has(${InputField}:disabled) + & {
    cursor: not-allowed;
  }
`;

const HelperText = styled.p<TextFieldInnerProps>`
  font-size: 0.75em;
  height: 1em;
  padding-top: 0.2em;
  padding-inline: 1em;
  color: ${getIconColorProperty};
`;

const TextFieldWrapper = styled.div<TextFieldInnerProps>`
  background-color: var(--_background-color);
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 100%;
  border-radius: var(--border-radius-xs);
  border: var(--border-width) solid ${getBorderColor};
  box-shadow: 0px 0px 0px var(--shadow-width) ${getBorderColor};
  font-size: 1em;
  line-height: 1.5em;
  font-weight: 500;
  min-height: 3.5em;
  padding-inline: 1em;
  color: var(--textfield-text-color);
  box-sizing: border-box;
  cursor: text;

  &:focus-within {
    --textfield-border-color: var(--textfield-border-active);
    ${InputLabel} {
      --textfield-text-color: var(--textfield-border-color);
    }
  }
  ${(props) =>
    props["aria-expanded"] &&
    css`
      --textfield-border-color: var(--textfield-border-active);
      ${InputField}::placeholder {
        color: transparent;
      }
    `}

  ${IconWrapper} {
    flex-shrink: 0;
    display: flex;
    color: ${getIconColorProperty};
  }
  ${IconWrapper}:first-child {
    margin-left: -0.125em;
  }
  ${IconWrapper}:last-child {
    margin-right: -0.125em;
  }
  ${InputContainer}:nth-child(2) > ${InputField}:first-child {
    margin-left: 0.87em;
  }
  > :not(${InputContainer}) {
    flex-shrink: 0;
  }
`;

const Container = styled.div<TextFieldInnerProps>`
  --_background-color: var(--textfield-bg);
  --border-width: 0.0625rem;
  --shadow-width: 0px;
  /* --shadow-width: 0.0625rem; */
  font-size: 1rem;
  ${(props) =>
    props["aria-expanded"] &&
    css`
      --shadow-width: 0.0625rem;
    `}
  ${({ $disabled }) =>
    !$disabled
      ? css`
          &:hover,
          &:focus-within,
          &:focus {
            --shadow-width: 0.0625rem;
          }
        `
      : css`
          user-select: none;
          cursor: not-allowed;
          * {
            filter: grayscale(1) opacity(0.9);
            user-select: none;
            pointer-events: none;
          }
          :focus-visible {
            outline: none;
          }
        `}
`;

/**
 * Text fields are elements that allow users to enter text, commonly found in
 * forms and dialogs.
 */
export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      id = uuidV4(),
      leadingIcon,
      trailingIcon,
      leadingInputNodes,
      label,
      error: errorMessage,
      disabled = false,
      helperText,
      className,
      placeholder,
      ...props
    },
    forwardedRef
  ) => {
    const error = disabled ? "" : errorMessage;
    const type = props?.type || "text";
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(
      forwardedRef,
      () => inputRef.current as HTMLInputElement
    );

    return (
      <Container
        $error={error}
        $disabled={disabled}
        className={className}
        aria-expanded={props["aria-expanded"]}
      >
        <TextFieldWrapper
          aria-expanded={props["aria-expanded"]}
          tabIndex={-1}
          onFocus={() => {
            inputRef.current?.focus();
          }}
          $error={error}
          $disabled={disabled}
        >
          {leadingIcon}
          <InputContainer>
            {leadingInputNodes}
            <InputField
              id={id}
              label={label}
              tabIndex={0}
              aria-invalid={error ? "true" : "false"}
              disabled={disabled}
              data-1p-ignore={
                type !== "password" &&
                !["username", "email"].includes(props?.name || "")
              }
              {...props}
              ref={inputRef}
              placeholder={placeholder}
            />
          </InputContainer>
          {label && (
            <InputLabel
              $leadingIcon={leadingIcon}
              $trailingIcon={trailingIcon}
              $leadingInputNodes={leadingInputNodes}
              $error={error}
              htmlFor={id}
              $disabled={disabled}
            >
              {label}
            </InputLabel>
          )}
          {trailingIcon}
        </TextFieldWrapper>
        <HelperText $error={error} $disabled={disabled} label={label}>
          {error ? error : helperText}
        </HelperText>
      </Container>
    );
  }
);

TextField.displayName = "TextField";
