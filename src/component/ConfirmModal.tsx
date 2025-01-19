import styled from "styled-components";
import { Button } from "./button";
import { BodyText2 } from "@/utils/fonts";
import { FlexColumnGapWrapper } from "../utils/styled";

interface ConfirmModalProps {
  title: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
  cancelCaption?: string;
  confirmCaption?: string;
}

const ConfirmModal = ({
  title,
  message,
  onCancel,
  onConfirm,
  cancelCaption,
  confirmCaption
}: ConfirmModalProps) => {
  const cancelCaptionFallback = "cancel";
  const confirmCaptionFallback = "confirm";
  return (
    <ConfirmModalContainer>
      <FlexColumnGapWrapper>
        {title ? (
          <>
            <FormHeader>{title}</FormHeader>
            {message && <BodyText2>{message}</BodyText2>}
          </>
        ) : (
          <FormHeader>{title || message}</FormHeader>
        )}
      </FlexColumnGapWrapper>
      <ButtonContainer>
        <OverrideButton
          $confirmColor="normal"
          label={confirmCaption || confirmCaptionFallback}
          type="button"
          onClick={onConfirm}
        />
        <Button
          outlined
          label={cancelCaption || cancelCaptionFallback}
          type="button"
          onClick={onCancel}
        />
      </ButtonContainer>
    </ConfirmModalContainer>
  );
};

export default ConfirmModal;

const FormHeader = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  margin-top: 0.25rem;
`;

const ConfirmModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const OverrideButton = styled(Button)<{
  $confirmColor: "error" | "normal" | undefined;
}>`
  ${({ $confirmColor }) =>
    $confirmColor === "error" ? "--button-bg: var(--error-color)" : ""};
`;
