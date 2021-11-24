const express = require('express')
const app = express()
const PORT = process.env.PORT || 3030
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const mongoose = require('mongoose')
const passport = require('passport')
const flash = require('express-flash')
const session = require("express-session");
var bodyParser = require('body-parser');
require('dotenv').config()

const DB = 'mongodb+srv://gazal11:gazalarora@cluster0.bkikm.mongodb.net/collegedata?retryWrites=true&w=majority';


mongoose.connect(DB).then(() => {
    console.log('Conected to mongoDB') 
}).catch((err) => console.log(err));


//Session config
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    //store: mongoStore,
    saveUninitialized: false,
    //cookie: {maxAge: 1000 * 60 * 60 * 24}
 }))

 app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

const passportInit = require('./passport')
passportInit(passport)
app.use(passport.initialize());
app.use(passport.session());

//Assets 
app.use(express.static('clients'))
app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(flash())

app.listen( PORT , () => {
    console.log(`Listening on port ${PORT}`)
})

 
app.use(express.urlencoded({ extended: true} ));
require('./clients/routes/web')(app)

//app.use(userRoutes)
//app.use(taskRoute)
// global middlewares


//set Template engine

app.use(expressLayout)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/'))
