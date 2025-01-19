import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const KeyboardArrowUpIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M7.4 15.0538L6.34618 14L12 8.34617L17.6538 14L16.6 15.0538L12 10.4538L7.4 15.0538Z" />
      </svg>
    </IconWrapper>
  );
};

KeyboardArrowUpIcon.displayName = "KeyboardArrowUpIcon";
