const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const db = require ('../models')

passport.sequelizeUser((user,cb) => {
    callback(null, user.id);
})

passport.deserializeUser((id,cb) => {
    db.user.findByPk(id).then((user) => {
        callback(null,user)
    }).catch(callback)
})

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (email,password, callback) {
    db.user.findOne({ where: {email}}).then(function(user) {
        if(!user || !user.validPassword(password)) {
            callback(null,false);
        } else {
            callback(null,user);
        }
    }).catch(callback)
}));

module.exports = passport;