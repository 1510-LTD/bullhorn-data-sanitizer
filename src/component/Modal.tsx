"use client";

import React, { ReactNode } from "react";

import styled from "styled-components";
import { Dialog } from "./Dialog";
import { DialogContent } from "@radix-ui/react-dialog";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
  $backgroundColor?: string;
}

const Modal: React.FC<ModalProps> = ({
  children,
  onClose,
  isOpen,
  $backgroundColor
}) => {
  return (
    <ModalWrapper $isOpen={isOpen} $backgroundColor={$backgroundColor}>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <ModalContent $backgroundColor={$backgroundColor}>
          <DialogContent>{children}</DialogContent>
        </ModalContent>
      </Dialog>
    </ModalWrapper>
  );
};
export default Modal;

const ModalWrapper = styled.div<{
  $isOpen: boolean;
  $backgroundColor?: string;
}>`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${({ $backgroundColor }) =>
    $backgroundColor || "rgba(0, 0, 0, 0.32)"};
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: baseline;
  z-index: 9;
`;

const ModalContent = styled.div<{ $backgroundColor?: string }>`
  background-color: ${({ $backgroundColor }) =>
    $backgroundColor || "var(--main-background-color)"};
  border-radius: var(--border-radius-ms);
  padding: 1rem;
`;
