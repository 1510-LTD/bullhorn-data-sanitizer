import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const TrendingIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M3.075 17.9998L2 16.9248L9.3 9.6498L13.475 13.8248L19.5 7.7998H16.325V6.2998H22V11.9748H20.525V8.8998L13.45 15.9748L9.275 11.7998L3.075 17.9998Z" />
      </svg>
    </IconWrapper>
  );
};

TrendingIcon.displayName = "TrendingIcon";
