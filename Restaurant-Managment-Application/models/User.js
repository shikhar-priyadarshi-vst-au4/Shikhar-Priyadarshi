var mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');
var bcrypt=require('bcrypt');
var Userschema= new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    passwordConfirmation:{
        type:String,
        required:true
    }
},{collection:'Users'});
Userschema.plugin(uniqueValidator);
Userschema.methods.encryptPassword=function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5),null);
}
Userschema.methods.validPassword=function(password){
    return bcrypt.compareSync(password, this.password);
}
var User=mongoose.model('User',Userschema); 
module.exports=User;
