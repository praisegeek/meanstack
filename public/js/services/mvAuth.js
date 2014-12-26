angular.module('app').factory('mvAuth', function($http, mvIdentity, $q, mvUser) {
    return {
        authenticateUser: function(user) {
            var dfd = $q.defer();
            $http.post('/login', { username: user.username, password: user.password}).then(function(response) {
                if(response.data.success) {
                    var user = new mvUser();
                    angular.extend(user, response.data.user);
                    mvIdentity.currentUser = user;
                    
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },
        
        logoutUser: function() {
            var dfd = $q.defer();
            $http.post('/logout', { logout: true}).then(function() {
                mvIdentity.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        },
        
        createUser: function(user) {
            var newUser = new mvUser(user);
            var dfd = $q.defer();
            
            newUser.$save().then(function(newUser) {
                mvIdentity.currentUser = newUser;
                dfd.resolve(newUser);
            }, function(response) {
                dfd.reject(response.data.message);
            });
            return dfd.promise;
        },
        
        authorizeCurrentUserForRoute: function(role) {
            if(mvIdentity.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        },
            
        authorizeAuthenticatedUserForRoute: function() {
            if(mvIdentity.isAuthorized()) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        }
        
    };
});