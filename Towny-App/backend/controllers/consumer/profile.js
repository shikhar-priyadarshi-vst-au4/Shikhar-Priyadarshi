const passport = require('passport');
const Customer = require('../../models/Customer');
const {tokenGenerator} = require('../../config/Tokengenerate');
const {  uploader } = require('../../middleware/cloudinary');
const {  dataUri } = require('../../middleware/multer');


function controller(){
  this.register = ( req, res ) => {
      req.provider = 'Customer';
      passport.authenticate('register', {session : false}, async ( err, user, message ) => {
        if(err){
            res.status(500).json({ message : err.errors[0].message, 
                status : false, 
                error : true });
        }
        else if ( user ){
            res.json ( { ...message });
        }
      })( req, res);
  }
  this.login = ( req, res ) => {
      req.provider = 'Customer';
      passport.authenticate('login', { session : false }, async ( err, user, message ) => {
        if(err){
            res.status(500).json({ error : true, user, token:"", message });
        }
        else if(!user) {
            res.json({ error : false, status:false, user, token:"", message });
        }
        else {
          let token = await tokenGenerator(user.id);
                  if(token){
                      res.json({ error : false, status:true,user, token, message });
                  }
        }

      })(req, res)
  }
  this.isAuthorised = ( req, res, next ) => {
    req.provider = "Customer";
    passport.authenticate('jwt',{session : false}, ( err, user, message ) => {
        if(err){
            res.status(500).json({ status: false, error : err.errors[0].message });
        }
        else if(!user){
            res.json({ status:false, message :  "not authorised" })
        }
        else{
            res.locals.user = user;
            next();
        }
    })( req, res, next )
}
this.upload = async (req, res) => {
        
    if(req.file) {
    const file = dataUri(req).content;
    try{
       let result = await uploader.upload(file);
       let image = result.url;
       let { id } = res.locals.user;
       let data = await Customer.update({ image }, { where : { id }, returning : true });
       res.status(200).json({
          message: 'Your image has been uploaded successfully ',
          data
          })
    }catch(err){
       res.status(400).json({
          message: 'someting went wrong while processing your request',
          data: {
          err
          }
          })
      }
    }
 }
 this.retrieve = ( req, res ) => {
    res.json({
        status : true,
        message : 'Valid token',
        data : res.locals.user
    });
}
}

module.exports = new controller();