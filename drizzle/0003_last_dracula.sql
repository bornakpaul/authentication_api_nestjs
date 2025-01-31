CREATE TYPE "public"."user_role" AS ENUM('admin', 'user');--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT ARRAY['user']::user_role[];