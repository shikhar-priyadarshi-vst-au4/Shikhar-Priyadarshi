import { createStore ,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { rootReducer } from '../Redux/index';


export const configureStore = () =>{
     return createStore( rootReducer , applyMiddleware( thunkMiddleware ) );
     
    }


// Login -> isAuthenticated - true
// dashboard access -> if isAuthenticated - true
// Logout -> isAuthenticated - false - no dashboard access
