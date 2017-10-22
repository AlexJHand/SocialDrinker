// Requires
var router = require('express').Router();
var pool = require('../modules/pool.js');

// Get from database
router.get('/', function (req, res) {
    console.log('In post route');
    console.log('req.body:', req.body);

    if (req.isAuthenticated()) {
        // send back user object from database
        console.log('logged in', req.user);

        pool.connect(function (err, client, done) {
            if (err) {
                console.log('Connection error:', err);
                res.sendStatus(500);
            } else {
                var queryString = 'SELECT beersdrank.beer_name, beersdrank.brewery_name, users_beersdrank.rating, users_beersdrank.comment FROM users_beersdrank LEFT JOIN beersdrank ON beersdrank.id=users_beersdrank.beersdrank_id WHERE users_beersdrank.users_id=$1';
                var values = [req.user.id];
                client.query(queryString, values, function (error, result) {
                    done();
                    if (error) {
                        console.log('Error:', error);
                        res.sendStatus(500);
                    } else {
                        res.send(result);
                        console.log('result:', result);
                    } // end else

                }); // end client.query
            } // end else
        }); // end pool.connect

    } else {
        // failure best handled on the server. do redirect here.
        console.log('not logged in');
        // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
        res.send(false);
    } // end else

}); // end Get

// Post to database
router.post('/', function (req, res) {
    console.log('In post route');
    console.log('req.body:', req.body);

    if (req.isAuthenticated()) {
        // send back user object from database
        console.log('logged in', req.user);

        var userId = req.user.id;
        var beerName = req.body[0].name;
        var beerBrewery = req.body[0].breweries[0].name;
        var beerLocation = req.body[0].breweries[0].locations[0].locality;
        var beerCountry = req.body[0].breweries[0].locations[0].country.displayName;
        var beerStyle = req.body[0].style.shortName;
        var beerDesc = req.body[0].description;
        var beerRating = req.body[2].rating;
        var beerComment = req.body[2].comment;

        console.log('Style:', beerStyle);

        pool.connect(function (err, client, done) {
            if (err) {
                console.log('Connection error:', err);
                res.sendStatus(500);
            } else {
                var queryString = 'INSERT INTO beersdrank (beer_name, brewery_name, brewery_location, brewery_country, style, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;';
                var values = [beerName, beerBrewery, beerLocation, beerCountry, beerStyle, beerDesc];
                client.query(queryString, values, function (error, result) {
                    done();
                    if (error) {
                        console.log('Error:', error);
                        res.sendStatus(500);
                    } else {
                        console.log('result:', result);
                        var beerId = result.rows[0].id;
                        console.log('beerId:', beerId);
                        var queryString2 = 'INSERT INTO users_beersdrank (users_id, beersdrank_id, rating, comment) VALUES ($1, $2, $3, $4);';
                        var values2 = [userId, beerId, beerRating, beerComment];
                        client.query(queryString2, values2, function (error, result2) {
                            done();
                            if (error) {
                                console.log('Error:', error);
                                res.sendStatus(500);
                            } else {
                                res.sendStatus(201);
                                console.log('result2:', result2);
                            }
                        }); // end client.query
                    } // end else
                }) // end client.query
            } // end else
        }); // end pool.connect

    } else {
        // failure best handled on the server. do redirect here.
        console.log('not logged in');
        // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
        res.send(false);
    }

});


// Exports
module.exports = router;