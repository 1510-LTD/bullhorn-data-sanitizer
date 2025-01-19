import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const FlagIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M4 21V3H13.2527L13.7099 5.21539H20V15.1846H13.033L12.5759 12.9692H5.71426V21H4ZM14.4572 13.5231H18.2857V6.87691H12.2857L11.8286 4.66152H5.71426V11.3077H14L14.4572 13.5231Z" />
      </svg>
    </IconWrapper>
  );
};

FlagIcon.displayName = "FlagIcon";
