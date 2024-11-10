/*
  Warnings:

  - You are about to alter the column `created_at` on the `History` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_History" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gameId" TEXT NOT NULL,
    "winner" TEXT,
    "board" TEXT NOT NULL,
    "players" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'in progress'
);
INSERT INTO "new_History" ("board", "created_at", "gameId", "id", "players", "status", "winner") SELECT "board", "created_at", "gameId", "id", "players", "status", "winner" FROM "History";
DROP TABLE "History";
ALTER TABLE "new_History" RENAME TO "History";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
