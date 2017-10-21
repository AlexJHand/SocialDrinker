myApp.service('UserService', function ($http, $location) {
  console.log('UserService Loaded');

  var self = this;

  self.userObject = {};
  self.ratingObject = {};
  self.beer = {};
  self.brewery = {};
  self.beers = {
    list: []
  };
  self.breweries = {
    list: []
  }
  self.breweryBeers = {
    list: []
  }
  self.userBeers = {
    list: []
  }

  self.addBeer = function () {
    console.log('In UserService.addBeer()');
    $http({
      method: 'POST',
      url: '/list',
      data: [self.beer, self.userObject.userName, self.ratingObject]
    }).then(function (response) {
      console.log('Response:', response);
    })
  }

  self.getBeer = function (beerIn) {
    $http({
      method: 'GET',
      url: '/beer/' + beerIn
    }).then(function (response) {
      console.log('Received', response);
      self.beers.list = response.data.data;
      console.log(self.beers.list);
    });
  }

  self.getBrewery = function (breweryIn) {
    $http({
      method: 'GET',
      url: '/brewery/' + breweryIn
    }).then(function (response) {
      console.log('Received', response);
      self.breweries.list = response.data.data;
      console.log(self.breweries.list);
    });
  }

  self.getBreweryBeers = function (breweryIn) {
    console.log('breweryIn:', breweryIn);
    return $http({
      method: 'GET',
      url: '/brewery/' + breweryIn + '/beers'
    }).then(function (response) {
      console.log('Received', response);
      self.breweryBeers.list = response.data.data;
      console.log('response.data.data', response.data.data);
      console.log(self.breweryBeers.list);
    });
  }

  self.getuser = function () {
    console.log('UserService -- getuser');
    $http.get('/user').then(function (response) {
      if (response.data.username) {
        // user has a curret session on the server
        self.userObject.userName = response.data.username;
        console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
      } else {
        console.log('UserService -- getuser -- failure');
        // user has no session, bounce them back to the login page
        $location.path("/home");
      }
    });
  }

  self.getUserBeers = function () {
    console.log('In getUserBeers');
    $http({
      method: 'GET',
      url: '/list'
    }).then(function (response) {
      console.log('Received:', response);
      self.userBeers.list = response.data.data;
      console.log('self.userBeers.list', self.userBeers.list);
    })
  }

  self.logout = function () {
    console.log('UserService -- logout');
    $http.get('/user/logout').then(function (response) {
      console.log('UserService -- logout -- logged out');
      $location.path("/home");
    });
  }
});