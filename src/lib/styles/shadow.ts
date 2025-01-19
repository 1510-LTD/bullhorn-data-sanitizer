import { css } from "styled-components";

export const shadow = css`
  /* SHADOW & ELEVATION */
  --penumbra-opacity: 0.14;
  --ambient-shadow-opacity: 0.12;
  --umbra-opacity: 0.2;

  --2dp-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, var(--penumbra-opacity)),
    0 3px 1px -2px rgba(0, 0, 0, var(--umbra-opacity)),
    0 1px 5px 0 rgba(0, 0, 0, var(--ambient-shadow-opacity));
  --3dp-box-shadow: 0 3px 4px 0 rgba(0, 0, 0, var(--penumbra-opacity)),
    0 3px 3px -2px rgba(0, 0, 0, var(--umbra-opacity)),
    0 1px 8px 0 rgba(0, 0, 0, var(--ambient-shadow-opacity));
  --4dp-box-shadow: 0 4px 5px 0 rgba(0, 0, 0, var(--penumbra-opacity)),
    0 1px 10px 0 rgba(0, 0, 0, var(--ambient-shadow-opacity)),
    0 2px 4px -1px rgba(0, 0, 0, var(--umbra-opacity));
  --6dp-box-shadow: 0 6px 10px 0 rgba(0, 0, 0, var(--penumbra-opacity)),
    0 1px 18px 0 rgba(0, 0, 0, var(--ambient-shadow-opacity)),
    0 3px 5px -1px rgba(0, 0, 0, var(--umbra-opacity));
  --8dp-box-shadow: 0 8px 10px 1px rgba(0, 0, 0, var(--penumbra-opacity)),
    0 3px 14px 2px rgba(0, 0, 0, var(--ambient-shadow-opacity)),
    0 5px 5px -3px rgba(0, 0, 0, var(--umbra-opacity));
  --16dp-box-shadow: 0 16px 24px 2px rgba(0, 0, 0, var(--penumbra-opacity)),
    0 6px 30px 5px rgba(0, 0, 0, var(--ambient-shadow-opacity)),
    0 8px 10px -5px rgba(0, 0, 0, var(--umbra-opacity));
  --24dp-box-shadow: 0 9px 46px 8px rgba(0, 0, 0, var(--penumbra-opacity)),
    0 11px 15px -7px rgba(0, 0, 0, var(--ambient-shadow-opacity)),
    0 24px 38px 3px rgba(0, 0, 0, var(--umbra-opacity));

  --elevation-0: none;
  --elevation-1: var(--2dp-box-shadow);
  --elevation-3: var(--3dp-box-shadow);
  --elevation-4: var(--4dp-box-shadow);
  --elevation-5: var(--6dp-box-shadow);
  --elevation-6: var(--8dp-box-shadow);
  --elevation-7: var(--16dp-box-shadow);
  --elevation-8: var(--24dp-box-shadow);
`;
