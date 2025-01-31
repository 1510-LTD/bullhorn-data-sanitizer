import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const TodayIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3 4.9 3 6V20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V9H19V20ZM6.5 13C6.5 11.62 7.62 10.5 9 10.5C10.38 10.5 11.5 11.62 11.5 13C11.5 14.38 10.38 15.5 9 15.5C7.62 15.5 6.5 14.38 6.5 13Z"
        />
      </svg>
    </IconWrapper>
  );
};

TodayIcon.displayName = "TodayIcon";
