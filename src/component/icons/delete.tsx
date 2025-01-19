import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const DeleteIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15 3V4H20V6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4V4H9V3H15ZM7 19H17V6H7V19ZM9 8H11V17H9V8ZM15 8H13V17H15V8Z"
        />
      </svg>
    </IconWrapper>
  );
};

DeleteIcon.displayName = "DeleteIcon";
