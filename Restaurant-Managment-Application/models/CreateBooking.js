const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');
const bookSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        uniqueCaseInsensitive:true
        
    },
    tableNumber:{
        type:String,
        required:true,
        unique:true
    },
    bookingStatus:{
        type:String,
        required:true,
    },
    createdAt:{
      type:Date,
      default:(new Date())
    },
    updatedAt:{
        type:Date,
        default:(new Date())
    }
    
},{
    collection:'bookings'
});
bookSchema.plugin(uniqueValidator);
const booking=mongoose.model('booking',bookSchema);
module.exports=booking;
