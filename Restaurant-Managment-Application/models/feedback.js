var mongoose=require('mongoose');
var feedbackSchema= new mongoose.Schema({
    username:{
        type:String
    },
    feedback:{
        type:String,
        
    },
    star:{
        type:String
    }
},{collection:'Feedbacks'});
var Feedback=mongoose.model('Feedback',feedbackSchema); 
module.exports=Feedback;

