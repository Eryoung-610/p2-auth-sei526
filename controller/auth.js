// require express
const express = require('express')
// import router
const router = express.Router()
// import db
const db = require('../models');
// import middleware
const flash = require('flash')
// signup get route
// signup post route

router.get('/register', (req,res) => {
    res.render('auth/register');
})

// register post route
router.post('/register', (req,res) => {
    db.user.findOrCreate({
        where: {
            email: req.body.email
        }, defaults: {
            name: req.body.name,
            password: req.body.password
        }
    }).then ((user,created) => {
        if(created) {
            console.log("User created")
            res.redirect('/')
        } else {
            console.log("email already exists")
            req.flash('error','Error: email already exists for user. Try again');
            res.redirect('auth/register');
        }
    }).catch(err => {
        console.log(`Error found. \nMessage: ${err.message}. \nPlease review - ${err}`)
        req.flash('error', err.message)
        res.redirect('/auth/register')
    })
})

// login get route
router.get('/login', (req,res) => {
    res.render('auth/login')
})



// export router
module.exports = router;