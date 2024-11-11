export interface Player {
  id: string;
  name: string;
  score: number;
}

export interface CreateHistoryDto {
  gameId: string;
  winner?: string | null;
  board?: string | null;
  players: Player[];
  status?: string;
}
