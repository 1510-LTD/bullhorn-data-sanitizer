import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const BarChart4BarsIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M2.5 20.5V19H21.5V20.5H2.5ZM3.5 17.6153V11.5H5.99998V17.6153H3.5ZM8.32693 17.6153V6.5H10.8269V17.6153H8.32693ZM13.1635 17.6153V9.5H15.6634V17.6153H13.1635ZM18 17.6153V3.5H20.5V17.6153H18Z" />
      </svg>
    </IconWrapper>
  );
};

BarChart4BarsIcon.displayName = "BarChart4BarsIcon";
