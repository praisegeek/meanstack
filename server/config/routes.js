var auth = require('./auth'),
    users = require('../controllers/users');
    

module.exports = function(app, config) {
    //Todo: Your API & local routes
    app.get('/api/users', users.seedUsers);
    app.post('/api/users', users.createUser);
    
    app.post('/login', auth.authenticate);
    app.post('/logout', function(req, res) {
        req.logout();
        req.end();
    });
    
    app.get('/partials/*', function(req, res) {
        res.render(config.rootPath + '/public/app/' + req.params[0]);
    });
    app.all('/api/*', function(req, res) {
        res.sendStatus(404);
    });
    app.get('*', function(req, res) {
        var user = {};
        if (req.user) {
            user.firstName = req.user.firstName;
            user.lastName = req.user.lastName;
            user.middleName = req.user.middleName;
            user.email = req.user.email;
            user._id = req.user._id;
            user.roles = req.user.roles;
        }
        res.render('index', {
            bootStrappedUser: user
        });
    });
};