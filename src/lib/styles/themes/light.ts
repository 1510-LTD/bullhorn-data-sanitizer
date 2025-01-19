import { css } from "styled-components";

export const theme = css`
  --clr-text: var(--clr-text-10);
  --clr-text-complementary: var(--clr-text-60);

  --clr-outline: rgb(var(--clr-rgb-neutral-60));

  --clr-surfaces-primary: var(--clr-rgb-primary-40);
  --clr-surfaces-secondary: var(--clr-rgb-secondary-40);
  --clr-surfaces-tertiary: var(--clr-rgb-secondary-40);
  --clr-surfaces-neutral: var(--clr-rgb-neutral-40);

  --clr-opacity-primary: var(--clr-rgb-primary-40);
  --clr-opacity-secondary: var(--clr-rgb-secondary-40);
  --clr-opacity-tertiary: var(--clr-rgb-tertiary-40);
  --clr-opacity-error: var(--clr-rgb-error-40);
  --clr-opacity-success: var(--clr-rgb-success-40);
  --clr-opacity-neutral: var(--clr-rgb-neutral-40);

  --clr-background-light-1: rgba(248, 248, 248, 1);
  --clr-background-light-2: rgba(253, 253, 253, 1);
  --clr-background-light-3: rgba(252, 250, 255, 1);
  --clr-special-highlight-row-light: rgba(252, 248, 255, 1);

  --elevation-1: 0px 1px 3px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.3);
  --elevation-2: 0px 2px 6px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.3);
  --elevation-3: 0px 1px 3px rgba(0, 0, 0, 0.3), 0px 4px 8px rgba(0, 0, 0, 0.15);
  --elevation-4: 0px 2px 3px rgba(0, 0, 0, 0.3),
    0px 6px 10px rgba(0, 0, 0, 0.15);
  --elevation-5: 0px 4px 4px rgba(0, 0, 0, 0.3),
    0px 8px 12px rgba(0, 0, 0, 0.15);

  --label-text-disabled: var(--clr-text-40);
  --label-text: var(--clr-text-10);

  --switch-thumb-bg-unchecked: rgba(var(--clr-rgb-neutral-100));
  --switch-thumb-bg-checked: rgba(var(--clr-rgb-primary-40));
  --switch-thumb-bg-disabled: rgba(var(--clr-rgb-neutral-60));
  --switch-track-bg-unchecked: rgba(var(--clr-rgb-neutral-80));
  --switch-track-bg-checked: rgba(var(--clr-rgb-primary-80));
  --switch-track-bg-disabled: rgba(var(--clr-rgb-neutral-80));

  --checkbox-checked: rgba(var(--clr-rgb-primary-40));
  --checkbox-unchecked: rgba(var(--clr-rgb-neutral-40));
  --checkbox-disabled: rgba(var(--clr-rgb-primary-80));
  --checkbox-error: rgba(var(--clr-rgb-error-40));

  --radio-checked: rgba(var(--clr-rgb-primary-40));
  --radio-unchecked: rgba(var(--clr-rgb-neutral-40));
  --radio-disabled: rgba(var(--clr-rgb-neutral-80));
  --radio-error: rgba(var(--clr-rgb-error-40));
  --radio-checked-hover: var(--clr-opacity-primary-8);
  --radio-unchecked-hover: var(--clr-opacity-neutral-8);

  --badge-error: rgba(var(--clr-rgb-error-50));
  --badge-success: rgba(var(--clr-rgb-success-50));
  --badge-neutral: rgba(var(--clr-rgb-tertiary-50));
  --badge-warn: rgb(var(--clr-rgb-primary-40));

  --chip-text-color: rgb(var(--clr-rgb-primary-40));
  --chip-text-color-disabled: var(--clr-text-30);
  --chip-bg: rgba(var(--clr-opacity-primary), 0.12);
  --chip-bg-disabled: rgba(var(--clr-opacity-neutral), 0.16);

  --button-text-color: var(--clr-text-complementary);
  --button-text-color-disabled: white;
  --button-bg: rgba(var(--clr-surfaces-tertiary), 1);
  --button-bg-hover: rgba(var(--clr-rgb-primary-35), 1);
  --button-bg-disabled: rgba(var(--clr-rgb-neutral-80), 1);

  --textfield-text-color: var(--clr-text-10);
  --textfield-bg: rgba(var(--clr-rgb-neutral-100), 1);
  --textfield-border-color: var(--clr-outline);
  --textfield-border-active: rgba(var(--clr-rgb-primary-40));
  --textfield-error-color: rgba(var(--clr-rgb-error-40));
  --textfield-text-disabled: var(--clr-text-40);
  --textfield-placeholder-color: var(--clr-text-30);
  --textfield-border-disabled: rgba(var(--clr-rgb-neutral-80));

  --tab-text-color: var(--clr-text-20);
  --tab-bg-active-hover: rgba(var(--clr-rgb-primary-40), 0.08);
  --tab-color-active: rgba(var(--clr-rgb-primary-40), 1);
  --tab-bg-inactive-hover: rgba(var(--clr-rgb-neutral-40), 0.08);

  --tooltip-background: rgba(var(--clr-rgb-neutral-10), 1);
  --tooltip-font-icon-color: var(--clr-text-60);

  --table-border-color: rgba(217, 220, 224, 1);
  --table-header-color: var(--clr-rgb-secondary-98);
  --table-row-color: var(--clr-background-light-2);
  --table-highlight-color: var(--clr-special-highlight-row-light);

  --emblem-border-color-primary: rgba(var(--clr-rgb-primary-95));
  --emblem-background-color-primary: rgba(var(--clr-rgb-primary-99));
  --emblem-icon-color-primary: rgba(var(--clr-rgb-primary-40));
  --emblem-border-color-secondary: rgba(var(--clr-rgb-secondary-95));
  --emblem-background-color-secondary: rgba(var(--clr-rgb-secondary-99));
  --emblem-icon-color-secondary: rgba(var(--clr-rgb-secondary-40));
  --emblem-border-color-tertiary: rgba(var(--clr-rgb-tertiary-95));
  --emblem-background-color-tertiary: rgba(var(--clr-rgb-tertiary-99));
  --emblem-icon-color-tertiary: rgba(var(--clr-rgb-tertiary-40));
  --emblem-border-color-error: rgba(var(--clr-rgb-error-95));
  --emblem-background-color-error: rgba(var(--clr-rgb-error-99));
  --emblem-icon-color-error: rgba(var(--clr-rgb-error-40));
  --emblem-border-color-success: rgba(var(--clr-rgb-success-95));
  --emblem-background-color-success: rgba(var(--clr-rgb-success-99));
  --emblem-icon-color-success: rgba(var(--clr-rgb-success-40));

  --pagination-button-bg-selected: rgba(var(--clr-rgb-primary-90));
  --pagination-button-bg-hover: rgba(var(--clr-rgb-neutral-95));
  --pagination-button-text-color: var(--clr-text-10);
  --pagination-button-text-disabled: var(--clr-text-40);

  --skeleton-bg-color: rgba(var(--clr-rgb-neutral-40), 0.08);
`;
