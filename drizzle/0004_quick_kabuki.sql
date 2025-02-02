CREATE TABLE "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text,
	"published" boolean DEFAULT false,
	"timestamp" timestamp DEFAULT now(),
	"userId" integer
);
--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;