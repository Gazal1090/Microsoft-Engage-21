//const Hotel = require('../../../models/hotel')
//const Menu = require('../../../models/menu')
const Class = require('../../models/classs')
const Booking = require('../../models/booking')
const moment = require('moment')
const User = require('../../models/user')
const { modelName } = require('../../models/user')
const Enroll = require('../../models/enrollment')
const reqq = "https://smtpjs.com/v3/smtp.js"
const Post = require('../../models/post')

function sendEmail(email, course, status) {
    Email.send({
      Host: "smtp.gmail.com",
      Username: "msclassrooms@gmail.com",
      Password: "gazal1199@",
      To: "2018csb1090@iitrpr.ac.in",
      From: "msclassrooms@gmail.com",
      Subject: "Course Enrollment ",
      Body: `Your request to enroll in ${course} has been  ${status} ` ,
    })
      .then(function (message) {
      alert("mail sent successfully")
      });
    }

function homeController(){
    return {
        //read
    async index(req,res) {

            const classes = await Class.find()
            var status = new Array(classes.length)

            for(var i = 0 ; i < classes.length ; i++){
                status[i] = '0';
                const enroll = await Enroll.findOne( { className: classes[i].className, createdBy : req.user._id})

                if( enroll ){
                    if( enroll.status == '0')
                        status[i] = '0'
                    else if( enroll.status == '1')
                        status[i] = '1'
                    else
                        status[i] = '2'
                }
            }
            
            return res.render('clients/student/studentHome', {classes: classes, moment:moment, status:status})
        },

        async index1(req,res) {
            const classes = await Class.find()
            var status = new Array(classes.length)

            for(var i = 0 ; i < classes.length ; i++){
                status[i] = "0";

                const enroll = await Enroll.findOne( { className: classes[i].className, createdBy : req.user._id})

                if( enroll ){
                    if( enroll.status == '0')
                        status[i] = '0'
                    else if( enroll.status == '1')
                        status[i] = '1'
                    else
                        status[i] = '2'
                }
                if( classes[i].createdBy.equals(req.user._id))
                    status[i] = "2";                

                console.log(status[i])
            }
            return res.render('clients/proff/proffHome', {classes: classes, moment:moment, status:status})
        },
        
        async displayClass(req,res) {
            const className = req.params.className
            const booking = await Booking.findOne({className: className,createdBy: req.user._id})
            seat = "0"

            if(booking){
                if( booking.mode == "online")
                    seat = "-1"
                else
                    seat = booking.seat
            }
            const classes = await Class.findOne({className: className})
            return res.render('clients/student/displayClass', {classes: classes, seat: seat})

        },

        async classPage(req,res) {
            const className = req.params.className
            const classes = await Class.findOne({className: className})
            const posts = await Post.find({ className: className},
                null,
                { sort: { 'createdAt': -1 } } )
                const users = new Array(posts.length);
                for(var i = 0 ; i < posts.length ; i++){
                    users[i] = await User.findById(posts[i].createdBy)
                }
            return res.render('clients/student/classPage', {posts:posts, classes: classes, users:users})
        },

        async classPageProff(req,res) {
            const className = req.params.className
            const classes = await Class.findOne({className: className})
            const posts = await Post.find({ className: className},
                null,
                { sort: { 'createdAt': -1 } } )
                const users = new Array(posts.length);
                for(var i = 0 ; i < posts.length ; i++){
                    users[i] = await User.findById(posts[i].createdBy)
                }
            return res.render('clients/proff/classPage', {posts:posts, classes: classes, users:users})
        },

        async enroll(req,res) {
            const className = req.params.className

            const enroll = new Enroll({

                className: className,
                createdBy: req.user._id,
                status: '1',
            })
            enroll.save().then((enroll) => {
            }).catch(err => {
              //  console.log(err)
                return res.redirect('/studentHome')
            })
            return res.redirect('/studentHome')
        },

        async enrollProff(req,res) {
            const className = req.params.className

            const enroll = new Enroll({

                className: className,
                createdBy: req.user._id,
                status: '1',
            })
            enroll.save().then((enroll) => {
            }).catch(err => {
              //  console.log(err)
                return res.redirect('/proffHome')
            })
            return res.redirect('/proffHome')
        },

        async Class(req,res) {
            const className = req.params.className
            const classes = await Class.findOne({className: className})
            const posts = await Post.find({ className: className},
                null,
                { sort: { 'createdAt': -1 } } )
                const users = new Array(posts.length);
                for(var i = 0 ; i < posts.length ; i++){
                    users[i] = await User.findById(posts[i].createdBy)
                }
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

         async enrollment(req,res) {
            const enrollments = await Enroll.find({ className: req.params.className },
             null,
             { sort:  {'createdAt': 1} } )

            const users = new Array(enrollments.length);

            for(var i = 0 ; i < enrollments.length ; i++){
                users[i] = await User.findById(enrollments[i].createdBy)
            }
            res.header('Cache-Control', 'no-store')
            res.render('clients/proff/enrollments', { enrollments : enrollments, moment : moment, users:users})
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

         async accept( req, res){
             const className = req.params.className
             const user = req.params.createdBy
             const userr = User.findById(user)
             //sendEmail( userr.email, className, "accepted")
             const enrollment = await Enroll.findOne({className: className}, {createdBy : user})
             enrollment.status = '2'
             enrollment.save(function (err, results) {
                return  res.redirect('/enrollment/<%= className %>')
            }).catch(err => {
                console.log(err)
                return  res.redirect('/enrollment/<%= className %>')
            })
         },    

         async decline( req, res){
             console.log("hi")
            const className = req.params.className
            const user = req.params.createdBy
            const enrollment = await Enroll.findOneAndRemove({className: className}, {createdBy : user}).exec()
            return  res.redirect('/enrollment/<%= className %>')
        },    

        async members( req, res){

            const enrollments = await Enroll.find({ className: req.params.className },null, { sort:  {'createdAt': 1} } )
   
               const users = new Array(enrollments.length);
   
               for(var i = 0 ; i < enrollments.length ; i++){
                   users[i] = await User.findById(enrollments[i].createdBy)
               }
               res.header('Cache-Control', 'no-store')
               res.render('clients/proff/members', { enrollments : enrollments, moment : moment, users:users})
        },

        async peers( req, res){

            const enrollments = await Enroll.find({ className: req.params.className },null, { sort:  {'createdAt': 1} } )
   
               const users = new Array(enrollments.length);
   
               for(var i = 0 ; i < enrollments.length ; i++){
                   users[i] = await User.findById(enrollments[i].createdBy)
               }
               res.header('Cache-Control', 'no-store')
               res.render('clients/student/members', { enrollments : enrollments, moment : moment, users:users})
        },

        post(req,res) {
            const className = req.params.className
            res.render('clients/student/addPost', {className, className})
        },

        async postPost(req, res){
            
            const className = req.params.className;
            const title = req.body.title;
            const body = req.body.body;
            const classes = await Class.findOne({className: className})

            const post = new Post({
                className: className,
                createdBy: req.user._id,
                title: title,
                body: body
            })

            const posts = await Post.find({ className: className},
                null,
                { sort: { 'createdAt': -1 } } )
                const users = new Array(posts.length);
                for(var i = 0 ; i < posts.length ; i++){
                    users[i] = await User.findById(posts[i].createdBy)
                }

            post.save(function (err, results) {
                return res.render('clients/student/classPage', {posts:posts, classes: classes, users:users})
            }).catch(err => {
                console.log(err)
                return res.redirect('/addPost' ,{classes: classes})
            })
        },

        postProff(req,res) {
            const className = req.params.className
            res.render('clients/proff/addPost', {className, className})
        },

        async postPostProff(req, res){
            
            const className = req.params.className;
            const title = req.body.title;
            const body = req.body.body;
            const classes = await Class.findOne({className: className})

            const post = new Post({
                className: className,
                createdBy: req.user._id,
                title: title,
                body: body
            })

            const posts = await Post.find({ className: className},
                null,
                { sort: { 'createdAt': -1 } } )
                const users = new Array(posts.length);
                for(var i = 0 ; i < posts.length ; i++){
                    users[i] = await User.findById(posts[i].createdBy)
                }


            post.save(function (err, results) {
                return res.render('clients/proff/classPage', {posts:posts, classes: classes, users:users})
            }).catch(err => {
                console.log(err)
                return res.redirect('/addPostProff' ,{classes: classes})
            })
        },

        async leave( req, res){
            console.log("hi")
           const className = req.params.className
           const user = req.params.createdBy
           const enrollment = await Enroll.findOneAndRemove({className: className}, {createdBy : user}).exec()
           return  res.redirect('/studentHome')
       }, 

       async myPost(req,res) {
        const className = req.params.className
        
        const classes = await Class.findOne({className: className})
        const user = await User.findById(req.user._id)
        const posts = await Post.find({ className: className, createdby: req.user._id},
            null,
            { sort: { 'createdAt': -1 } } )
        return res.render('clients/student/myPost', {posts:posts, classes: classes, username: user.name})
    },

      async myPostProff(req,res) {
        const className = req.params.className
        
        const classes = await Class.findOne({className: className})
        const user = await User.findById(req.user._id)
        const posts = await Post.find({ className: className,createdby: req.user._id},
            null,
            { sort: { 'createdAt': -1 } } )
        return res.render('clients/proff/myPost', {posts:posts, classes: classes, username: user.name})
    },


    }
}

module.exports = homeController