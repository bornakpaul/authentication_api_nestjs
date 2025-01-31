CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text,
	"password" text NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
