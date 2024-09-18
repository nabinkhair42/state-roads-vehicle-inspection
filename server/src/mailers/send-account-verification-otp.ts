import { OPT_EXPIRATION_IN_SEC } from "@/constants/time.const";
import { sendMail } from "@/utils/send-mail";
import { marked } from "marked";

export const sendAccountVerificationOTP = async (
  otp: string,
  email: string,
  name: string
) => {
  const subject = "Resend OTP - Verify Your Account";
  const body = `
Dear **${name}**,

It looks like you requested to resend your OTP for verifying your account. Please use the OTP provided below to complete the verification process.

## OTP: **${otp}**

*This OTP will expire in ${OPT_EXPIRATION_IN_SEC / 60} minutes.*

If you did not request this OTP or need any further assistance, feel free to reach out to us at ${
    process.env.SUPPORT_EMAIL
  }.

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
