import { IconProps } from "./contracts";
import { IconWrapper } from "./iconWrapper";

// TODO: Update icon with a version that has a viewport of 24x24. Cannot extract that from Figma atm.

export const DownloadForOffline = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19">
        <path d="M4.75 14.25H14.25V12.75H4.75V14.25ZM9.49998 11.1538L13.1538 7.49998L12.1 6.44615L10.25 8.2654V3.75H8.75V8.2654L6.89998 6.44615L5.84615 7.49998L9.49998 11.1538ZM9.50165 19C8.18772 19 6.95268 18.7506 5.79655 18.252C4.6404 17.7533 3.63472 17.0765 2.7795 16.2217C1.92427 15.3669 1.24721 14.3616 0.748325 13.206C0.249442 12.0504 0 10.8156 0 9.50165C0 8.18772 0.249334 6.95268 0.748 5.79655C1.24667 4.6404 1.92342 3.63472 2.77825 2.7795C3.6331 1.92427 4.63834 1.24721 5.79398 0.748326C6.94959 0.249443 8.18437 0 9.4983 0C10.8122 0 12.0473 0.249334 13.2034 0.748001C14.3596 1.24667 15.3652 1.92342 16.2205 2.77825C17.0757 3.6331 17.7527 4.63834 18.2516 5.79398C18.7505 6.94959 19 8.18437 19 9.4983C19 10.8122 18.7506 12.0473 18.252 13.2034C17.7533 14.3596 17.0765 15.3652 16.2217 16.2205C15.3669 17.0757 14.3616 17.7527 13.206 18.2516C12.0504 18.7505 10.8156 19 9.50165 19ZM9.49998 17.5C11.7333 17.5 13.625 16.725 15.175 15.175C16.725 13.625 17.5 11.7333 17.5 9.49998C17.5 7.26664 16.725 5.37498 15.175 3.82498C13.625 2.27498 11.7333 1.49998 9.49998 1.49998C7.26664 1.49998 5.37498 2.27498 3.82498 3.82498C2.27498 5.37498 1.49998 7.26664 1.49998 9.49998C1.49998 11.7333 2.27498 13.625 3.82498 15.175C5.37498 16.725 7.26664 17.5 9.49998 17.5Z" />
      </svg>
    </IconWrapper>
  );
};

DownloadForOffline.displayName = "DownloadForOffline";
