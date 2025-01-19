"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import styled from "styled-components";

const Dialog = DialogPrimitive.Root;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ ...props }, ref) => <DialogPrimitive.Overlay ref={ref} {...props} />);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ children, ...props }, forwardedRef) => (
  <>
    <DialogOverlayWrapper $isOpen={true} />
    <DialogContentWrapper {...props} ref={forwardedRef}>
      {children}
    </DialogContentWrapper>
  </>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

export { Dialog, DialogContent };

const DialogOverlayWrapper = styled(DialogPrimitive.Overlay)<{
  $isOpen: boolean;
}>`
  background-color: "rgba(0, 0, 0, .15)";
  position: "fixed";
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const DialogContentWrapper = styled(DialogPrimitive.Content)`
  width: fit-content;
  min-width: 450px;
  height: fit-content;
  min-height: 160px;
  margin: auto;
  background-color: white;
  border-radius: var(--border-radius-ms);
  padding: 1.5rem;
`;
