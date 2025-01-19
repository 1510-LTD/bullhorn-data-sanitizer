import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const KeyboardArrowRightIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M8.64623 7.09997L9.70006 6.04614L15.3539 11.7L9.70006 17.3538L8.64623 16.3L13.2462 11.7L8.64623 7.09997Z" />
      </svg>
    </IconWrapper>
  );
};

KeyboardArrowRightIcon.displayName = "KeyboardArrowRightIcon";
