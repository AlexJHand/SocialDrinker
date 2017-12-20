# Social Drinker

Social Drinker is an application that allows users to search for beers that they've consumed and them save them to a list along with their personal rating and comments for each. Searching by the name of the beer, or by the name of the brewery that produces it, users will be able to see information about that beer, including style, ibu's, abv, and location produced. 

### Link

[SocialDrinker.herokuapp.com](http://socialdrinker.herokuapp.com)

## Built With

HTML5, CSS3, AngularJS, NodeJS, Express, Passport, PostgreSQL, BreweryDB api, Sweet Alerts, Google Fonts.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 
Clone these files to your local machine, ensure that you have a PostgreSQL database correctly configured, and make sure to install the required dependencies via Node.js.

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- PostgreSQL
- Dependencies
  - angular
  - angular-route
  - bcrypt
  - body-parser
  - express
  - passport
  - path


### Installing

After the dependencies are installed, use ```npm start``` to start the server, which will run on port 5000.

```sql
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
```

## Screen Shot

![Image of User Page](https://github.com/AlexJHand/SocialDrinker/blob/master/server/public/images/Screen%20Shot%202017-11-30%20at%207.58.16%20PM.png)

![Image of Beer Page](https://github.com/AlexJHand/SocialDrinker/blob/master/server/public/images/Screen%20Shot%202017-11-30%20at%207.59.50%20PM.png)


### Completed Features

- [x] Authorized user accounts
- [x] Saved user beer lists
- [x] Ability to view and delete existing user ratings and comments
- [x] Search functionality by beer name and brewery name
- [x] Detailed beer page with pertinent information
- [x] Star rating system

### Next Steps

- [ ] Ability to view beers consumed by friends
- [ ] Assign brewery image to beers that don't already have an image

## Authors

* Alex Hand


## Acknowledgments

* Thank you to BreweryDB
