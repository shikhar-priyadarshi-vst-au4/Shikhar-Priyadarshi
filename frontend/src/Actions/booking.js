import { FetchAPI } from "./Fetch";
import { client_links } from './links'
//Action Constants
const SET_FILTER = 'SET_FILTER';
const ADD_SERVICES = 'ADD_SERVICES';
const REMOVE_SERVICES = 'REMOVE_SERVICES';
const CONFIRM_BOOKING = 'CONFIRM_BOOKING';
const BOOKING_FAILED = 'BOOKING_FAILED';
const BOOKING_ERROR = 'BOOKING_ERROR';
const WORKER_ASSIGNED = 'WORKER_ASSIGNED';
            export const FilterServices = (value) => {
               console.log(value);
                return ({
                    type : SET_FILTER,
                    payload : value
                })
            }

            export const AddServices = (id) => {
                return ({
                    type : ADD_SERVICES,
                    payload : id
                })
            }

            export const RemoveServices = (service) =>{
                return({
                    type : REMOVE_SERVICES,
                    payload : service
                })
            }
            export const ConfirmBooking = ({customer_id, service_id,
            services, balance}) => {
                 let token = localStorage.getItem('customer-token');
                 console.log(token);
                   return dispatch => {
                    FetchAPI(`${client_links[4].createBooking}${customer_id}?jwt=${token}`,{METHOD : 'POST', VALUE: {
                        service_id, services, balance
                    }}, (error, data) => {
                         if(!error){
                             console.log(data);
                            if(data.status){
                                return dispatch({
                                    type : CONFIRM_BOOKING,
                                    payload : data.data
                                })
                            }
                            return dispatch({
                                type : BOOKING_FAILED,
                                payload : data.error
                            })
                         }
                         return dispatch({
                             type : BOOKING_ERROR
                         })
                    })
                   }
                    
            }

            export const assignBooking = (bookingId) => {
                return dispatch => {
                    FetchAPI(`${client_links[7].workerAssigned}${bookingId}`,
                    {METHOD : 'PUT', VALUE : {}},(error, data) => {
                        if(!error){
                            if(data.status){
                                return dispatch({
                                    type : WORKER_ASSIGNED,
                                    payload : data 
                                })
                            }
                            return dispatch({
                                type : BOOKING_ERROR,
                                payload : data
                            })
                        }
                        return dispatch({
                            type : BOOKING_FAILED
                        })
                    })
                }
                 
            }
            
export { SET_FILTER, ADD_SERVICES, 
         REMOVE_SERVICES, CONFIRM_BOOKING, 
         BOOKING_FAILED, BOOKING_ERROR};
