import {IMAGE_UPDATE, FETCH_USER, 
//  UPDATE_DETAILS
} from '../Actions/worker'
let profileState = {
    id: "",
    image : "",
    name : "",
    email : "",
    number : "",
    specialisation : "",
    password : "",
    area : ""
} 


export const ProfileReducer = (state = profileState, { type, payload } ) => {
      let stateCopy = { ...state };
      switch( type ){  
        case FETCH_USER :
             //extract data 
            stateCopy = {...stateCopy, ...payload}; 
            console.log(stateCopy);
            return stateCopy;
        case IMAGE_UPDATE :
              let {image} = payload;
              stateCopy.image = image;
              return stateCopy;
        //   case UPDATE_DETAILS : 
        //        let { property, data } = payload;
        //        stateCopy[property] = data;
        //        return stateCopy;
          default :
               return stateCopy;
    }
}


// payload : { 
//     property : 'number',
//     data : 23432423423    
// }