import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const TuneIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M10.675 21V15.375H12.175V17.45H21V18.95H12.175V21H10.675ZM3 18.95V17.45H9.175V18.95H3ZM7.675 14.8V12.75H3V11.25H7.675V9.15H9.175V14.8H7.675ZM10.675 12.75V11.25H21V12.75H10.675ZM14.825 8.625V3H16.325V5.05H21V6.55H16.325V8.625H14.825ZM3 6.55V5.05H13.325V6.55H3Z" />
      </svg>
    </IconWrapper>
  );
};

TuneIcon.displayName = "TuneIcon";
