import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const TableIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M3.5 20.5V3.5H20.5V20.5H3.5ZM4.99997 9.0769H19V4.99998H4.99997V9.0769ZM10.1615 14.0385H13.8385V10.5769H10.1615V14.0385ZM10.1615 19H13.8385V15.5384H10.1615V19ZM4.99997 14.0385H8.66155V10.5769H4.99997V14.0385ZM15.3384 14.0385H19V10.5769H15.3384V14.0385ZM4.99997 19H8.66155V15.5384H4.99997V19ZM15.3384 19H19V15.5384H15.3384V19Z" />
      </svg>
    </IconWrapper>
  );
};

TableIcon.displayName = "TableIcon";
