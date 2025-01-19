import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const ArrowForwardIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" />
      </svg>
    </IconWrapper>
  );
};

ArrowForwardIcon.displayName = "ArrowForwardIcon";
