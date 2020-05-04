const router = require('express').Router();
const profile = require('./profile');
const booking = require('./booking');
// const feedback = require('./feedback');
// const payment = require('./payment');
router.use([profile, booking]);
module.exports = router;