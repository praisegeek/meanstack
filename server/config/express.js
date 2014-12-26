var express = require("express"),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),
    session = require("express-session"),
    morgan = require("morgan"),
    methodOverride = require("method-override"),
    stylus = require("stylus"),
    passport = require("passport");
    
module.exports = function(app, config) {
    function compile(str, path) {
        return stylus(str).set('filename', path);
    }
    
    app.configure(function() {
        app.set('views', config.rootPath + '/server/views');
        app.set('view engine', 'jade');
        app.use(stylus.middleware({
            src: config.rootPath + '/public',
            compile: compile
        }));
        app.use(express.static(config.rootPath + '/public'));
        app.use(morgan('dev'));
        app.use(cookieParser());
        app.use(bodyParser.urlencoded({ extend: false }));
        app.use(bodyParser.json());
        app.use(methodOverride());
        app.use(session({
            secret: 'Classified project lunch',
            resave: false,
            saveUninitialized: true
        }));
    })
}