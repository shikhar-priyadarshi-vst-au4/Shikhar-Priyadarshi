const mongoose=require('mongoose');
const tableSchema=new mongoose.Schema({
    table:{
        type:Array,
        required:true
                
    },
    index:{
      type:String,
      required:true
    }},
    {collection:'tables'});
    const table=mongoose.model('table',tableSchema);
module.exports=table;

