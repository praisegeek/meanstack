angular.module('app').controller('mvUsersCtrl', function($scope, mvUser) {
    $scope.users = mvUser.query();
});