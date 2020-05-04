import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import {mapStateToProps} from '../StateTransition/index'
import Login from './Login'; 
import SignUp from './SignUp';
const Account = ({ part, ...rest}) => {
    console.log(part);
    console.log(rest);
   return(<Fragment>
       {part === 'login' && <Login/>}
       {part === 'signup' && <SignUp/>}
   </Fragment>)
}

export default connect(mapStateToProps)(Account);