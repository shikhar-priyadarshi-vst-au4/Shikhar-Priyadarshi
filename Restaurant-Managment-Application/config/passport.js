var passport=require('passport');
var User=require('./../models/User');
var LocalStrategy=require('passport-local').Strategy;
passport.serializeUser(function(user,done){
    done(null,user.id);
})
passport.deserializeUser(function(id,done){
    User.findById(id,function(error,user){
      done(error,user);
    })
})
passport.use('local.signup',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},function(req,email,password,done){
    req.checkBody('email','Invalid email').notEmpty().isEmail();
    req.checkBody('password','Invalid password').notEmpty().isLength({min:8});
    var errors=req.validationErrors();
    if(errors){
        var messages=[];
        errors.forEach(function(error){
            messages.push(error.msg);
        })
        console.log(errors,messages);
        return done(null,false,req.flash('signuperror',messages));
    }
    
    console.log("Passport"+req.body);
     console.log(email,password);
     User.findOne({
     'email':email},function(error,user){
     if(error){
         console.log("error",error);
         return done(err);
     }
     if(user){
         console.log("user",user);
         return done(null,false,{message:'Email is already in use.'});
     }
     var newUser=new User();
     newUser.email=email;
     newUser.password=newUser.encryptPassword(password);
     newUser.passwordConfirmation=req.body.confirmpassword;
     newUser.username=req.body.username;
     newUser.save(function(error,result){
         if(error)
         {
             return done(error);
         }
         return done(null,newUser);
        })
     })
 }))
 passport.use('local.signin',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
 },function(req,email,password,done){
    req.checkBody('email','Invalid email').notEmpty().isEmail();
    req.checkBody('password','Invalid password').notEmpty();
    console.log("LOGIN-->",email,password);
    var errors=req.validationErrors();
    console.log('Validation errors',errors);
    if(errors){
        var messages=[];
        errors.forEach(function(error){
            messages.push(error.msg);
        })
        console.log(errors,messages);
        return done(null,false,req.flash('signinerror',messages));
    }
    User.findOne({
        'email':email},function(error,user){
            console.log("Finding user=",error,user);
            if(error){
            console.log("error",error);
            return done(err);
        }
        if(!user){
            console.log("user",user);
            return done(null,false,{message:'User is not registered'});
        } 
        if(!user.validPassword(password)){
            
            return done(null,false,{message:'Wrong password'});
        }
        req.session.user=user.username;
        return done(null,user);
 })}));