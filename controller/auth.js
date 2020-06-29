// require express
const express = require('express')
// import router
const router = express.Router()
// import db
const db = require('../models');
// import middleware

// signup get route
// signup post route

router.get('/register', (req,res) => {
    res.render('auth/register');
})

// register post route

// login get route
router.get('/login', (req,res) => {
    res.render('auth/login')
})