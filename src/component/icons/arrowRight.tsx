import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const ArrowRightIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M10 17L15 12L10 7V17Z" />
      </svg>
    </IconWrapper>
  );
};

ArrowRightIcon.displayName = "ArrowRightIcon";
