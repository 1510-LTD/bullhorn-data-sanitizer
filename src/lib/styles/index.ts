import { createGlobalStyle, css } from "styled-components";
import externalReset from "styled-reset";
import { fontLato } from "./fonts/lato";
import { baseTypography, typography } from "./typography";
import { appInternalColors, baseColors, derivedColors } from "./colors";
import { theme as lightTheme } from "./themes/light";
import { shadow } from "./shadow";

const styled = { createGlobalStyle };

const elementStyles = css`
  html {
    /* font-size: 16px; */
    font-family: var(--ff);
    font-style: normal;
  }

  * {
    box-sizing: border-box;
  }

  label {
    color: var(--clr-text);
  }
  ${typography}
`;

const reset = css`
  ${externalReset}

  button {
    all: unset;
  }
`;

const styles = css`
  ${reset}
  ${fontLato}


  body {
    height: 100vh;
  }

  :root {
    ${baseColors}
    ${baseTypography}
    ${shadow}

    ${lightTheme}
    ${derivedColors}
    ${appInternalColors}

    /* Border Radius */
    --border-radius-none: 0;
    --border-radius-min: 0.125rem;
    --border-radius-xs: 0.25rem;
    --border-radius-s: 0.5rem;
    --border-radius-ms: 0.75rem;
    --border-radius-m: 1rem;
    --border-radius-ml: 1.5rem;
    --border-radius-l: 2rem;
    --border-radius-xl: 3rem;
    --border-radius-xxl: 4rem;
    --border-radius-full: 100px;

    /* Space */
    --space-0: 0;
    --space-025: 0.125rem;
    --space-050: 0.25rem;
    --space-075: 0.375rem;
    --space-100: 0.5rem;
    --space-125: 0.625rem;
    --space-150: 0.75rem;
    --space-200: 1rem;
    --space-300: 1.5rem;
    --space-400: 2rem;
    --space-500: 2.5rem;
    --space-600: 3rem;
  }

  * {
    font-family: "lato";
  }

  ${elementStyles}
`;

export const GlobalStyles = styled.createGlobalStyle`
  ${styles}
`;
