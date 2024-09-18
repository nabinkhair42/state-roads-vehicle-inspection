import { handleContact } from "@/controllers/contact";
import { tryCatch } from "@/middlewares/try-catch";
import { validateBody } from "@/middlewares/validate-body";
import { ContactSchema } from "@/zod/contact.zod";
import { Router } from "express";

const contactRouter = Router();

contactRouter.post("/", validateBody(ContactSchema), tryCatch(handleContact));

export default contactRouter;
