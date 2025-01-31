import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const HomeIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M5.99997 18.9999H9.34615V13.0576H14.6538V18.9999H18V9.99989L12 5.48066L5.99997 9.99989V18.9999ZM4.5 20.4999V9.24991L12 3.60571L19.5 9.24991V20.4999H13.1538V14.5575H10.8461V20.4999H4.5Z" />
      </svg>
    </IconWrapper>
  );
};

HomeIcon.displayName = "HomeIcon";
