import {HOST, PORT, worker_links} from './links';

//Account Action constants
const CREATE_ACCOUNT = 'CREATE_ACCOUNT';
const LOGIN_ACCOUNT = 'LOGIN_ACCOUNT';
const LOGOUT = 'LOGOUT';

//Error Action constants
const RESPONSE_ERROR = 'RESPONSE_ERROR';
const INPUT_ERROR = 'INPUT_ERROR';
const LOGIN_ERROR = 'LOGIN_ERROR';
const REMOVE_ERROR_ALERT = 'REMOVE_ERROR_ALERT';

//Modal Action constants
const CLOSE_MODAL = 'CLOSE_MODAL';

//Token Action constants
const NOTOKEN = 'NOTOKEN';
const VALIDTOKEN = 'VALIDTOKEN';

export const register = ({ name, email, 
                            password, mobileNumber,
                            specialisation, area }) => { 
    
      if( !name || !email || !mobileNumber || !password || !specialisation || !area ){
          return ({
              type : INPUT_ERROR,
              payload : 'Fill the remaining field'
          })
      }
      else {
         return async dispatch => {
             
             try{
                let { message, status, error } = await (await fetch(`http://${HOST}:${PORT}${worker_links[0].register}`,{
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                            name, email, 
                            password, mobileNumber,
                            specialisation, area
                    })
                })).json();
                if(!error){
                    if(status){
                        
                        return dispatch({
                            type : CREATE_ACCOUNT,
                            payload : message
                       })
                    }
                    return dispatch({
                        type : INPUT_ERROR,
                        payload : message
                   })
                }
                else{
                     return dispatch({
                         type: RESPONSE_ERROR,
                         payload : message
                     })
                } 
             }
             catch(err){
                
                return dispatch(responseError(err));
             
            }
        }
     }                          
}

export const login = ({ email, password }) => {
      if(!email || !password){
        return ({
            type : INPUT_ERROR,
            payload : 'Fill the remaining field'
        })
      }
      else{
          return async dispatch => {
             try{
                 let { error, user, token, message } = await (await fetch(`http://${HOST}:${PORT}${worker_links[1].login}`,{
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                             email,  password
                    })})).json();
                 if( !error ){
                    if(!!token.length){
                        localStorage.setItem('access-token', token);
                        return dispatch({
                        type : LOGIN_ACCOUNT,
                        payload : { user , message }  
                       });
                    }
                    return dispatch({
                        type : LOGIN_ERROR,
                        payload : message
                    })   
                 }
                 return dispatch({
                     type : RESPONSE_ERROR,
                     payload : message
                 }) 
             }
             catch(err){
                 return dispatch(responseError(err));
             }
          }
      }
}
export const logout = () => { 
    localStorage.removeItem('access-token');
    
    return({
        type : LOGOUT
    })
}
export const closeModal = (property) => {
     return ({
         type : CLOSE_MODAL,
         payload : property
     })
}

const responseError = (err) => {
    return ({
        type : RESPONSE_ERROR,
        payload : err.message
    })
}

export const removeError = ( ) =>{
    return ({
        type : REMOVE_ERROR_ALERT
    })
}
export const validateToken = ( ) => {
    
        
        return async dispatch => {
            let gettoken = localStorage.getItem('access-token');
            if(!gettoken){
               return dispatch(noToken());   
            }
            else{   
            try {
                let { token, message, data } = await (await fetch(`http://${HOST}:${PORT}${worker_links[3].tokenAuth}${gettoken}`,{
                    method : 'POST',
                    headers : {
                     'Content-Type' : 'application/json'
                  }})).json();
                if(token){
                  
                    return dispatch({
                        type : VALIDTOKEN,
                        payload : { message, data}
                    })
                }
                //not valid token - auto logout
                return dispatch(logout());
            }
            catch(err){
                return dispatch(logout());
            }
    }
 } 
}
export const noToken = ( ) => ( { type : NOTOKEN } );
export { 
    INPUT_ERROR, 
    LOGIN_ERROR,
    RESPONSE_ERROR, 
    CREATE_ACCOUNT, 
    LOGIN_ACCOUNT,
    LOGOUT,
    CLOSE_MODAL,
    NOTOKEN, 
    VALIDTOKEN,
    REMOVE_ERROR_ALERT}