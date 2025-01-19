import toast from "react-hot-toast";
import styled from "styled-components";
import { InfoCircleIcon } from "./icons";

interface NotifyDelete {
  message: string;
}

export const notifyDelete = ({ message }: NotifyDelete) => {
  toast.custom(
    (t) => (
      <div
        style={{
          opacity: t.visible ? 1 : 0,
          backgroundColor: "var(--blue-main)",
          borderRadius: "var(--border-radius-ms)"
        }}
      >
        <ToastContainer>
          <span>
            <InfoCircleIcon />
            {message}
          </span>
        </ToastContainer>
      </div>
    ),
    {
      duration: 5000
    }
  );
};

const ToastContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5rem;
  padding: 0.5rem 1rem;
  color: var(--text-white);
  border-radius: var(--border-radius-md);
  line-height: 3;

  span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
  }

  button {
    cursor: no-drop; // change this when undo action is ready
  }

  a {
    color: var(--text-white);
  }
`;
