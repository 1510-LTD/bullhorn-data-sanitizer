import toast from "react-hot-toast";
import styled from "styled-components";
import { InfoCircleIcon } from "./icons";
import { extractErrors } from "../utils/converter";

export const notifyError = (error: unknown) => {
  const { message, fields } = extractErrors(error);

  const errors = !fields.length ? [message] : fields;

  errors.forEach((message, idx) =>
    toast.custom(
      (t) => (
        <div
          id={idx.toString()}
          style={{
            opacity: t.visible ? 1 : 0,
            backgroundColor: "var(--error-color)",
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
        duration: 3000
      }
    )
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
  min-width: 250px;

  span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
  }

  a {
    color: var(--text-white);
  }
`;
