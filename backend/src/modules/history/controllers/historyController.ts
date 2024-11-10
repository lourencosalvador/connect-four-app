import { Request, Response } from "express";
import { HistoryRepository } from "../repositories/historyRepository";
import { CreateHistoryDto } from "../dtos";

export class HistoryController {
  static async createHistory(req: Request, res: Response): Promise<void> {
    const createHistoryDto: CreateHistoryDto = req.body;

    try {
      const newHistory = await HistoryRepository.createHistory(
        createHistoryDto
      );
      res.status(201).json(newHistory);
    } catch (error) {
      console.error("Error creating history:", error);
      res.status(500).json({ error: "Error creating history." });
    }
  }

  static async getHistoryByGameId(req: Request, res: Response): Promise<void> {
    const { gameId } = req.params;

    try {
      const history = await HistoryRepository.getHistoryByGameId(gameId);
      if (!history) {
        res.status(404).json({ error: "History not found." });
        return;
      }
      res.status(200).json(history);
    } catch (error) {
      console.error("Error fetching history:", error);
      res.status(500).json({ error: "Error fetching history." });
    }
  }

  static async getAllHistory(req: Request, res: Response): Promise<void> {
    try {
      const histories = await HistoryRepository.getAllHistory();
      res.status(200).json(histories);
    } catch (error) {
      console.error("Error fetching all histories:", error);
      res.status(500).json({ error: "Error fetching all histories." });
    }
  }

  static async updateHistory(req: Request, res: Response): Promise<void> {
    const { gameId } = req.params;
    const { winner, status } = req.body;
    try {
      const updatedHistory = await HistoryRepository.updateHistory(
        gameId,
        winner,
        status
      );
      res.status(200).json(updatedHistory);
    } catch (error) {
      console.error("Error updating history:", error);
      res.status(500).json({ error: "Error updating history." });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const history = await HistoryRepository.deleteHistory(req.params.gameId);
      res.status(200).json({ message: "History deleting success", history });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error deleting history", details: error.message });
    }
  }
}
