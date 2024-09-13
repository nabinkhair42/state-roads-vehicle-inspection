import { OPT_EXPIRATION_IN_SEC } from "@/constants/time.const";
import { sendMail } from "@/utils/send-mail";
import { marked } from "marked";

export const sendWelcomeMailToUser = async (
  otp: string,
  email: string,
  name: string
) => {
  const welcomeSubject =
    "Welcome to Auto Inspector! Please Verify Your Account";
  const welcomeBody = `
Dear **${name}**,

Welcome to Auto Inspector! We're thrilled to have you on board as part of our community. Auto Inspector is dedicated to helping you inspect and manage your vehicle's details with ease.

To get started, please verify your account by using the provided otp.

## OTP: ${otp}

*OTP will expire in ${OPT_EXPIRATION_IN_SEC / 60} minutes*

This will ensure you can access all the features our platform has to offer.

If you have any questions or need assistance, feel free to reach out to us at support@autoinspector.com.au. We're here to help!

Thank you for joining Auto Inspector, and we look forward to serving you.

Best regards, <br>
The Auto Inspector Team!
`;

  await sendMail({
    to: email,
    subject: welcomeSubject,
    html: await marked(welcomeBody),
  });

  return true;
};
