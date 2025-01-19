import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const GridViewIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M3.5 11V3.5H11V11H3.5ZM3.5 20.5V13H11V20.5H3.5ZM13 11V3.5H20.5V11H13ZM13 20.5V13H20.5V20.5H13ZM4.99997 9.5H9.5V4.99998H4.99997V9.5ZM14.5 9.5H19V4.99998H14.5V9.5ZM14.5 19H19V14.5H14.5V19ZM4.99997 19H9.5V14.5H4.99997V19Z" />
      </svg>
    </IconWrapper>
  );
};

GridViewIcon.displayName = "GridViewIcon";
