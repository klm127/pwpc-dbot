/*
  Warnings:

  - A unique constraint covering the columns `[discordId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Member_discordId_key" ON "Member"("discordId");
