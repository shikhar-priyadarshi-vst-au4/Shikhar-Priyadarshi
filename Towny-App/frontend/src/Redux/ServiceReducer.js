import {ALLSERVICES, SERVICEID, FILTERSERVICE} from "../Actions/worker"
let categoryState = {
    services : [],
    filtered : [],
    category_id : ""
}


export const ServiceReducer = ( state = categoryState, { type, payload}) => {
    let stateCopy = { ...state };
    switch(type){
        case ALLSERVICES :
             stateCopy.services = [...payload]; 
             return stateCopy;  
        case SERVICEID :
             let data = stateCopy.services.find((val) => val.category === payload);
             stateCopy.category_id = data.id;
             return stateCopy;
        case FILTERSERVICE :
             stateCopy.filtered = [...payload?.Category?.services];
             return stateCopy;            
        default :
             return stateCopy;     
    }
}





