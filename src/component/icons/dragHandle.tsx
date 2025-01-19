import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const DragHandleIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M20 9H4V11H20V9ZM4 15H20V13H4V15Z" />
      </svg>
    </IconWrapper>
  );
};

DragHandleIcon.displayName = "DragHandleIcon";
