const router = require('express').Router();

const { register, login, 
   isAuthorised, upload, retrieve } = require('../../controllers/serviceprovider/worker');
const { cloudinaryConfig  } = require('../../middleware/cloudinary');
const { multerUploads } = require('../../middleware/multer');

router.use('*', cloudinaryConfig);

// End-point to register worker
router.post('/register', register);

// End-point to login worker
router.post('/login', login);


router.post('/upload', isAuthorised , multerUploads, upload);


// // Auth-end-point
//controller.isAuthorised is authorisation middleware
router.post('/auth', isAuthorised, retrieve );

module.exports = router;










// return uploader.upload(file).then((result) => {
   // const image = result.url;
   // return res.status(200).json({
   // messge: 'Your image has been uploded successfully to cloudinary',
   // data: {
   // image
   // }
   // })
   // }).catch((err) => res.status(400).json({
   // messge: 'someting went wrong while processing your request',
   // data: {
   // err
   // }
   // }))





























// router.post('/register', 
// passport.authenticate('register',{ session : false }),
// controller.register);



// router.post('/login', 
// passport.authenticate('login',{ session : false }),
// controller.login);

// router.post('/auth',passport.authenticate('jwt',{session : false}), ( req,res ) => {
//    res.json(req.user);
// })


// // router.post('/getuser', async (req,res) => {
// //   let data = await Worker.findAll({});
// //   res.json(data);
// // })

