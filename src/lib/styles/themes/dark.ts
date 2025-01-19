import { css } from "styled-components";

export const theme = css`
  --clr-text: var(--clr-text-60);
  --clr-text-complementary: var(--clr-text-10);

  --clr-outline: rgba(217, 220, 224, 1);

  --clr-surfaces-primary: var(--clr-rgb-primary-80);
  --clr-surfaces-secondary: var(--clr-rgb-secondary-80);
  --clr-surfaces-tertiary: var(--clr-rgb-tertiary-80);
  --clr-surfaces-neutral: var(--clr-rgb-neutral-80);

  --clr-opacity-primary: var(--clr-rgb-primary-80);
  --clr-opacity-secondary: var(--clr-rgb-secondary-80);
  --clr-opacity-tertiary: var(--clr-rgb-tertiary-80);
  --clr-opacity-error: var(--clr-rgb-error-80);
  --clr-opacity-success: var(--clr-rgb-success-80);
  --clr-opacity-neutral: var(--clr-rgb-neutral-80);

  --clr-background-dark-1: rgba(21, 21, 21, 1);
  --clr-background-dark-2: rgba(32, 33, 36, 1);
  --clr-background-dark-3: rgba(27, 27, 28, 1);
  --clr-special-highlight-row-dark: rgba(32, 32, 32, 1);

  --elevation-1: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px rgba(0, 0, 0, 0.15);
  --elevation-2: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px rgba(0, 0, 0, 0.15);
  --elevation-5: 0px 4px 4px rgba(0, 0, 0, 0.3),
    0px 8px 12px rgba(0, 0, 0, 0.15);

  --label-text-disabled: var(--clr-text-40);
  --label-text: var(--clr-text-60);

  --switch-thumb-bg-unchecked: rgba(var(--clr-rgb-neutral-60));
  --switch-thumb-bg-checked: rgba(var(--clr-rgb-primary-80));
  --switch-thumb-bg-disabled: rgba(var(--clr-rgb-neutral-40));
  --switch-track-bg-unchecked: rgba(var(--clr-rgb-neutral-40));
  --switch-track-bg-checked: rgba(var(--clr-rgb-primary-40));
  --switch-track-bg-disabled: rgba(var(--clr-rgb-neutral-30));

  --checkbox-checked: rgba(var(--clr-rgb-primary-80));
  --checkbox-unchecked: rgba(var(--clr-rgb-neutral-80));
  --checkbox-disabled: rgba(var(--clr-rgb-neutral-40));
  --checkbox-error: rgba(var(--clr-rgb-error-80));

  --radio-checked: rgba(var(--clr-rgb-primary-80));
  --radio-unchecked: rgba(var(--clr-rgb-neutral-80));
  --radio-disabled: rgba(var(--clr-rgb-neutral-40));
  --radio-error: rgba(var(--clr-rgb-error-80));
  --radio-checked-hover: var(--clr-opacity-primary-8);
  --radio-unchecked-hover: var(--clr-opacity-neutral-8);

  --badge-error: rgba(var(--clr-rgb-error-80));
  --badge-success: rgba(var(--clr-rgb-success-80));
  --badge-neutral: rgba(var(--clr-rgb-tertiary-80));

  --chip-text-color: rgb(var(--clr-rgb-primary-80));
  --chip-text-color-disabled: var(--clr-text-30);
  --chip-bg: rgba(var(--clr-opacity-primary), 0.08);
  --chip-bg-disabled: rgba(var(--clr-opacity-neutral), 0.16);

  --button-text-color: var(--clr-text-complementary);
  --button-text-color-disabled: var(--clr-text);
  --button-bg: rgba(var(--clr-surfaces-primary), 1);
  --button-bg-hover: rgba(var(--clr-rgb-primary-70), 1);
  --button-bg-disabled: rgba(var(--clr-rgb-neutral-40), 1);

  --textfield-text-color: var(--clr-text-60);
  --textfield-bg: rgba(var(--clr-rgb-neutral-20));
  --textfield-border-color: var(--clr-outline);
  --textfield-border-active: rgba(var(--clr-rgb-primary-80));
  --textfield-error-color: rgba(var(--clr-rgb-error-80));
  --textfield-text-disabled: var(--clr-text-30);
  --textfield-placeholder-color: var(--clr-text-40);
  --textfield-border-disabled: rgba(var(--clr-rgb-neutral-30));

  --tab-text-color: var(--clr-text-50);
  --tab-bg-active-hover: rgba(var(--clr-rgb-primary-80), 0.08);
  --tab-color-active: rgba(var(--clr-rgb-primary-80), 1);
  --tab-bg-inactive-hover: rgba(var(--clr-rgb-neutral-80), 0.08);

  --tooltip-background: rgba(var(--clr-rgb-neutral-40), 1);
  --tooltip-font-icon-color: var(--clr-text-60);

  --table-border-color: rgba(147, 143, 148, 1);
  --table-header-color: var(--clr-rgb-secondary-98);
  --table-row-color: var(--clr-rgb-neutral-100);
  --table-highlight-color: var(--clr-special-highlight-row-dark);

  --emblem-border-color-primary: rgba(var(--clr-rgb-primary-20));
  --emblem-background-color-primary: rgba(var(--clr-rgb-primary-10));
  --emblem-icon-color-primary: rgba(var(--clr-rgb-primary-80));
  --emblem-border-color-secondary: rgba(var(--clr-rgb-secondary-20));
  --emblem-background-color-secondary: rgba(var(--clr-rgb-secondary-10));
  --emblem-icon-color-secondary: rgba(var(--clr-rgb-secondary-80));
  --emblem-border-color-tertiary: rgba(var(--clr-rgb-tertiary-20));
  --emblem-background-color-tertiary: rgba(var(--clr-rgb-tertiary-10));
  --emblem-icon-color-tertiary: rgba(var(--clr-rgb-tertiary-80));
  --emblem-border-color-error: rgba(var(--clr-rgb-error-20));
  --emblem-background-color-error: rgba(var(--clr-rgb-error-10));
  --emblem-icon-color-error: rgba(var(--clr-rgb-error-80));
  --emblem-border-color-success: rgba(var(--clr-rgb-success-20));
  --emblem-background-color-success: rgba(var(--clr-rgb-success-10));
  --emblem-icon-color-success: rgba(var(--clr-rgb-success-80));

  --pagination-button-bg-selected: rgba(var(--clr-rgb-primary-30));
  --pagination-button-bg-hover: rgba(var(--clr-rgb-neutral-30));
  --pagination-button-text-color: var(--clr-text-60);
  --pagination-button-text-disabled: var(--clr-text-20);

  --skeleton-bg-color: rgba(var(--clr-rgb-neutral-80), 0.08);
`;
