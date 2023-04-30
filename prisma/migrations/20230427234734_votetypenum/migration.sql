/*
  Warnings:

  - Changed the type of `voteType` on the `BoolVote` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "VoteTypes" AS ENUM ('poll', 'vote', 'amendment');

-- AlterTable
ALTER TABLE "BoolVote" DROP COLUMN "voteType",
ADD COLUMN     "voteType" "VoteTypes" NOT NULL;
