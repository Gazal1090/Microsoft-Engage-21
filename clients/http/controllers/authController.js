const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')

function authController(){
    return {
        login(req,res) {
            res.render('clients/auth/login')
        },

        async postLogin(req, res, next) {
            passport.authenticate('local', (err, user, info) => {
                if(err){
                    req.flash('error', info.message)
                    return next(err)
                }
                
                if(!user){
                    return res.render('clients/auth/login', {message: req.flash(info.message)})
                }
                req.logIn(user, (err) => {
                    console.log(user)
                    if(err){
                        req.flash('error', info.message)
                        return next(err)
                    }
                    if(user.role=="student"){
                        console.log(user)
                        return res.redirect('/studentHome')}
                    else if(user.role == "proff")
                        return res.redirect('/proffHome')
                    return res.redirect('/studentHome')

                })
            })(req, res, next)

        },

        registerProff(req,res){
            res.render('clients/auth/registerProff')
        },

        async postRegisterProff(req,res){
            const {name, email, password} = req.body

            if(!name || !email || !password ){
                return res.redirect('/registerStudent')
            }
            //Check if email exists  // not working
            User.exists({ email: email }, (err, result) => {
                if(result){
                    console.log('Email already taken! If already registered, please login!');
                    req.flash('error','Email already taken! If already registered, please login!');
                    return res.redirect('/registerStudent')
                }
            })

            //Hash password
            const hashedPassword = await bcrypt.hash(password, 10)
            //Create user in database
            const user = new User({
                name: name,
                email: email,
                role: 'proff',
                password: hashedPassword
            })
            cosole.log(user)
            user.save().then((user) => {
                // Login 
                return res.redirect('/proffHome')
            }).catch(err => {
                console.log(err)
                return res.redirect('/registerStudent')
            })
            console.log(req.body)
        },

        registerStudent(req,res){
            res.render('clients/auth/registerStudent')
        },

        async postRegisterStudent(req,res){
            const {name, email, password} = req.body
            const role = req.params.role
            console.log(role)
            if(!name || !email || !password ){
                return res.redirect('/registerStudent')
            }
            //Check if email exists  // not working
            User.exists({ email: email }, (err, result) => {
                if(result){
                    console.log('Email already taken! If already registered, please login!');
                    req.flash('error','Email already taken! If already registered, please login!');
                    return res.redirect('/registerStudent')
                }
            })

            //Hash password
            const hashedPassword = await bcrypt.hash(password, 10)
            //Create user in database
            const user = new User({
                name: name,
                email: email,
                role: role,
                password: hashedPassword
            })
            user.save().then((user) => {
                // Login 
                return res.redirect('/studentHome')
            }).catch(err => {
              //  console.log(err)
                return res.redirect('/registerStudent')
            })
            console.log(req.body)
        },

        async changePassword(req,res1){
            let session = req.session;
            if(req.user.email){
                var old_password = req.body.oPassword;
                var new_password = req.body.nPassword;
                var con_password = req.body.cPassword;

                if( req.user != null){
                    var hash = req.user.password;
                    bcrypt.compare(old_password, hash, function(err,res){
                        if( res){
                                //Password matches
                            if(new_password == con_password ){
                                bcrypt.hash(new_password,10,function(err,hash){
                                req.user.password = hash;
                                req.user.save(function(err,user){
                                    if(err)
                                        return console.error(err);
                                    res1.redirect("/changePassword");
                                    console.log("Yippie! your password has been changed. :)");
                                        })
                                    })
                                }
                            }
                            else{
                                console.log("Password does not match")
                                return req1.redirect('/changePassword');
                            }
                        })
                    }
            }
        },

        async renderchangePassword(req,res){
            let session = req.session;
            //res.redirect('/changePassword');
           if(req.user){
                return res.render('clients/partials/changePassword');
           }
          else{
                console.log("error")
            }
          //  console.log(req.user)
        },
        logout(req,res){
            req.logout()
            return res.redirect('/')
        }

    }
}

module.exports = authController
