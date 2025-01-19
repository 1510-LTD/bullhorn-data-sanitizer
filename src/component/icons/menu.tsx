import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const MenuIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 8V6H21V8H3ZM3 13H21V11H3V13ZM3 18H21V16H3V18Z"
        />
      </svg>
    </IconWrapper>
  );
};

MenuIcon.displayName = "MenuIcon";
