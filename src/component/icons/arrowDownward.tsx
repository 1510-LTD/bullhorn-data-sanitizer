import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const ArrowDownwardIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 19.6155L4.38464 12.0001L5.43847 10.9309L11.25 16.7425V4.38477H12.75V16.7425L18.5615 10.9309L19.6153 12.0001L12 19.6155Z" />
      </svg>
    </IconWrapper>
  );
};

ArrowDownwardIcon.displayName = "ArrowDownwardIcon";
