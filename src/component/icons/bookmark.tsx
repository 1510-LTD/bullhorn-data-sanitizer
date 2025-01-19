import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const BookmarkIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M17 3H7C5.9 3 5 3.9 5 5V21L12 18L19 21V5C19 3.9 18.1 3 17 3Z" />
      </svg>
    </IconWrapper>
  );
};

BookmarkIcon.displayName = "BookmarkIcon";
