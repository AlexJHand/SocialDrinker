myApp.controller('UserController', function ($location, UserService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.returnedUserBeers = {
    list: []
  };
  vm.returnedUserBeers.list = UserService.userBeers

  vm.deleteUserBeer = (function () {
    console.log('In deleteUserBeer()');
 swal({
      title: 'Are you sure?',
      text: "You won't be able to undo this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
 }).then(function () {
      swal(
        'Removed',
        'This beer has been removed from your list.',
        'success'
      );
      UserService.deleteUserBeer();
      $location.path('/user');
      });
  })

  vm.displayUserBeers = function () {
    console.log('In displayUserBeers()');
    UserService.getUserBeers();
    console.log('vm.returnedUserBeers:', vm.returnedUserBeers);
  }

  vm.userBeerDetail = function(beer) {
    console.log('In userBeerDetail');
    console.log('Beer clicked:', beer);
    $location.path('/userBeer');
    vm.userService.userBeer = beer;
    console.log('vm.userService.userBeer:', vm.userService.userBeer);
  }
});