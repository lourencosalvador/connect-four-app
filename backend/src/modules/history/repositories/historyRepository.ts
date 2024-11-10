import { prisma } from "../../../config/@clientPrisma";
import { CreateHistoryDto, HistoryDto } from "../dtos";

export class HistoryRepository {
  static async createHistory({
    gameId,
    winner,
    board,
    players,
    status,
  }: CreateHistoryDto): Promise<HistoryDto> {
    return prisma.history.create({
      data: {
        gameId,
        winner,
        board,
        players,
        status,
      },
    });
  }

  static async getHistoryByGameId(gameId: string): Promise<HistoryDto | null> {
    return prisma.history.findUnique({
      where: { gameId },
    });
  }

  static async getAllHistory(): Promise<HistoryDto[]> {
    return prisma.history.findMany();
  }

  static async updateHistory(
    gameId: string,
    winner: string,
    status: string
  ): Promise<HistoryDto> {
    return prisma.history.update({
      where: { gameId },
      data: { winner, status },
    });
  }

  static async deleteHistory(gameId: string): Promise<HistoryDto> {
    return prisma.history.delete({
      where: { gameId },
    });
  }
}
