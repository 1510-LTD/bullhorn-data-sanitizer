import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const CheckIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M9.00003 16.1701L4.83003 12.0001L3.41003 13.4101L9.00003 19.0001L21 7.00009L19.59 5.59009L9.00003 16.1701Z" />
      </svg>
    </IconWrapper>
  );
};

CheckIcon.displayName = "CheckIcon";
