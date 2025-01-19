import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

// TODO: Update icon with a version that has a viewport of 24x24. Cannot extract that from Figma atm.

export const FreezeSaveIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 0 18 18">
        <path d="M7.31431 17.0606V13.2247L4.70856 15.9883L3.75386 14.9758L7.31431 11.1996V9.30303H5.52614L1.9657 13.0792L1.011 12.0667L3.61674 9.30303H0V7.84853H3.61674L4.00392 7.8345L4.46106 7.84853H5.52614H7.31431V5.952V5.41026V4.50186V3.92688V2H8.68569V3.92688C8.68569 3.92688 8.68569 4.27732 8.68569 4.50186C8.68569 4.72954 8.68569 5.08487 8.68569 5.08487V5.952V7.84853H16V9.30303H12.3833L14.989 12.0667L14.0343 13.0792L10.4739 9.30303H8.68569V11.1996L12.2461 14.9758L11.2914 15.9883L8.68569 13.2247V17.0606H7.31431Z" />
        <path d="M5.37545 5.33333H3.54688L8.11832 0L12.2326 5.33333H10.404L8.11832 2.42424L5.37545 5.33333Z" />
      </svg>
    </IconWrapper>
  );
};

FreezeSaveIcon.displayName = "FreezeSaveIcon";
