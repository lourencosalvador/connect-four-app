import express from "express";
import { HistoryController } from "../modules/history/controllers/historyController";

const historyRouter = express.Router();

historyRouter.post("/", HistoryController.createHistory);

historyRouter.get("/:gameId", HistoryController.getHistoryByGameId);

historyRouter.get("/", HistoryController.getAllHistory);

historyRouter.put("/:gameId", HistoryController.updateHistory);

historyRouter.delete("/:gameId", HistoryController.delete);

export default historyRouter;
