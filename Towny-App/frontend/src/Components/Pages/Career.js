import React, { Fragment, useState } from 'react';
import {connect} from 'react-redux';
import { GridContainer, Text, ItemOne, ItemTwo, Position } from '../Styled/Styled'
import { Form, AlertDialog, KeyStroke } from '../General/index'
import { mapStateToProps } from '../StateTransition'
import { closeModal, } from '../../Actions/index';
const Career = (props) => {
    
    const [ signUp, setSignUp ] = useState(true); 
    const handleClose = async (property) => {
      await props.dispatch(closeModal(property));    
    };
    return(
    <Fragment>
        {props.profileCreated &&<Position position={'absolute'}> 
          <AlertDialog {...props} part = {'career'} handleClose={handleClose}/>
         </Position>}
         {props.isLoggedIn &&<Position position={'absolute'}> 
          <AlertDialog {...props} part = {'career-login'} handleClose={handleClose}/>
         </Position>}
        
        <GridContainer>
            <ItemOne>
                <Position >
                <Text fontcolor ={'#ffffff'} size={'2em'} weight={'600'} spacing={'0.1em'}>Welcome to Towny</Text>
                <Position margin ={'2em 0.2em'} sm_margin = {'2em 0.2em'}>
                <Text fontcolor ={'#ffffff'} size={'1.4em'} weight={'400'} spacing={'0.1em'}>Join Us!</Text>
                <Text fontcolor ={'#ffffff'} size={'1.4em'} weight={'400'} spacing={'0.1em'}>To begin an incredible journey</Text>
                <KeyStroke part={'career-login'} signUp={signUp} setSignUp={setSignUp}/>
              </Position>
                </Position>
            </ItemOne>
            <ItemTwo>
                {  signUp  && <Form part = {'career'} {...props}/> }
                { !signUp &&  <Form part = {'career-login'} {...props}/>}
            </ItemTwo>
        </GridContainer>
    </Fragment>
        )
}
export default connect(mapStateToProps)(Career) ;






















//snapshot lifecycle in react
//useMediaquery (Custom hook)
//UseScroll position (Custom hook)
//Context API
//UseState
//UseEffect
//UseReducers