// Requires
var router = require('express').Router();
var bodyParser = require('body-parser');
var request = require('request');

// Building query
var baseUrl = "http://api.brewerydb.com/v2";
var search = "/search?q=";
var type = "&type=beer";
var keyHead = "&key=";
var key = process.env.API_KEY;
var withBreweries = '&withBreweries=y';



router.get('/:beer', function (req, res) {
    console.log('In /beer route');
    console.log('req.params.beer', req.params.beer);
    var beer = req.params.beer;
    var fullUrl = baseUrl + search + beer + type + withBreweries + keyHead + key;
    request(fullUrl, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode: ', response && response.statusCode); // Print the response status code if a response was received
        console.log('body: ', body); // Print the HTML for the Google homepage.

        res.status(200).send(JSON.parse(body));
    });
});


// Export
module.exports = router;
