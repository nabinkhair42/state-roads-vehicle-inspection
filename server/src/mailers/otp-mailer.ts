import { OPT_EXPIRATION_IN_SEC } from "@/constants/time.const";
import { sendMail } from "@/utils/send-mail";

export const otpMailer = async (otp: string, email: string) => {
  const html = `
    <div>
      <h1>Your OTP is ${otp}</h1>
      <p>OTP will expire in ${OPT_EXPIRATION_IN_SEC / 60} minutes</p>
    </div>
  `;

  await sendMail({
    to: email,
    subject: "Here is your OTP!",
    html,
  });

  return true;
};
