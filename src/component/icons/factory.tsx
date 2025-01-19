import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

export const FactoryIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M2.50003 21.5V10.3116L8.49998 7.75967V9.74045L13.5 7.74045V10.5H21.5V21.5H2.50003ZM4.00001 20H20V12H12V9.95L7.00001 11.95V10L4.00001 11.325V20ZM11.1154 17.7692H12.8846V14.2308H11.1154V17.7692ZM7.11541 17.7692H8.88461V14.2308H7.11541V17.7692ZM15.1154 17.7692H16.8846V14.2308H15.1154V17.7692ZM21.5 10.5H17.4424L18.4424 2.88467H20.5577L21.5 10.5Z" />
      </svg>
    </IconWrapper>
  );
};

FactoryIcon.displayName = "FactoryIcon";
