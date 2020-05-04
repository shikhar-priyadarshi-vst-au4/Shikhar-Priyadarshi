import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import { Add, ReceiptSharp, Delete, Edit, ExitToApp } from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight  } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    btn_homepage : {
        margin : theme.spacing(1),
        padding : theme.spacing(2)
    },
    btn_career :{
      margin : theme.spacing(2),
        padding : theme.spacing(2)
    },
    btn_login:{
      marginTop : theme.spacing(2),
      padding : "1em 3em",
      letterSpacing : "0.1em"
    },
    form_btn_login : {
      margin : "1em",
      padding : "1em 3em",
      letterSpacing : "0.1em",
    },
    receipt :{
      marginTop : theme.spacing(2),
    },
    edit : {
      padding : theme.spacing(1),
    }
  }));

export const KeyStroke = (props) => {
    const classes = useStyles();
    
    return(
      <Fragment>
        {props.part === "homepage-header" && <Button variant="contained"
          color="secondary" 
          onClick = {()=>props.filterOut()}
          className = {classes.btn_homepage}>
          Check services in an area
        </Button>}

        {props.part === "career" && <Button variant="contained"
          color={"secondary"} 
          onClick = {()=>props.error?props.handleError():props.createAccount()}
          className = {classes.btn_career}>
          {props.error?<FontAwesomeIcon icon={faArrowCircleRight} 
          style={{padding : '0em 2em'}} size={'2x'}/>:'Create Account'}
        </Button>}
      {props.part === 'career-login' &&  <Button variant="contained"
          color="secondary" 
          onClick = {()=> props.formPart==='career-login'?(props.loginError ? props.handleError()
          : props.loginAccount()) : props.setSignUp(!props.signUp)}
          className = {classes[props.formPart==='career-login'?"form_btn_login":"btn_login"]}>
          {props.formPart==='career-login'?(props.loginError?<FontAwesomeIcon icon={faArrowCircleRight} 
          style={{padding : '0em 2em'}} size={'2x'}/>:"Login"):(props.signUp?"Login": "Create Account")}
        </Button>}
        {
          props.part === 'signup' && 
          <Button variant="contained"
          color={"secondary"} 
          onClick = {()=>props.customerCreateAccount()}
          className = {classes.btn_career}>
          {'Create Account'}
        </Button>
        }
        {
          props.part === 'login' && 
          <Button variant="contained"
          color={"secondary"} 
          onClick = {()=>props.customerLoginAccount()}
          className = {classes.form_btn_login}>
          {'Login'}
        </Button>
        }
        {
          props.part === 'dashboard-signout' && <Button
          style={{textDecoration : "none"}} 
          variant={"contained"}
          color={"secondary"} 
          onClick = {() => props.Logout()}
          className = {classes.form_btn_login}>
            Sign Out
          </Button>
        }
        {
          props.part==='booking-page-services-category' && ( 
          (!!props.addedServices?.find(({ service
           }) => service === props.service.service))?<Button
          variant="contained"
          color="secondary"
          onClick={()=>props.removeService(props.service)}
          className={classes.button}
          startIcon={<Delete/>}
        >
         Delete
        </Button> :<Button
          variant="contained"
          color="secondary"
          onClick={()=>props.addService(props.index)}
          className={classes.button}
          startIcon={<Add/>}
        >
         Add 
        </Button>)
        }
        {
          props.part==='booking-page-payment-generate' && <Button
          variant="contained"
          color="secondary"
          onClick={()=>props.setGenerate(true)}
          className={classes.receipt}
          startIcon={<ReceiptSharp/>}
        >
         Generate Bill
        </Button>
        }
        {
          props.part==='booking-page-payment-confirmation' && <Button
          variant="contained"
          color="secondary"
          onClick={()=>props.confirmBooking()}
          className={classes.receipt}>
         Confirm Booking
        </Button>          
        }
        {
          props.part==='userpage-button' && <Button
          variant="outlined" size={'small'}
          // onClick = { () => props.editHandler()}
          color="secondary" className={classes.edit}
          startIcon={<Edit></Edit>}>
          Edit profile
        </Button>          
          
        }
        {
          props.part==='userpage-service-button' && <Button
          component={Link} to={`/booking/${props.id}`}
          variant="outlined" size={'medium'} style={{
            margin : "0.5em 0em",
            textDecoration : 'none'
          }}
          color="default" >
          {props.category}
        </Button>          
          
        }
        {
          props.part==='userpage-signout-button' && <Button
          variant="outlined" size={'medium'} style={{margin : '0em 1em'}}
          startIcon={<ExitToApp></ExitToApp>}
          color="default" >
          Sign out
        </Button>          
          
        }
      </Fragment> 
    
    )
}
