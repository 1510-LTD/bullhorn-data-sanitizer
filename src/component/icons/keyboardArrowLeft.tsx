import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const KeyboardArrowLeftIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M15.3538 16.2999L14.2999 17.3538L8.64612 11.6999L14.2999 6.04611L15.3538 7.09993L10.7538 11.6999L15.3538 16.2999Z" />
      </svg>
    </IconWrapper>
  );
};

KeyboardArrowLeftIcon.displayName = "KeyboardArrowLeftIcon";
