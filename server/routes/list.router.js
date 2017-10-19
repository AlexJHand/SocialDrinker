// Requires
var router = require('express').Router();
var pool = require('../modules/pool.js');

// Post to database
router.post('/', function(req, res) {
    console.log('In post route');
    var beerName = req.body.name;
    var beerBrewery = req.body.brewery;
    var beerLocation = req.body.location;
    var beerStyle = req.body.style;

    pool.connect(function (err, client, done) {
        if (err) {
            console.log('err');
            res.sendStatus(500);
        } else {
            var queryString = '';
            var values = [beerName, beerBrewery, beerLocation, beerStyle];
            client.query()
        }
    });
});


// Exports
module.exports = router;