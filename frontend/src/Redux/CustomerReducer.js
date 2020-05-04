import { CUSTOMER_REGISTER,
         CUSTOMER_LOGIN, CUSTOMER_LOGOUT, 
         CUSTOMER_BOOKINGS, NOBOOKINGS, RESET_ALL } from '../Actions/customer' 
import {  CUSTOMER_TOKEN_VALIDATE, CUSTOMER_NOTOKEN } from '../Actions/Auth';
const initState = {
    isCustomerAuthenticated :  false,
    isRegister : false,
    loggedIn : false,
    customerData : "",
    customerMsg : "",
    bookings : []
}

export const CustomerReducer = ( state = initState,
    { type, payload } ) => {
      let stateCopy = {...state};
      switch(type){
          case CUSTOMER_REGISTER:
              stateCopy.isRegister = payload.status;
              stateCopy.customerMsg = payload.message;
              return stateCopy;
          case CUSTOMER_LOGIN:
              stateCopy.customerData = payload.user;
              stateCopy.customerMsg = payload.message;
              stateCopy.isCustomerAuthenticated = payload.status;
              stateCopy.loggedIn = payload.status;
              return stateCopy;
          case CUSTOMER_TOKEN_VALIDATE:
               stateCopy.isCustomerAuthenticated = payload.status;
               stateCopy.customerData = payload.data;
               return stateCopy;
          case CUSTOMER_BOOKINGS:
              stateCopy={...stateCopy, bookings : payload.data};
              return stateCopy;
          case CUSTOMER_NOTOKEN:         
          case CUSTOMER_LOGOUT:
          case RESET_ALL:
               return initState;
          default:
              return stateCopy;            
      }
}