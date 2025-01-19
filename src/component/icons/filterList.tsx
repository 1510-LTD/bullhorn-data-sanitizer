import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const FilterListIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M10.25 17.7501V16.2501H13.75V17.7501H10.25ZM6.25 12.5578V11.0578H17.75V12.5578H6.25ZM3.25 7.36545V5.86548H20.75V7.36545H3.25Z" />
      </svg>
    </IconWrapper>
  );
};

FilterListIcon.displayName = "FilterListIcon";
