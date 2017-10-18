myApp.controller('SearchController', function ($location, UserService) {
    console.log('SearchController created');
    var vm = this;
    vm.UserService = UserService;
    vm.returnedBeers = {list: []};
    vm.returnedBreweries = {list: []};
    vm.breweryId = '';

    vm.search = {
        inputBeer: '',
        inputBrewery: ''
    };
    // vm.message = '';
    vm.returnedBeers.list = UserService.beers;
    vm.returnedBreweries.list = UserService.breweries;

    vm.beerDetail = function(beer) {
        console.log('In beerDetail');
        console.log('Beer clicked:', beer);
        $location.path('/beer');
        vm.UserService.beer = beer;
    }

    vm.searchBeer = function () {
        console.log('In searchBeer()');
        console.log('vm.search.beer:', vm.search.inputBeer);
        UserService.getBeer(vm.search.inputBeer);
        console.log('vm.returnedBeers: ', vm.returnedBeers);
        vm.search = {};
        vm.myForm.$setPristine();    
    }

    vm.searchBrewery = function () {
        console.log('In searchBrewery()');
        console.log('vm.search.brewery:', vm.search.inputBrewery);
        UserService.getBrewery(vm.search.inputBrewery);
        console.log('vm.returnedBreweries: ', vm.returnedBreweries);
        // vm.breweryId = vm.returnedBreweries.list.list[0].id;
        console.log('vm.breweryId', vm.breweryId);
        vm.search = {};
        vm.myForm.$setPristine();
    }
});
