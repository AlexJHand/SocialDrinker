myApp.service('UserService', function ($http, $location) {
  console.log('UserService Loaded');

  var self = this;

  self.userObject = {};
  self.beer = {};
  self.beers = {
    list: []
  };
  self.breweries = {
    list: []
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

  self.logout = function () {
    console.log('UserService -- logout');
    $http.get('/user/logout').then(function (response) {
      console.log('UserService -- logout -- logged out');
      $location.path("/home");
    });
  }
});