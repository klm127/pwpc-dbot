CREATE TABLE "Members" (
  "id" int PRIMARY KEY,
  "email" varchar UNIQUE,
  "first_name" varchar NOT NULL,
  "last_name" varchar,
  "birthday" timestamptz,
  "info" varchar,
  "discord_id" bigint,
  "last_discord_name" varchar,
  "graduation_date" timestamptz,
  "created_at" timestamptz DEFAULT (now())
);

CREATE TABLE "RoleAssignments" (
  "member" int NOT NULL,
  "member_role" varchar NOT NULL,
  "assigned_at" timestamptz DEFAULT (now()),
  PRIMARY KEY ("member", "member_role")
);

CREATE TABLE "MemberRoles" (
  "role_name" varchar PRIMARY KEY,
  "role_description" varchar
);

CREATE TABLE "VoteRecords" (
  "id" int PRIMARY KEY,
  "vote_start" timestamptz DEFAULT (now()),
  "vote_end" timestamptz NOT NULL,
  "vote_prompt" varchar,
  "aye" int DEFAULT 0,
  "nay" int DEFAULT 0,
  "limit_to_role" varchar
);

COMMENT ON COLUMN "Members"."info" IS 'Can be whatever member wants.';

COMMENT ON COLUMN "Members"."discord_id" IS 'Determined by bot and queries.';

COMMENT ON COLUMN "Members"."last_discord_name" IS 'Can change bot should update if so.';

COMMENT ON TABLE "RoleAssignments" IS 'Members may, and officers definitely will, have more than one role assignment.';

COMMENT ON TABLE "VoteRecords" IS 'Each row is a record of all votes (by eligible roles) on one subject.';

COMMENT ON COLUMN "VoteRecords"."limit_to_role" IS 'Votes can be limited to certain roles, such as Officers.';

ALTER TABLE "RoleAssignments" ADD FOREIGN KEY ("member") REFERENCES "Members" ("id");

ALTER TABLE "RoleAssignments" ADD FOREIGN KEY ("member_role") REFERENCES "MemberRoles" ("role_name");

ALTER TABLE "VoteRecords" ADD FOREIGN KEY ("limit_to_role") REFERENCES "MemberRoles" ("role_name");
