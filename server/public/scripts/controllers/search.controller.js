myApp.controller('SearchController', function ($location, UserService) {
    console.log('SearchController created');
    var vm = this;
    vm.UserService = UserService;
    vm.returnedBeers = {list: []};
    vm.returnedBreweries = {list: []};
    vm.returnedBreweryBeers = {list: []};
    vm.showBeerInput = true;
    vm.breweryId = '';

    vm.search = {
        inputBeer: '',
        inputBrewery: ''
    };
    // vm.message = '';
    vm.returnedBeers.list = UserService.beers;
    vm.returnedBreweries.list = UserService.breweries;
    vm.returnedBreweryBeers = UserService.breweryBeers;
    vm.showRatingsInputs = false;

    vm.addBeer = function () {
        console.log('In sc.addBeer()');
        console.log('vm.rating:', vm.rating);
        console.log('vm.comment:', vm.comment);
        vm.UserService.ratingObject = {
            rating: vm.rating,
            comment: vm.comment
        } 
        UserService.addBeer();
    }
    
    vm.beerDetail = function(beer) {
        console.log('In beerDetail');
        console.log('Beer clicked:', beer);
        $location.path('/beer');
        vm.UserService.beer = beer;
    }

    vm.breweryDetail = function(brewery) {
        console.log('In breweryDetail()');
        console.log('Brewery clicked:', brewery);
        $location.path('/brewery');
        vm.breweryId = brewery.id;
        console.log('brewery.id', brewery.id);
        vm.UserService.brewery = brewery;
    }

    vm.searchBeer = function () {
        console.log('In searchBeer()');
        console.log('vm.search.beer:', vm.search.inputBeer);
        UserService.getBeer(vm.search.inputBeer);
        console.log('vm.returnedBeers: ', vm.returnedBeers);
        vm.search = {};
        vm.beerForm.$setPristine();    
    }

    vm.searchBrewery = function () {
        console.log('In searchBrewery()');
        console.log('vm.search.brewery:', vm.search.inputBrewery);
        UserService.getBrewery(vm.search.inputBrewery);
        console.log('vm.returnedBreweries: ', vm.returnedBreweries);
        console.log('vm.breweryId', vm.breweryId);
        vm.search = {};
        vm.breweryForm.$setPristine();
    }

    vm.searchBreweryBeers = function () {
        console.log('In searchBreweryBeers()');
        console.log('UserService.brewery ->', UserService.brewery);
        UserService.getBreweryBeers(UserService.brewery.id).then(function () {

        console.log('vm.returnedBreweryBeers: ', vm.returnedBreweryBeers);
        })
    }

    // vm.showBreweryPage = function () {
    //     $location.path('/brewery');
    // }

    vm.showRatings = function () {
        console.log('In showRatings()');
        vm.showRatingsInputs = true;
    }

    vm.showBeerSearch = function () {
        vm.showBeerInput = true;
    }

    vm.showBrewerySearch = function () {
        vm.showBeerInput = false;
    }




});
