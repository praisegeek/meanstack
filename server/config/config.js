var path = require("path");
var root = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        db: 'mongod://localhost/test',
        rootPath: root,
        port: process.env.PORT || 3030
    },
    production: {
        db: 'mongod://<user>:<pass>@ds123.mongolabs.com:5317/test',
        rootPath: root,
        port: process.env.PORT || 80
    }
    
};