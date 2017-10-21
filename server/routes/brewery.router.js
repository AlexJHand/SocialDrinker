// Requires
var router = require('express').Router();
var bodyParser = require('body-parser');
var request = require('request');

// Building query
var baseUrl = "http://api.brewerydb.com/v2";
var search = "/search?q=";
var type = "&type=brewery";
var keyHead = "&key=";
var key = process.env.API_KEY;
var withBreweries = '&withBreweries=y';



router.get('/:brewery', function (req, res) {
    console.log('In /brewery route');
    console.log('req.params.brewery', req.params.brewery);

    if (req.isAuthenticated()) {
        // send back user object from database
        console.log('logged in', req.user);

        var brewery = req.params.brewery;
        var fullUrl = baseUrl + search + brewery + type + keyHead + key;
        request(fullUrl, function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode: ', response && response.statusCode); // Print the response status code if a response was received
            console.log('body: ', body); // Print the HTML for the Google homepage.

            res.status(200).send(JSON.parse(body));
        });
    } else {
        // failure best handled on the server. do redirect here.
        console.log('not logged in');
        // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
        res.send(false);
    }
});

router.get('/:brewery/beers', function (req, res) {
    console.log('In /brewery/beers route');
    console.log('req.params.brewery', req.params.brewery);

    if (req.isAuthenticated()) {
        // send back user object from database
        console.log('logged in', req.user);

        var brewery = req.params.brewery;
        // var fullUrl = baseUrl + search + brewery + type + keyHead + key;
        // var fullUrl = baseUrl + search + '&type=beer&brewery=' + brewery + withBreweries + keyHead + key;
        var fullUrl = baseUrl + '/brewery/' + brewery + '/beers?' + withBreweries + keyHead + key;
        request(fullUrl, function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode: ', response && response.statusCode); // Print the response status code if a response was received
            // console.log('body: ', body);
            res.status(200).send(JSON.parse(body));
        });
    } else {
        // failure best handled on the server. do redirect here.
        console.log('not logged in');
        // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
        res.send(false);
    }
});

// Export
module.exports = router;