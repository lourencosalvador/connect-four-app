export interface Player {
  id: string;
  name: string;
  score: number;
}

export interface HistoryDto {
  id: string;
  gameId: string;
  winner: string | null;
  board: string | null;
  players: string;
  created_at: Date;
  status: string;
}
