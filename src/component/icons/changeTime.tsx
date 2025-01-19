import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const ChangeTimeIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M4.5 22C4.1 22 3.75 21.85 3.45 21.55C3.15 21.25 3 20.9 3 20.5V5C3 4.6 3.15 4.25 3.45 3.95C3.75 3.65 4.1 3.5 4.5 3.5H6.125V2H7.75V3.5H16.25V2H17.875V3.5H19.5C19.9 3.5 20.25 3.65 20.55 3.95C20.85 4.25 21 4.6 21 5V12.525H19.5V9.75H4.5V20.5H12.475V22H4.5ZM22.225 16.525L20.45 14.75L21.175 14.025C21.3135 13.8917 21.4898 13.825 21.7039 13.825C21.918 13.825 22.0917 13.8917 22.225 14.025L22.95 14.75C23.0833 14.8885 23.15 15.0648 23.15 15.2789C23.15 15.493 23.0833 15.6667 22.95 15.8L22.225 16.525ZM13.975 23V21.225L19.375 15.825L21.15 17.6L15.75 23H13.975ZM4.5 8.25H19.5V5H4.5V8.25Z" />
      </svg>
    </IconWrapper>
  );
};

ChangeTimeIcon.displayName = "ChangeTimeIcon";
