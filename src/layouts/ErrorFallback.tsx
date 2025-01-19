import { Button } from "@/component/button";
import styled from "styled-components";

const ErrorContainer = styled.div`
  width: 100%;
`;

const ErrorHeading = styled.h2`
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--error-color);
  margin-bottom: 1rem;
`;

const ReloadButton = styled(Button)`
  margin-top: 1rem;
`;

export interface ErrorFallbackType {
  className?: string;
  error?: Error | null;
  retryText?: string;
  onRetry?: () => void;
}

const defaultMessage = "Sorry, something went wrong. Please try again.";

export const ErrorFallback = ({
  error = new Error(defaultMessage),
  retryText = "Retry",
  onRetry,
  className
}: ErrorFallbackType) => {
  return (
    <ErrorContainer role="alert" className={className}>
      <ErrorHeading>Something went wrong!</ErrorHeading>
      <p>{error?.message || defaultMessage}</p>
      {onRetry && <ReloadButton onClick={onRetry}>{retryText}</ReloadButton>}
    </ErrorContainer>
  );
};

export const ErrorFallbackPage = styled(ErrorFallback)`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 2rem;
  width: 100%;
`;
