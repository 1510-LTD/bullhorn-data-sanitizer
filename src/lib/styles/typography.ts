import { css } from "styled-components";

export const baseTypography = css`
  /* Text-size styles */
  /* base size: body-1 (16px) */
  --ff: "Lato", sans-serif;

  --fs-1: 0.625rem;
  --fs-2: 0.75rem;
  --fs-3: 0.875rem;
  --fs-4: 1rem;
  --fs-5: 1.125rem;
  --fs-6: 1.25rem;
  --fs-7: 1.375rem;
  --fs-8: 1.5rem;
  --fs-9: 1.75rem;
  --fs-10: 2rem;

  --fs-body-1: var(--fs-4);
  --fs-body-2: var(--fs-3);
  --fs-headline-1: var(--fs-10);
  --fs-headline-2: var(--fs-9);
  --fs-headline-3: var(--fs-8);
  --fs-headline-4: var(--fs-7);
  --fs-headline-5: var(--fs-6);
  --fs-headline-6: var(--fs-5);
  --fs-subtitle-1: var(--fs-4);
  --fs-subtitle-2: var(--fs-3);
  --fs-caption: var(--fs-2);
  --fs-overline: var(--fs-1);
  --fs-button: var(--fs-3);
  --fs-legend: var(--fs-1);
`;

export const typography = css`
  p,
  .typ-body1 {
    font-size: var(--fs-body-1);
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.03125em;
  }
  .typ-body2 {
    font-size: var(--fs-body-2);
    font-weight: 600;
    line-height: 1.25;
    letter-spacing: 0.018em;
  }
  .typ-subtitle1 {
    font-size: var(--fs-subtitle-1);
    font-weight: 700;
    line-height: 1.5;
    letter-spacing: 0.03125em;
  }
  .typ-subtitle2 {
    font-size: var(--fs-subtitle-2);
    font-weight: 700;
    line-height: 1.25;
    letter-spacing: 0.018em;
  }
  h1,
  .typ-headline1 {
    font-size: var(--fs-headline-1);
    font-weight: 400;
    line-height: 2.5;
    letter-spacing: 0;
  }
  h2,
  .typ-headline2 {
    font-size: var(--fs-headline-2);
    font-weight: 400;
    line-height: 2.25;
    letter-spacing: 0;
  }
  h3,
  .typ-headline3 {
    font-size: var(--fs-headline-3);
    font-weight: 400;
    line-height: 2;
    letter-spacing: 0;
  }
  h4,
  .typ-headline4 {
    font-size: var(--fs-headline-4);
    font-weight: 500;
    line-height: 1.75;
    letter-spacing: 0;
  }
  h5,
  .typ-headline5 {
    font-size: var(--fs-headline-5);
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.0075em;
  }
  h6,
  .typ-headline6 {
    font-size: var(--fs-headline-6);
    font-weight: 500;
    line-height: 1.25;
    letter-spacing: 0.0125em;
  }
  .typ-legend {
    font-size: var(--fs-legend);
    font-weight: 500;
    line-height: 1;
    letter-spacing: 0.025em;
  }
  .typ-caption {
    font-size: var(--fs-caption);
    font-weight: 400;
    line-height: 1;
    letter-spacing: 0.03333em;
  }
  .typ-overline {
    font-size: var(--fs-overline);
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.08333em;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    color: var(--clr-text-10);
  }
`;
