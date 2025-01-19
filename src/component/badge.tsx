import React from "react";
import styled, { css } from "styled-components";

interface BadgePropsNumeric {
  type?: "error" | "success" | "neutral";
  count: number;
  label?: undefined;
  color?: React.CSSProperties["color"];
  backgroundColor?: React.CSSProperties["backgroundColor"];
}

interface BadgePropsString extends Omit<BadgePropsNumeric, "label" | "count"> {
  label: string;
  count?: undefined;
}

interface BadgePropsInner
  extends Omit<
    BadgePropsNumeric,
    "label" | "count" | "backgroundColor" | "color"
  > {
  $label?: string;
  $count?: number;
  $backgroundColor?: React.CSSProperties["backgroundColor"];
  $color?: React.CSSProperties["color"];
}

export type BadgeProps = BadgePropsNumeric | BadgePropsString;

const getCountString = (count?: number) => {
  if (!count || count < 1) {
    return "";
  }
  if (count > 99) {
    return "99+";
  }
  return count.toString();
};

const getBackgroundColor = ({ type, $backgroundColor }: BadgePropsInner) => {
  if ($backgroundColor) return $backgroundColor;

  switch (type) {
    case "error":
      return "var(--badge-error)";
    case "success":
      return "var(--badge-success)";
    default:
      return "var(--badge-neutral)";
  }
};

const getColor = ({ $color }: BadgePropsInner) => {
  if ($color) return $color;

  return "var(--clr-text-complementary)";
};

const getCountVariant = ({ $count: count, $label: label }: BadgePropsInner) => {
  const numberOfChars = (label || getCountString(count)).length;

  const defaultStyle = css`
    --padding-inline: 8px;
    --letter-spacing: 0.75px;
    --badge-size: 16px;
    width: auto;
    padding: 0 var(--padding-inline);
    letter-spacing: var(--letter-spacing);
    padding-right: calc(var(--padding-inline) - var(--letter-spacing));
    border-radius: var(--border-radius-xs);
  `;

  if (label) return defaultStyle;
  switch (numberOfChars) {
    case 0:
      return css`
        --badge-size: 8px;
      `;
    case 1:
      return css`
        --badge-size: 16px;
        letter-spacing: 0.75px;
      `;
    case 2:
      return css`
        --badge-size: 16px;
        --padding-inline: 2px;
        --letter-spacing: 1.5px;
        width: 18px;
        padding: 0 var(--padding-inline);
        letter-spacing: var(--letter-spacing);
        padding-right: calc(var(--padding-inline) - var(--letter-spacing));
        border-radius: var(--border-radius-xs);
      `;
    default:
      return defaultStyle;
  }
};

const BadgeBase = styled.span<BadgePropsInner>`
  text-align: center;
  color: ${getColor};
  align-items: center;
  display: inline-flex;
  justify-content: center;
  border-radius: 100%;
  width: var(--badge-size);
  height: var(--badge-size);
  background-color: ${getBackgroundColor};
  ${getCountVariant};
  > span {
    font-size: 11px;
    font-style: normal;
    top: -0.5px;
    font-weight: 500;
    line-height: 1;
    position: relative;
  }
`;

/**
 * Badges provide a visual cue for textual and numeric information, such as
 * scores and count totals
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { type, count, label, color, backgroundColor }: BadgeProps,
    forwardedRef
  ) => {
    return (
      <BadgeBase
        ref={forwardedRef}
        type={type}
        $count={count}
        $label={label}
        $color={color}
        $backgroundColor={backgroundColor}
      >
        <span>{label || getCountString(count)}</span>
      </BadgeBase>
    );
  }
);

Badge.displayName = "Badge";
