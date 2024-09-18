import { sendRes } from "@/middlewares/send-response";
import { sendMail } from "@/utils/send-mail";
import { IContactSchema } from "@/zod/contact.zod";
import { Request, Response } from "express";

export const handleContact = async (req: Request, res: Response) => {
  const { name, email, phoneNumber, companyName, message } =
    req.body as IContactSchema;

  await sendMail({
    subject: `New Contact From ${name}`,
    to: process.env.SUPPORT_EMAIL,
    html: `
      Name: ${name}
      Email: ${email}
      Phone Number: ${phoneNumber}
      ${companyName ? `Company Name: ${companyName}` : ""}
      Message: ${message}
    `,
  });

  return sendRes(res, {
    status: 200,
  });
};
