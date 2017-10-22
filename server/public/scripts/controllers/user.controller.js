myApp.controller('UserController', function(UserService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.returnedUserBeers = {list: []};
  vm.returnedUserBeers.list = UserService.userBeers

  vm.displayUserBeers = function () {
    console.log('In displayUserBeers()');
    UserService.getUserBeers();
    console.log('vm.returnedUserBeers:', vm.returnedUserBeers);
  }
});
