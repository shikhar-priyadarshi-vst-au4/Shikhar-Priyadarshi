const router=require('express').Router();
const passport=require('passport');
const controller=require('./../controllers/tablebooking/controller');
router.get('/', controller.homepage);
router.get('/about',controller.aboutus);
router.get('/menu',controller.menupage);
router.get('/feedback',controller.feedback);
router.get('/booking/details',isLoggedIn,controller.retrieve);//RETRIEVING BOOKING PAGE.
router.get('/ADMIN_ACCESS',controller.retrieveAdminPage);//LOGIN AND SIGNUP 
router.get('/Admin_dashboard',controller.admin,controller.retrieveDashboard);//retrieve dashboard.
router.get('/unauthorised',controller.anuthorisedaccess);
router.get('/add-to-cart/:id',isLoggedIn,controller.addcart);
router.get('/shopping-cart',isLoggedIn,controller.shoppingcart);
router.post('/checkuserbooking',controller.checkuserbooking);
router.post('/table/indices',controller.switchindices);
router.post('/create/order',controller.admincreateorder);
router.post('/tablematrix/update',controller.tableMatrix);
//router.use(controller.admin);
router.post('/feedback/report/database',controller.feedbackupdate);
router.post('/admin_bookingticket',controller.adminbookingticket);
router.post('/create/booking',controller.createbooking);//REQUEST FOR MAKING A BOOKING. 
router.post('/admin/signout',controller.adminsignout);
router.get('/logout',(req,res)=>{
    res.redirect('/');
})
router.get('/LOGIN_ACCESS',(req,res)=>{
    var signup_messages=req.flash('signuperror');
    var signin_messages=req.flash('signinerror');
    console.log(signup_messages,signin_messages);
    res.render('Login',{
        CSSlink:'./../../public/stylesheet/Login.css',
            signin_messages:signin_messages,
            error:(signin_messages.length>0),
            signup_messages:signup_messages,
            flag:(signup_messages.length>0)
    })});
router.post('/signup',passport.authenticate('local.signup',{
    successRedirect:'/LOGIN_ACCESS',
    failureRedirect:'/LOGIN_ACCESS',
    failureFlash:true
}));
router.post('/login',passport.authenticate('local.signin',{
    successRedirect:'/',
    failureRedirect:'/LOGIN_ACCESS',
    failureFlash:true
}));
router.post('/admin',controller.adminlogin);
router.post('/logout',function(req,res,next){
    req.logout();
    req.session.destroy();
    res.redirect('/');
});
//router.use(controller.authentication);
function isLoggedIn(req,res,next){
    console.log("hello=",req.body);
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect('/unauthorised');
    }
}
module.exports=router;