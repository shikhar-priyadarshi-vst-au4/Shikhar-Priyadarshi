const { 
    tokenGenerator, 
    //tokenValidator 
                   } = require('../../config/Tokengenerate');


const passport = require('passport');

const {  uploader } = require('../../middleware/cloudinary');
const {  dataUri } = require('../../middleware/multer');
const Worker = require('../../models/Worker');
function controller (){
    
    this.register = ( req, res ) => {
        req.provider = "Worker";
        passport.authenticate('register', { session : false }, async ( err, user, message ) => {
            
            if(err){
                res.status(500).json({ message : err.errors[0].message, 
                    status : false, 
                    error : true });
            }
            else if ( user ){
                res.json ( { ...message });
            }
        })( req, res )
    } 
    this.login = ( req , res ) => {
        req.provider = "Worker";
        passport.authenticate('login', { session : false }, async ( err, user, message ) => {
          if(err){
              res.status(500).json({ error : true, user, token:"", message });
          }
          else if(!user) {
              res.json({ error : false, user, token:"", message });
          }
          else {
            let token = await tokenGenerator(user.id);
                    if(token){
                        res.json({ error : false, user, token, message });
                    }
          }

        })(req, res)
    } 

    this.isAuthorised = ( req, res, next ) => {
        req.provider = "Worker";
        passport.authenticate('jwt',{session : false}, ( err, user, message ) => {
            if(err){
                res.status(500).json({ error : err.errors[0].message });
            }
            else if(!user){
                res.json({ message :  "not authorised" })
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
           let data = await Worker.update({ image }, { where : { id }, returning : true });
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
              token : true,
              message : 'Valid token',
              data : res.locals.user
          });
     }
    // this.authenticate = async ( req, res ) => {
    //    let token = req.header('auth-token');
    //    let id = tokenValidator(token);

    // }
}

module.exports = new controller();



// this.register = ( req, res ) => {              
       
    //     if(req.user){
    //     res.json({
    //         msg : req.authInfo 
    //     })     
    //    } 
    //   else{
    //       res.status(500).json({
    //           msg: 'Internal Server Error'
    //       })
    //   }
    // }
    


// this.login = async ( req, res) => {
    //     if(req.user){
    //         let token = await tokenGenerator(req.user.id);
    //         if(token){
    //             res.json({ token });
    //         }
    //         else{
    //             res.status(500).json({
    //                 msg: 'token generation failed'
    //             })
    //         }
    //     }
        
    // }
    