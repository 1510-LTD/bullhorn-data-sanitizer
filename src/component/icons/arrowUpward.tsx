import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const ArrowUpwardIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M11.25 19.6155V7.25777L5.43847 13.0693L4.38464 12.0001L12 4.38477L19.6153 12.0001L18.5615 13.0693L12.75 7.25777V19.6155H11.25Z" />
      </svg>
    </IconWrapper>
  );
};

ArrowUpwardIcon.displayName = "ArrowUpwardIcon";
