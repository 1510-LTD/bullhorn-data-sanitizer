import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const ChatBubbleOutlineIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" />
      </svg>
    </IconWrapper>
  );
};

ChatBubbleOutlineIcon.displayName = "ChatBubbleOutlineIcon";
