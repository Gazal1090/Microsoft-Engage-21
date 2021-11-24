const Class = require('../../models/classs')
function classController(){
    return {
        //read
        
        addClass(req,res){
            res.render('clients/proff/addClass')
        },

        async postAddClass(req,res){
            const {className, startsAt, endsAt} = req.body
            console.log(className,startsAt, endsAt)
            //Check if email exists
            Class.exists({ className: className }, (err, result) => {
                if(result){
                    //console.log('Email already taken! If already registered, please login!');
                    req.flash('error','Class already exists!');
                    return res.redirect('/addClass')
                }
            })
            const classs = new Class([{
                className: className,
                createdBy: req.user._id,
                seats:['1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1'],
                startsAt: startsAt,
                endsAt: endsAt
            }])

            console.log(classs)
            classs.save().then((classs) => {
                // Login 
                return res.redirect('/proffHome')
            }).catch(err => {
                console.log(err)
                return res.redirect('/addClass')
            })
            //console.log(req.body)
        },

    }
}

module.exports = classController
