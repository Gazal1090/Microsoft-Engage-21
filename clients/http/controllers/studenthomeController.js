//const Hotel = require('../../../models/hotel')
//const Menu = require('../../../models/menu')
const Class = require('../../models/classs')
const Booking = require('../../models/booking')
const moment = require('moment')

function homeController(){
    return {
        //read
        async index(req,res) {

            //const hotels = await Hotel.find()
            const classes = await Class.find()
            //return res.render('customers/u_home', {hotels: hotels})
            console.log(classes)
            return res.render('clients/student/studentHome', {classes: classes, moment:moment})
        },

        async index1(req,res) {

            //const hotels = await Hotel.find()
            const classes = await Class.find()
            //return res.render('customers/u_home', {hotels: hotels})
            console.log(classes)
            return res.render('clients/proff/proffHome', {classes: classes})
        },
        
        async displayClass(req,res) {
            const className = req.params.className
            const classes = await Class.findOne({className: className})
            return res.render('clients/student/displayClass', {classes: classes})
            //res.render('hotel/menu')
        },

        async displayClassProff(req,res) {
            const classes = await Class.find({createdBy: req.user._id})
            return res.render('clients/student/displayClassProff', {classes: classes})
            //res.render('hotel/menu')
        },

        async deleteClass(req,res) {
            const className = req.params.className
            const classes = await Class.findOneRemove({className: className})
            return res.redirect('/ProffHome')
            //res.render('hotel/menu')
        },

        async postdisplayClass(req, res, next){
            const seat = req.body.seat
            const className = req.params.className

            
            var book = Booking.find({createdBy: req.user._id, className: className})

            if( book){
                req.flash("Already booked a seat in this class")
                return res.redirect('/studentHome')
            }

            const booking = new Booking({
                className: className,
                createdBy: req.user._id,
                seat:seat,
            })
            console.log(booking)
            booking.save(function (err, results) {
                return res.redirect('/studentHome')
            }).catch(err => {
                console.log(err)
                return res.redirect('/studentHome')
            })
        },

        async mySeats(req,res) {
            const bookings = await Booking.find({ createdBy: req.user._id },
             null,
             { sort: { 'createdAt': -1 } } )
         res.header('Cache-Control', 'no-store')
         res.render('clients/student/mySeats', { bookings : bookings, moment : moment})
         },

    }
}

module.exports = homeController