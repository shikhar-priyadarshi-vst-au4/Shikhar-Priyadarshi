
let ticketState = {
    customerId : "",
    service : "",
    status : "InActive"
}

export const TicketReducer = ( state = ticketState, { type, payload}) => {
       let stateCopy = { ...state };
       switch( type ){
        //    case ACCEPT_TICKET :
        //         let { customerId, service } = payload;
        //         stateCopy.customerId = customerId;
        //         stateCopy.service = service;
        //         stateCopy.status = 'Active';
        //         return stateCopy;
           
        //     case FINISH_TICKET :
        //         stateCopy.customerId = "";
        //         stateCopy.service = "";
        //         stateCopy.status = 'InActive';
             //   return stateCopy;
                     
            default :
               return stateCopy;    
                
       }
}