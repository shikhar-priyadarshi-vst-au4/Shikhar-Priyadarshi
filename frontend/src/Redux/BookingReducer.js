import {    SET_FILTER,
            ADD_SERVICES,
            REMOVE_SERVICES,
            CONFIRM_BOOKING,
            BOOKING_FAILED     } from '../Actions/booking';


const initState = {
    filteredServices : [],
    addedServices : [],
    serviceId : "",
    balance : 0.0,
    charges : 0.0,
    finalamount : 0.0,
    bookingdata : ""
}

export const BookingReducer = (state = initState, {type, payload}) => {
            let stateCopy = JSON.parse(JSON.stringify(state));
            let {filteredServices, addedServices} = stateCopy;
            switch(type){
                case SET_FILTER:
                    stateCopy={ ...stateCopy,
                    filteredServices : payload, addedServices : [],
                    serviceId : payload.id , balance : 0.0, 
                    charges : 0.0, finalamount : 0.0 }
                    return stateCopy;
                case ADD_SERVICES:
                    if(!addedServices.includes(filteredServices.services[payload])){
                    addedServices = [...addedServices, filteredServices.services[payload]];
                    let balance =  addedServices.reduce((acc, curr) => {
                    acc+=curr.price;
                    return acc;
                    },0)
                    let charges = 0.05*balance;
                    let finalamount = balance + charges;
                    stateCopy = {...stateCopy, 
                        ...{ addedServices },
                        serviceId : filteredServices.id,
                        ...{balance}, ...{charges},
                        ...{finalamount}}
                    }    
                    return stateCopy;

                case REMOVE_SERVICES :
                    let { balance, 
                        charges, finalamount } = stateCopy;
                   
                   if(addedServices.length>0){
                    addedServices.map(({service, price}) => {
                       if(service === payload.service){
                         balance = balance - price;
                         charges = balance*0.05;
                         finalamount = balance + charges;
                         stateCopy ={...stateCopy,...{balance},...{charges},...{finalamount}};              
                       }
                       return {service, price};
                     })
                     addedServices = addedServices?.filter(({service}) => service !== payload.service );
                     stateCopy = { ...stateCopy, ...{addedServices}};
                    }
                    return stateCopy;
                case CONFIRM_BOOKING :
                    let { data } = payload;
                    stateCopy = { ...stateCopy, ...{ bookingdata : data }}
                    return stateCopy;
                case BOOKING_FAILED:
                    stateCopy = {...stateCopy, ...{ bookingdata : ""}};
                    return stateCopy;     
                default :
                    return stateCopy;                                                 
        }           
}
