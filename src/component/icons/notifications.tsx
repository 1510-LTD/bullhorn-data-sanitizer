import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const NotificationsIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M4.25 18.8653V17.3653H6.25V10.1153C6.25 8.75759 6.66987 7.55728 7.5096 6.51434C8.34935 5.47139 9.42948 4.80248 10.75 4.50762V3.80762C10.75 3.45505 10.8702 3.15858 11.1106 2.91819C11.3509 2.67781 11.6474 2.55762 12 2.55762C12.3525 2.55762 12.649 2.67781 12.8894 2.91819C13.1298 3.15858 13.25 3.45505 13.25 3.80762V4.50762C14.5705 4.80248 15.6506 5.47139 16.4903 6.51434C17.3301 7.55728 17.75 8.75759 17.75 10.1153V17.3653H19.75V18.8653H4.25ZM12 21.8076C11.5077 21.8076 11.0833 21.6326 10.7269 21.2826C10.3705 20.9326 10.1923 20.505 10.1923 19.9999H13.8077C13.8077 20.505 13.6327 20.9326 13.2826 21.2826C12.9326 21.6326 12.5051 21.8076 12 21.8076ZM7.74995 17.3653H16.25V10.1153C16.25 8.93836 15.8359 7.93578 15.0077 7.10757C14.1795 6.27937 13.1769 5.86527 12 5.86527C10.823 5.86527 9.82047 6.27937 8.99227 7.10757C8.16406 7.93578 7.74995 8.93836 7.74995 10.1153V17.3653Z" />
      </svg>
    </IconWrapper>
  );
};

NotificationsIcon.displayName = "NotificationsIcon";
