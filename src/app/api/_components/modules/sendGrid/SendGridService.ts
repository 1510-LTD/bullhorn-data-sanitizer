import { MailConfig } from "@/app/app-types";
import * as sgMail from "@sendgrid/mail";
import BullhornService from "../bullhorn/BullhornService";

const sendMail = async (config: MailConfig) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

  const { to, from, senderName, bcc, cc, subject, sgTemplateId, bhEntityId } =
    config;

  const msg: sgMail.MailDataRequired = {
    from: {
      email: from,
      ...(senderName && { name: senderName })
    },
    personalizations: [
      {
        subject,
        to: [
          {
            email: to
          }
        ],
        ...(cc && {
          cc: cc.map((email) => ({
            email: email
          }))
        }),
        ...(bcc && {
          bcc: bcc.map((email) => ({
            email: email
          }))
        })
      }
    ],
    content: [
      {
        type: "text/html",
        value: "text" in config ? config.text : config.template
      }
    ],
    templateId: sgTemplateId
  };

  await sgMail.send(msg);

  if (bhEntityId)
    await BullhornService.createNote(
      bhEntityId,
      "text" in config ? config.text : config.template
    );
};

const SendGridService = {
  sendMail
};

export default SendGridService;
