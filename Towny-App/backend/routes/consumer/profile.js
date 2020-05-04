const router = require('express').Router();
const { register, login, isAuthorised,
        upload, retrieve } = require('../../controllers/consumer/profile');
const { cloudinaryConfig  } = require('../../middleware/cloudinary');
const { multerUploads } = require('../../middleware/multer');

router.use('*', cloudinaryConfig);

router.post('/register', register);
router.post('/login', login);
router.post('/upload', isAuthorised, multerUploads, upload );
router.post('/auth', isAuthorised, retrieve);

module.exports = router;