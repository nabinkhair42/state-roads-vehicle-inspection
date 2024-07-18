import ENV_CONFIG from "@/config/env.config";
import { createTransport } from "nodemailer";

type Props = {
  to: string;
  subject: string;
  html: string;
};

export const sendMail = async ({ html, subject, to }: Props) => {
  const transporter = createTransport({
    host: ENV_CONFIG.SMTP_HOST,
    auth: {
      user: ENV_CONFIG.SMTP_USER_EMAIL,
      pass: ENV_CONFIG.SMTP_USER_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      to,
      from: ENV_CONFIG.SMTP_USER_EMAIL,
      subject:
        ENV_CONFIG.NODE_ENV === "development"
          ? `DEVELOPMENT: ${subject}`
          : subject,
      html,
    });
    return true;
  } catch (error) {
    return false;
  }
};
