myApp.controller('UserController', function ($location, UserService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.returnedUserBeers = {
    list: []
  };
  vm.returnedUserBeers.list = UserService.userBeers

  vm.lastPage = '';
  vm.thisPage = 1;
  vm.currentPage = 1;
  vm.numPerPage = 10;
  vm.filteredResults = [];
  vm.pageList = [];
  vm.totalPages = 0;
  vm.totalBeers = 0;


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
    UserService.getUserBeers().then(function () {
      console.log('vm.returnedUserBeers:', vm.returnedUserBeers);
      vm.pageResults(1, vm.returnedUserBeers.list);
    });;

  }

  vm.userBeerDetail = function (beer) {
    console.log('In userBeerDetail');
    console.log('Beer clicked:', beer);
    $location.path('/userBeer');
    vm.userService.userBeer = beer;
    console.log('vm.userService.userBeer:', vm.userService.userBeer);
  }

  vm.moveOnePage = function (direction, listToPaginate) {
    console.log('In moveOnePage');
    console.log('direction', direction);
    console.log('listToPaginate:', listToPaginate.list);
    if (direction === 'previous') {
      if (vm.thisPage === 1) {
        vm.pageResults(vm.thisPage, listToPaginate);
      } else {
        vm.thisPage--;
        vm.pageResults(vm.thisPage, listToPaginate);
      }
    } else if (direction === 'next') {
      if (vm.thisPage === vm.totalPages) {
        vm.pageResults(vm.thisPage, listToPaginate);
      } else {
        vm.thisPage++;
        vm.pageResults(vm.thisPage, listToPaginate);
      }
    }
  }

  vm.pageResults = function (currentPage, listToPaginate) {
    console.log('In pageResults()');
    console.log('listToPaginate:', listToPaginate.list);
    vm.thisPage = currentPage;
    vm.totalBeers = listToPaginate.list.length;
    console.log('total beer:', vm.totalBeers);
    var start = (currentPage - 1) * vm.numPerPage;
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