-- CreateTable
CREATE TABLE "History" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gameId" TEXT NOT NULL,
    "winner" TEXT,
    "board" TEXT,
    "players" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'in progress'
);

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gameId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "player" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "History_gameId_key" ON "History"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "Player_gameId_key" ON "Player"("gameId");
