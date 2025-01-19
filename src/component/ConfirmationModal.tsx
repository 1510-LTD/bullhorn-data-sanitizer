import React from "react";

import Modal from "./Modal";
import ConfirmModal from "./ConfirmModal";

interface Props {
  onClose: () => void;
  isOpen: boolean;
  title: string;
  message?: string;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<Props> = ({
  onClose,
  isOpen,
  title,
  message,
  onConfirm
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ConfirmModal
        title={title}
        onConfirm={onConfirm}
        confirmCaption="Confirm"
        onCancel={onClose}
        cancelCaption="Cancel"
        message={message}
      />
    </Modal>
  );
};

export default ConfirmationModal;
