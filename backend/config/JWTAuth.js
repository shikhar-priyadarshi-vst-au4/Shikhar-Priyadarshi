const passport = require ('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Worker = require('../models/Worker');
const Customer = require('../models/Customer');
let option = {
    jwtFromRequest :  ExtractJwt.fromUrlQueryParameter('jwt'),
    secretOrKey : "Express",
    passReqToCallback : true
    }


//passport-jwt strategy for verifying token.
passport.use('jwt',new JwtStrategy( option, async (req, jwt_payload, done) => {
    console.log(jwt_payload);
    let provider = req.provider;
try{
    let user = await (provider === 'Worker' ? Worker : Customer ).findOne( {where: {id: jwt_payload.sub}});  
    console.log(user);
    if (user) {
        
    return done(null, user, "access authorised");
    
    } 
    else {
    return done(null, false);

    // or you could create a new account
}
}
catch(err){
    return done(err, false);
}
}));