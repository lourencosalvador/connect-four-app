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
        players: JSON.stringify(players),
        status,
      },
    });
  }

  static async getHistoryByGameId(gameId: string): Promise<HistoryDto | null> {
    const history = await prisma.history.findUnique({
      where: { gameId },
    });

    if (history) {
      return {
        ...history,
        players: JSON.parse(history.players),
      };
    }
    return null;
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
