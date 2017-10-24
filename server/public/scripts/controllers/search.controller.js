myApp.controller('SearchController', function ($location, $log, UserService) {
    console.log('SearchController created');
    var vm = this;
    vm.UserService = UserService;
    vm.returnedBeers = {list: []};
    vm.returnedBreweries = {list: []};
    vm.returnedBreweryBeers = {list: []};
    vm.showBeerInput = true;
    vm.breweryId = '';
    vm.lastPage = '';
    vm.currentPage = 1;
    vm.numPerPage = 10;
    vm.filteredResults = [];
    vm.pageList = [];
    vm.totalPages = 0;

    vm.search = {
        inputBeer: '',
        inputBrewery: ''
    };
    // vm.message = '';

    vm.returnedBeers.list = UserService.beers;
    vm.returnedBreweries.list = UserService.breweries;
    vm.returnedBreweryBeers = UserService.breweryBeers;
    vm.totalItems = vm.returnedBreweryBeers.length;
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
        vm.UserService.lastPage = 'search';
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

    vm.breweryBeerDetail = function (beer) {
        console.log('In beerDetail');
        console.log('Beer clicked:', beer);
        $location.path('/beer');
        vm.UserService.lastPage = 'brewery';
        vm.UserService.beer = beer;
    }

    vm.goBack = function () {
        console.log('Going back');
        console.log('Going to:', vm.UserService.lastPage);
        $location.path(vm.UserService.lastPage);
    }

    vm.searchBeer = function () {
        console.log('In searchBeer()');
        console.log('vm.search.beer:', vm.search.inputBeer);
        UserService.getBeer(vm.search.inputBeer).then(function() {
            console.log('vm.returnedBeers: ', vm.returnedBeers);
            vm.pageResults(1, vm.returnedBeers);
            vm.search = {};
            vm.beerForm.$setPristine();    
        });
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
        vm.pageResults(1, vm.returnedBreweryBeers);
        })
    }

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

    // vm.pageResults = function (currentPage) {
    //     console.log('In pageResults()');
    //     var start = (currentPage - 1) * vm.numPerPage || 1;
    //     var end = start + vm.numPerPage;
    //     vm.filteredResults = vm.returnedBreweryBeers.list.slice(start, end);
    //     console.log('filteredResults:', vm.filteredResults);
    //     console.log('vm.returnedBreweryBeers.list.length', vm.returnedBreweryBeers.list.length);
    //     vm.totalPages = vm.returnedBreweryBeers.list.length / vm.numPerPage;
    //     console.log('vm.totalPages', vm.totalPages);
    //     vm.selectPage();
    // }

    vm.pageResults = function (currentPage, listToPaginate) {
        console.log('In pageResults()');
        console.log('listToPaginate:', listToPaginate.list);
        var start = (currentPage - 1) * vm.numPerPage || 1;
        var end = start + vm.numPerPage;
        vm.filteredResults = listToPaginate.list.slice(start, end);
        console.log('filteredResults:', vm.filteredResults);
        console.log('listToPaginate.list.length', listToPaginate.list.length);
        vm.totalPages = listToPaginate.list.length / vm.numPerPage;
        console.log('vm.totalPages', vm.totalPages);
        vm.selectPage();
    }

    vm.selectPage = function () {
        console.log('In selectPage()');
        for (var i = 1; i < vm.totalPages + 1; i++) {
            vm.pageList.push(i);
        }
        console.log('vm.pageList', vm.pageList);
    }

});
