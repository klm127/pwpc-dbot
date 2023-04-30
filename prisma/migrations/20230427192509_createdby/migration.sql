/*
  Warnings:

  - You are about to drop the `_BoolVoteToMember` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `createdById` to the `BoolVote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BoolVoteToMember" DROP CONSTRAINT "_BoolVoteToMember_A_fkey";

-- DropForeignKey
ALTER TABLE "_BoolVoteToMember" DROP CONSTRAINT "_BoolVoteToMember_B_fkey";

-- AlterTable
ALTER TABLE "BoolVote" ADD COLUMN     "createdById" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_BoolVoteToMember";

-- CreateTable
CREATE TABLE "_alreadyVoted" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_alreadyVoted_AB_unique" ON "_alreadyVoted"("A", "B");

-- CreateIndex
CREATE INDEX "_alreadyVoted_B_index" ON "_alreadyVoted"("B");

-- AddForeignKey
ALTER TABLE "BoolVote" ADD CONSTRAINT "BoolVote_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_alreadyVoted" ADD CONSTRAINT "_alreadyVoted_A_fkey" FOREIGN KEY ("A") REFERENCES "BoolVote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_alreadyVoted" ADD CONSTRAINT "_alreadyVoted_B_fkey" FOREIGN KEY ("B") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
