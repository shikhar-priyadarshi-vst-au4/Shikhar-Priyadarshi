const router = require('express').Router();
const {isAuthorised} = require('../../controllers/consumer/profile')
const { create, getInfo, assign, 
        cancel, gather, gatherAll,
        check } = require('../../controllers/consumer/booking');

//end-point to create a booking
router.post('/create/:customer_id/:domain', isAuthorised, check, create);

//end-point to gather all booking records of an individual
router.get('/retrieve/:customer_id', isAuthorised, getInfo);

//end-point to assign booking to worker
router.put('/assign/:bookingId', gather, assign);

//end-point to cancel the booking
router.delete('/cancel/:bookingId', isAuthorised, cancel);

//end-point to get booking data of all customers
router.get('/all', gatherAll);

// //end-point to gather all domain-related bookings
// router.get('/:', related);
module.exports = router;

