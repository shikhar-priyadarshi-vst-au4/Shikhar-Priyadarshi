import {FetchAPI} from './Fetch';
import {client_links} from './links';
const CUSTOMER_TOKEN_VALIDATE = 'CUSTOMER_TOKEN_VALIDATE';
const CUSTOMER_NOTOKEN = 'CUSTOMER_NOTOKEN'; 
//const WORKER_NOTOKEN = 'WORKER_NOTOKEN';
//const WORKER_TOKEN_VALIDATE = 'WORKER_TOKEN_VALIDATE';

export const tokenValidate = () =>{
    let getToken = localStorage.getItem('customer-token');
    if(!!getToken){
        return dispatch => {
          FetchAPI(client_links[3].tokenAuth.concat(getToken),{METHOD: 'POST', VALUE : {} },(error, data)=>{
              if(!error){
                  let {status} = data;
                  if(status){
                    return dispatch({
                        type : CUSTOMER_TOKEN_VALIDATE,
                        payload : data
                    })
                  }
                  localStorage.removeItem('customer-token');
              }
          })
        }
    }
    else{
        return ({
            type : CUSTOMER_NOTOKEN
        })
    }
    
}

export {
    CUSTOMER_TOKEN_VALIDATE,
    CUSTOMER_NOTOKEN
}