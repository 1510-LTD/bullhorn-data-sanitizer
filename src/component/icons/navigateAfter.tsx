import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const NavigateAfterIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.70504 6L8.29504 7.41L12.875 12L8.29504 16.59L9.70504 18L15.705 12L9.70504 6Z" />
      </svg>
    </IconWrapper>
  );
};

NavigateAfterIcon.displayName = "NavigateAfterIcon";
