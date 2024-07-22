import { handleGetAllWorkshops } from "@/controllers/workshop";
import { Router } from "express";

const router = Router();

router.get("/", handleGetAllWorkshops);

export default router;