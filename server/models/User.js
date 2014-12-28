var mongoose = require("mongoose"),
    encrypt = require("../utilities/encryption");

var userSchema = new mongoose.Schema({
    firstName: {type:String, required:'{path} is required!'},
    lastName: {type:String, required:'{path} is required'},
    middleName: {type:String},
    username: {type:String, required:'{path} is required!', unique:true},
    email: {type:String, required:'{path} is required!', unique:true},
    salt: {type:String, required:'{path} is required!'},
    hashed_pwd: {type:String, required:'{path} is required'},
    verified: {type:Boolean, default: false},
    verificationCode: {type:String},
    roles: [String],
    createdAt: {type:Date, default: Date.now},
    updatedAt: {type:Date}
});

userSchema.methods = {
    authenticate: function(passwordToMatch) {
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    hasRole: function(role) {
        return this.roles.indexOf(role) > -1;
    }
};

var User = mongoose.model('User', userSchema);

exports.createDefaultUsers = createDefaultUsers;

function createDefaultUsers() {
    User.find({}).exec(function(err, user) {
        if(user.length === 0) {
            var salt,hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'praisegod');
            User.create({firstName:'Praise-God', lastName:'Emerenini', middleName:'Chibuzor', username:'praisegeek', email:'praisegeek@gmail.com', salt: salt, hashed_pwd: hash, roles: ['user']});
        }
    });
}