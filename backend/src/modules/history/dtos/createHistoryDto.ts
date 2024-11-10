export interface CreateHistoryDto {
  gameId: string;
  winner?: string;
  board: string;
  players: string;
  status?: string;
}
