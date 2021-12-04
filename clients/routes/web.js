const authController = require('../http/controllers/authController.js')
const studentHomeController = require('../http/controllers/studentHomeController.js')
const classController = require('../http/controllers/classController.js')
function initRoutes(app){

    app.get('/', (req,res) => {
        res.render('home')
    })
    app.get('/home', (req,res) => {
        res.render('home')
    })
    app.get('/display', (req,res) => {
        res.render('clients/student/display')
    })
    app.get('/mySeats', studentHomeController().mySeats)
     

    app.post('/changePassword', authController().changePassword);
    app.get('/changePassword', authController().renderchangePassword);
    app.post('/changePasswordProff', authController().changePasswordProff);
    app.get('/changePasswordProff', authController().renderchangePasswordProff);
    
    app.get('/login', authController().login)   
    app.post('/login', authController().postLogin)
    app.get('/registerStudent', authController().registerStudent)
    app.post('/registerStudent', authController().postRegisterStudent)
    //app.get('/registerProff', authController().registerProff)
    app.get('/display_class/:className', studentHomeController().displayClass)
    app.get('/classPage/:className', studentHomeController().classPage)
    app.get('/enroll/:className', studentHomeController().enroll)
    app.get('/enrollProff/:className', studentHomeController().enrollProff)
    app.get('/studentHome', studentHomeController().index)
    app.get('/proffHome', studentHomeController().index1)
    app.get('/myClass', studentHomeController().displayClassProff)
    app.get('/displayClass/:className', studentHomeController().displayClass)
    app.get('/classPageProff/:className', studentHomeController().classPageProff)
    app.get('/classes/:className', studentHomeController().Class)
    app.get('/addClass', classController().addClass)
    app.post('/addClass', classController().postAddClass)
    app.get('/logout',authController().logout)
    app.post('/displayClass/postdisplayClass/:className', studentHomeController().postdisplayClass)   
    app.get('/deleteClass/:className', studentHomeController().deleteClass)
    app.get('/deleteSeat/:className/:seat', studentHomeController().deleteSeat)
    app.get('/classes/booking/:className', studentHomeController().booking)
    app.get('/enrollment/:className', studentHomeController().enrollment)
    app.get('/members/:className', studentHomeController().members)
    app.get('/peers/:className', studentHomeController().peers)
    app.get('/accept/:className/:createdBy', studentHomeController().accept)
    app.get('/decline/:className/:createdBy', studentHomeController().decline)
    app.get('/addPost/:className', studentHomeController().post)
    app.get('/addPostProff/:className', studentHomeController().postProff)
    app.post('/addPost/:className', studentHomeController().postPost)
    app.post('/addPostProff/:className', studentHomeController().postPostProff)
    app.get('/leave/:className', studentHomeController().leave)
    app.get('/myPost/:className', studentHomeController().myPost)
    app.get('/myPostProff/:className', studentHomeController().myPost)
}

module.exports=initRoutes