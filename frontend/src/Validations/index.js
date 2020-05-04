import validator from 'validator';

//email id validation
export const isEmail = (email) => {
        if(!validator.isEmail(email)){
            return {status : true, msg :'Incorrect email'}
        }
        else{
            return { status : false, msg : ""}
        }
}
//number validation
export const isNumber = (number) => {
        if(!(validator.isMobilePhone(number) && 
        validator.isLength(number,{
            min : 10,
            max : 12
        }))){
            return {status: true, msg:`Enter your 10-digit number`}
        }
        else{
            return {status : false, msg : ""}
        }
}
//full name validation
export const isFullName = (fullname) => {
       console.log(fullname)
        if(validator.isInt(fullname)){
            return {status : true, msg:'Name should be alphabetic'}
        }
       else{
           return {status : false, msg : ""}
       }
}
//password validation
export const isPassword = (password) => {
   
          if(!(validator.isAlphanumeric(password) &&
          validator.isLength(password, {
              min : 6,
              max : 10
          }))){
              return {status: true, msg:'minimum 6 alphanumeric'}
          }
          else{
          return { status : false, msg:"" }   
   } 
}
//empty field validation
// export const isEmpty = (value) => {
//     return validator.isEmpty(value)
// }
