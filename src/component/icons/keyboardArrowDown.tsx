import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const KeyboardArrowDownIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 15.0538L6.34618 9.4L7.4 8.34617L12 12.9462L16.6 8.34617L17.6538 9.4L12 15.0538Z" />
      </svg>
    </IconWrapper>
  );
};

KeyboardArrowDownIcon.displayName = "KeyboardArrowDownIcon";
