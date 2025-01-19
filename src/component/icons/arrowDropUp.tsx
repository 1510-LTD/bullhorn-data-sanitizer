import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const ArrowDropUpIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M7 14L12 9L17 14H7Z" />
      </svg>
    </IconWrapper>
  );
};

ArrowDropUpIcon.displayName = "ArrowDropUpIcon";
