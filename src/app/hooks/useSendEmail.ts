import { useMutation } from "@tanstack/react-query";

import { MailConfig } from "../app-types";
import { api } from "@/utils/ApiAxiosClient";

export const useSendEmail = () => {
  const { mutateAsync: sendEmail, ...rest } = useMutation({
    mutationFn: (config: MailConfig) => {
      return api.post("/api/external/sendgrid/send-mail", config);
    }
  });

  return {
    sendEmail,
    ...rest
  };
};
