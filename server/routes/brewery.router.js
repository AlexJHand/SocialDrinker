// Requires
var router = require('express').Router();
var bodyParser = require('body-parser');
var request = require('request');

// Building query
var baseUrl = "http://api.brewerydb.com/v2";
var search = "/search?q=";
//var brewery = 'Surly';
// var type = "&type=beer";
var type = "&type=brewery";
var keyHead = "&key=";
var key = process.env.API_KEY;
var withBreweries = '&withBreweries=y';
// var fullUrl = baseUrl + search + brewery + type + withBreweries + keyHead + key;



router.get('/:brewery', function (req, res) {
    console.log('In /brewery route');
    console.log('req.params.brewery', req.params.brewery);
    var brewery = req.params.brewery;
    var fullUrl = baseUrl + search + brewery + type + keyHead + key;
    request(fullUrl, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode: ', response && response.statusCode); // Print the response status code if a response was received
        console.log('body: ', body); // Print the HTML for the Google homepage.

        res.status(200).send(JSON.parse(body));
    });
});


// Export
module.exports = router;