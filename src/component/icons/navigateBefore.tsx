import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const NavigateBeforeIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.705 7.41L14.295 6L8.29504 12L14.295 18L15.705 16.59L11.125 12L15.705 7.41Z" />
      </svg>
    </IconWrapper>
  );
};

NavigateBeforeIcon.displayName = "NavigateBeforeIcon";
