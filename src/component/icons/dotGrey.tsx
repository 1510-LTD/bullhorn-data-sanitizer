import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const DotGreyIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="6" fill="#938F94" />
      </svg>
    </IconWrapper>
  );
};

DotGreyIcon.displayName = "DotGreyIcon";
