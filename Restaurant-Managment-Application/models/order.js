//records database schema
var mongoose=require('mongoose');
var recordSchema= new mongoose.Schema({
    username:{
        type:String
    },
    orderId:{
        type:String,
        
    },
    bookingtable:{
        type:String,
        
    },
    items:{
        type:Object,
        
    },
    paymentStatus:{
        type:String,
    },
    transaction_id:{
        type:String
    },
    waiter_assigned:{
        type:String
    }
},{collection:'Records'});
var Record=mongoose.model('Record',recordSchema); 
module.exports=Record;

