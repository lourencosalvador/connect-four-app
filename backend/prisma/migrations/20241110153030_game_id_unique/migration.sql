/*
  Warnings:

  - A unique constraint covering the columns `[gameId]` on the table `History` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "History_gameId_key" ON "History"("gameId");
