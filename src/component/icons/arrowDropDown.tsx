import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const ArrowDropDownIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M7 10L12 15L17 10H7Z" />
      </svg>
    </IconWrapper>
  );
};

ArrowDropDownIcon.displayName = "ArrowDropDownIcon";
