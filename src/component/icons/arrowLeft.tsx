import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const ArrowLeftIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M14 7L9 12L14 17V7Z" />
      </svg>
    </IconWrapper>
  );
};

ArrowLeftIcon.displayName = "ArrowLeftIcon";
