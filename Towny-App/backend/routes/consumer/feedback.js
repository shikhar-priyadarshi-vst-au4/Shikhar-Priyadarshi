const router = require('express').Router();
const {feedback} = require('../../controllers/consumer/feedback')


//end-point to submit a feedback
router.post('/submit/feedback/:profile_id', feedback);

//end-point to get all feedbacks 


module.exports = router;