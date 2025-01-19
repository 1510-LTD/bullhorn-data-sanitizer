import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const BookmarkBorderIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M7 3H17C18.1 3 19 3.9 19 5V21L12 18L5 21V5C5 3.9 5.9 3 7 3ZM12 15.82L17 18V5H7V18L12 15.82Z" />
      </svg>
    </IconWrapper>
  );
};

BookmarkBorderIcon.displayName = "BookmarkBorderIcon";
