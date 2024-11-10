-- CreateTable
CREATE TABLE "History" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gameId" TEXT NOT NULL,
    "winner" TEXT,
    "board" TEXT NOT NULL,
    "players" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'in progress'
);
