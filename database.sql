CREATE TABLE "users" (
  "id" serial primary key,
  "username" varchar(80) not null UNIQUE,
  "password" varchar(240) not null
);

CREATE TABLE "beersdrank" (
	"id" serial primary key,
	"beer_name" varchar(80) not null,
	"brewery_name" varchar(100),
	"brewery_location" varchar(100),
	"brewery_region" varchar(50),
	"brewery_country" varchar(50),
	"style" varchar(50),
	"description" varchar(1000),
	"image" varchar(200)
);

CREATE TABLE "users_beersdrank" (
	"id" serial primary key,
	users_id integer NOT NULL REFERENCES users,
	beersdrank_id integer NOT NULL REFERENCES beersdrank,
	"rating" integer,
	"comment" varchar(300)
);