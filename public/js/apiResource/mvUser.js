angular.module('app').factory('mvUser', function($resource) {
    var userResource = $resource('/api/users/:id', {id: "@id"}, {
        update: {
            method: 'PUT'
        }
    }, {
        stripTrailingSlashes: false
    });
    
    userResource.prototype.isVerified = function() {
        return this.verified > -1;
    };
    
    return userResource;
});