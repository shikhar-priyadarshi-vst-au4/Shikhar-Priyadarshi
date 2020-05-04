const router=require('express').Router();
const payroute=require('./routes/paytm');
router.use('/paytm',payroute);
module.exports=router;