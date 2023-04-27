-- CreateEnum
CREATE TYPE "MemberRoleAccessLevel" AS ENUM ('admin', 'mod', 'member', 'guest');

-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "birthday" TIMESTAMP(3),
    "info" TEXT,
    "lastDiscordName" TEXT,
    "graduationDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberRole" (
    "roleName" TEXT NOT NULL,
    "roleDescription" TEXT NOT NULL DEFAULT '',
    "accessLevel" "MemberRoleAccessLevel" NOT NULL DEFAULT 'guest',

    CONSTRAINT "MemberRole_pkey" PRIMARY KEY ("roleName")
);

-- CreateTable
CREATE TABLE "RoleAssignment" (
    "memberID" INTEGER NOT NULL,
    "memberRoleName" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoleAssignment_pkey" PRIMARY KEY ("memberID","memberRoleName")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_email_key" ON "Member"("email");

-- AddForeignKey
ALTER TABLE "RoleAssignment" ADD CONSTRAINT "RoleAssignment_memberID_fkey" FOREIGN KEY ("memberID") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleAssignment" ADD CONSTRAINT "RoleAssignment_memberRoleName_fkey" FOREIGN KEY ("memberRoleName") REFERENCES "MemberRole"("roleName") ON DELETE RESTRICT ON UPDATE CASCADE;
