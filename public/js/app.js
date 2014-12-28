angular.module('app', ['ngResource', 'ngRoute', 'ngSanitize']);

angular.module('app').config(function($routeProvider, $locationProvider) {
    var routeRoleChecks = {
        admin: {
            auth: function(mvAuth) {
                return mvAuth.authorizeCurrentUserForRoute('admin');
            }
        },
        subscriber: {
            auth: function(mvAuth) {
                return mvAuth.authorizeCurrentUserForRoute('subscriber');
            }
        },
        user: {
            auth: function(mvAuth) {
                return mvAuth.authorizeAuthenticatedUserForRoute();
            }
        }
    };
    
    
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {templateUrl: '/partials/main/home' })
        .when('/about', {templateUrl: '/partials/main/about' })
        .when('/users', {templateUrl: '/partials/main/users', controller: 'mvUsersCtrl' });
});

angular.module('app').service('popupService', function($window) {
    this.showPopup = function(message) {
        return $window.confirm(message);
    };
});

angular.module('app').filter('unsafe', function($sce) {
    return $sce.trustAsHtml;
});

angular.module('app').run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
        if(rejection === 'not authorized') {
            $location.path('/');
        }
    });
    
    $rootScope.$on('$locationChangeStart', function(evt, next, current) {
        $rootScope.menu = ($location.path() == '/') ? 'home' : $location.path().substr(1);
    });
});