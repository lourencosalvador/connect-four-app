import { Router } from "express";
import historyRouter from "./historyRouter";

const router = Router();

router.use("/history", historyRouter);

export default router;
