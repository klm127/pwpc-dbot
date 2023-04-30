-- CreateTable
CREATE TABLE "BoolVote" (
    "id" SERIAL NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "voteType" TEXT NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "prompt" TEXT NOT NULL,
    "ayeInfo" TEXT,
    "nayInfo" TEXT,
    "ayes" INTEGER NOT NULL DEFAULT 0,
    "nays" INTEGER NOT NULL DEFAULT 0,
    "ongoing" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BoolVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BoolVoteToMember" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BoolVoteToMemberRole" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BoolVoteToMember_AB_unique" ON "_BoolVoteToMember"("A", "B");

-- CreateIndex
CREATE INDEX "_BoolVoteToMember_B_index" ON "_BoolVoteToMember"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BoolVoteToMemberRole_AB_unique" ON "_BoolVoteToMemberRole"("A", "B");

-- CreateIndex
CREATE INDEX "_BoolVoteToMemberRole_B_index" ON "_BoolVoteToMemberRole"("B");

-- AddForeignKey
ALTER TABLE "_BoolVoteToMember" ADD CONSTRAINT "_BoolVoteToMember_A_fkey" FOREIGN KEY ("A") REFERENCES "BoolVote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoolVoteToMember" ADD CONSTRAINT "_BoolVoteToMember_B_fkey" FOREIGN KEY ("B") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoolVoteToMemberRole" ADD CONSTRAINT "_BoolVoteToMemberRole_A_fkey" FOREIGN KEY ("A") REFERENCES "BoolVote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoolVoteToMemberRole" ADD CONSTRAINT "_BoolVoteToMemberRole_B_fkey" FOREIGN KEY ("B") REFERENCES "MemberRole"("roleName") ON DELETE CASCADE ON UPDATE CASCADE;
