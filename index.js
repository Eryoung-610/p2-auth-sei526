// Configure dotenv
require('dotenv').config()
// Require express and setup and express app instance
const Express = require('express')
// Require and set view engine use ejs
const ejsLayouts = require('express-ejs-layouts');
// Set app to use false urlencoding
// Set app public directory for use
// Set app ejsLayouts for render

const app = Express();
app.use(Express.urlencoded({ extended: false }));
app.use(Express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(ejsLayouts);

// ROUTES
app.get('/', (req,res) => {
    // Check to see if user logged in
    res.render('index')
})

// Initialize App on Port
app.listen(process.env.PORT || 3000, (port) => {
    console.log(`Working on ${port}`)
});