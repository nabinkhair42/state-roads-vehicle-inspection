import { OPT_EXPIRATION_IN_SEC } from "@/constants/time.const";
import { sendMail } from "@/utils/send-mail";
import { marked } from "marked";

export const sendPasswordResetOtp = async (
  otp: string,
  email: string,
  name: string
) => {
  const subject = "Password Reset Request - Auto Inspector";
  const body = `
Dear **${name}**,

We received a request to reset your password. Please use the OTP below to proceed with resetting your password.

## OTP: **${otp}**

*This OTP will expire in ${OPT_EXPIRATION_IN_SEC / 60} minutes.*

If you did not request this password reset, please ignore this email or contact our support team at support@autoinspector.com.au.

Best regards,  
The Auto Inspector Team
`;

  await sendMail({
    to: email,
    subject: subject,
    html: await marked(body),
  });

  return true;
};
