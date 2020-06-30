const e = require("express")

module.exports = function(req,res,next) {
    if (!req.user) {
        req.flash('error','You must be logged in to view this page')
        req.redirect('/auth/login')
    } else {
        next();
    }
}