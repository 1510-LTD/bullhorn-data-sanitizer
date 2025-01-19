import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const AddIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M11.25 18.75V12.75H5.25V11.25H11.25V5.25H12.7499V11.25H18.75V12.75H12.7499V18.75H11.25Z" />
      </svg>
    </IconWrapper>
  );
};

AddIcon.displayName = "AddIcon";
