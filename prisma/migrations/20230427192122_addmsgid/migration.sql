/*
  Warnings:

  - Added the required column `discordMessageId` to the `BoolVote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BoolVote" ADD COLUMN     "discordMessageId" TEXT NOT NULL;
