angular.module('app').controller('mvMainCtrl', function($scope, $location) {
   $scope.menu = ($location.path() == '/') ? 'home' : $location.path().substr(1);

});