myApp.controller('UserController', function(UserService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.returnedUserBeers = {list: []};
  vm.returnedUserBeers = UserService.userBeers.list

  vm.displayUserBeers = function () {
    console.log('In displayUserBeers()');
    UserService.displayUserBeers();
    console.log('vm.returnedUserBeers:', vm.returnedUserBeers);
  }
});
