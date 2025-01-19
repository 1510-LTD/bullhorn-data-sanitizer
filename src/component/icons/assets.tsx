import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const AssetsIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M20 11.7778V6H14.75V8.16667H10.25V6H5V11.7778H10.25V9.61111H11.75V16.8333H14.75V19H20V13.2222H14.75V15.3889H13.25V9.61111H14.75V11.7778H20ZM8.75 10.3333H6.5V7.44444H8.75V10.3333ZM16.25 14.6667H18.5V17.5556H16.25V14.6667ZM16.25 7.44444H18.5V10.3333H16.25V7.44444Z" />
      </svg>
    </IconWrapper>
  );
};

AssetsIcon.displayName = "AssetsIcon";
