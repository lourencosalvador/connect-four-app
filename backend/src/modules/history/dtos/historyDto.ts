export interface HistoryDto {
  id: string;
  gameId: string;
  winner: string | null;
  board: string;
  players: string;
  created_at: Date;
  status: string;
}
