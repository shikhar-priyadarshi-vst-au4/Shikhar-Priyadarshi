const passport = require ('passport');
const LocalStrategy = require ('passport-local').Strategy;
const Worker = require ('../models/Worker');
const Customer = require('../models/Customer');

//Local strategy for register part.
passport.use('register', new LocalStrategy({
    usernameField : 'email',
    passReqToCallback: true
   }, async(req,email, password, done) =>{
       let { name, mobileNumber, specialisation, area } = req.body;
       let provider = req.provider;
      try{
        let userFound = await ( provider==='Worker'? Worker : Customer).findOne({
            where : {email} });
        if(userFound){
            done(null,userFound,{message : 'Email is already in use', 
            status: false, error : false} );
        }
        else{
            let createUser = await (provider==='Worker'? Worker.create({ name, email, password, mobileNumber,
            specialisation, area }): Customer.create({ name, email, password, mobileNumber, area}));
            done(null, createUser, {message : 'User registered successfully', 
            status: true, error : false});
        }
      
    } 
      catch(err){
          
         done( err, false );
      }
}));

//Local strategy for Login part.
passport.use('login', new LocalStrategy(
    {
        usernameField : 'email',
        passReqToCallback: true
    },
   async ( req, email, password, done) => {
        let provider = req.provider;
        try{
        let userFound = await ( provider === 'Worker'? Worker : Customer ).findOne({where : {email, password}});      
          if(userFound){
            return done(null, userFound, 'Logged in successfully');
           }
           
            
           return done( null, false, 'Invalid email or password' );
           
        }
        catch(err){
            return done(err, false, err.message);
        }
}));

