var mongoose = require("mongoose");
    
//Todo: Import models
var userModel = require("../models/User");

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('Site database opened');
    });
    
    //Todo: Invoke Create default schema data
    userModel.createDefaultUsers();
};