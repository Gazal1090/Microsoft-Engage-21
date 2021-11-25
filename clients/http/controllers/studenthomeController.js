//const Hotel = require('../../../models/hotel')
//const Menu = require('../../../models/menu')
const Class = require('../../models/classs')
const Booking = require('../../models/booking')
const moment = require('moment')
const User = require('../../models/user')
const { modelName } = require('../../models/user')

function homeController(){
    return {
        //read
    async index(req,res) {

            const classes = await Class.find()
            return res.render('clients/student/studentHome', {classes: classes, moment:moment})
        },

        async index1(req,res) {
            const classes = await Class.find()
            return res.render('clients/proff/proffHome', {classes: classes, moment:moment})
        },
        
        async displayClass(req,res) {
            const className = req.params.className
            const classes = await Class.findOne({className: className})
            return res.render('clients/student/displayClass', {classes: classes})

        },

        async Class(req,res) {
            const className = req.params.className
            const classes = await Class.findOne({className: className})
            return res.render('clients/proff/displayClassProff', {classes: classes})

        },

        async displayClassProff(req,res) {
            const classes = await Class.find({createdBy: req.user._id})
            return res.render('clients/proff/myclass', {classes: classes, moment:moment})

        },

        async deleteClass(req,res) {
            const className = req.params.className
            const classes = await Class.findOneAndRemove({className: className}).exec()
            return res.redirect('/myClass')
        },

        async deleteSeat(req,res) {
            const className = req.params.className
            const seat = req.params.seat
            //console.log(className)
            const classs = await Class.findOne({className:className})
            console.log(seat)
            const nbooking = await Booking.findOne({className:className, createdBy: req.user._id})
            if( nbooking.mode == "offline"){
                classs.seats[seat-1] = '1'
                classs.save(function(err,classes){
                    if(err)
                        return console.error(err);
                    })
            }

            const booking = await Booking.findOneAndRemove({className:className, createdBy: req.user._id}).exec()
            return res.redirect('/mySeats')
        },

        async postdisplayClass(req, res, next){
            const seat = req.body.seat
            const className = req.params.className
            const mode = req.body.mode
            console.log(mode)
            const book = await Booking.findOne({className:className, createdBy: req.user._id})
            if(book)
                return res.redirect('/studentHome')

            if( mode ){
                console.log("1")
                const booking = new Booking({
                    className: className,
                    createdBy: req.user._id,
                    seat:"-1",
                    mode: "online"
                })
                console.log(booking)
                booking.save(function (err, results) {
                    return res.redirect('/studentHome')
                }).catch(err => {
                    console.log(err)
                    return res.redirect('/studentHome')
                })

            }
            const booking = new Booking({
                className: className,
                createdBy: req.user._id,
                seat:seat,
                mode: "offline"
            })
            const classs = await Class.findOne({className: className})
            classs.seats[seat-1] = '0'
            classs.save(function(err,classes){
                if(err)
                    return console.error(err);

                    })
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

         async booking(req,res) {
            const bookings = await Booking.find({ className: req.params.className },
             null,
             { sort:  {'seat':1} } )
            const users = new Array(bookings.length);
            for(var i = 0 ; i < bookings.length ; i++){
                users[i] = await User.findById(bookings[i].createdBy)
            }
         res.header('Cache-Control', 'no-store')
         res.render('clients/proff/booking', { bookings : bookings, moment : moment, users:users})
         },

    }
}

module.exports = homeController