import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Paper, Grid,
     makeStyles} from '@material-ui/core';
import { mapStateToProps } from '../StateTransition';
import {  Text, Chip, Position } from '../Styled/Styled'
import { Image, List } from '../General/index'
import { profileOptions } from '../Data/data'
import { imageUpdate, extractUser, 
  retrieveServices, registerServices, categoryId } from '../../Actions/worker'
import {logout} from '../../Actions/index';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow : 1
    },
    paper: {
      padding: theme.spacing(1),
      color: theme.palette.text.secondary,
      height : "2000px",
    },
    grid : {
    },
    paper_head : {
      textAlign : 'center', 
        margin : "0.3em 0em",
        backgroundColor : '#fe346e'
    },
    paper_text : {
        textAlign : 'center', 
        margin : "0.3em 0em",
        
    },
    chip : {
      display : "flex",
      backgroundColor : "transparent",
      border: `1px solid #fe346e`,
      borderRadius : `3.5em`
    },
    text : {
        ["&:hover"] : {
            backgroundColor : " #393e46",
            color : "#ffffff",
            fontWeight : "400",
        }
    }
  }));
const WorkerDashboard = ( props ) => {
    const [ option, setOption ] = useState('Check Your Tickets');
    const classes = useStyles();
    //CDM
    useEffect(()=>{
      props.dispatch(retrieveServices());
    },[])
    
    //CDU
    useEffect(( ) => {
      props.dispatch(extractUser(props.data));
     },[props.image]);
     useEffect(()=>{
       if(props.services.length>0){
         console.log(props.services);
        props.dispatch(categoryId(props.data.specialisation));
       }
       if(!!props.category_id){
         console.log(props.category_id); 
        props.dispatch(registerServices({profile_id : props.id,
        category_id : props.category_id}));
       }
     },[props.services, props.category_id])
     const imageHandler = ( event ) => {
      let file = event.target.files[0];
      console.log(file);
      if(file){
        props.dispatch(imageUpdate(file));
      }
    } 
    const Logout = () => {
      props.dispatch(logout())
    }
    return(
        <div className = {classes.root}>
       <Chip position={'absolute'}
          margin = {'0em'} sm_margin = {'0em'}
          left = {'69em'}  sm_left = {'17em'}
          top = {'0.5em'}  sm_top = {'1em'}>
              <Paper variant="outlined"
              className={classes.chip}>              
                <Image part={'dashboard'} image = {props.image}
                imageHandler={imageHandler}/>     
                 
                 <Text padding={'1em 1em'} size={'0.5em'} 
                  sm_size = {'0.5em'}
                  weight={'350'} spacing={'0.1em'} 
                  fontcolor = {" #33313b"} 
                  style={{margin : "3em 1em"}}>{props.name}</Text>
              </Paper>
          </Chip>
        <Grid container style={{zIndex : "0"}} >
        
          
        
        <Grid item xs={6} sm={3} className={classes.grid}>
        <Position position={'relative'} sm_margin={'0em'}
          margin={'0em'}>    
          
          <Paper elevation={2} style={{backgroundColor : '#ffffff'}} className={classes.paper}>
          <Position position={'fixed'} sm_margin={'0em'}
            style={{zIndex : '2'}}
             margin={'0em'}>    
        
                 <Paper className={classes.paper_head}
                 elevation={5}>
                   <Text sm_padding = {'1.5em 0.5em'}
                   padding={'2em 2em'} size={'1.4em'} 
                   sm_size = {'0.85em'}
                   fontcolor = {"#ffffff"}
                   weight={'500'} spacing={'0.1em'}>Towny Dashboard</Text>
                    <Text sm_padding = {'1.5em 0.5em'}
                    padding={'2em 2em'} size={'1em'} 
                    sm_size = {'0.85em'}
                    fontcolor = {"#ffffff"}
                    weight={'500'} spacing={'0.1em'}>Welcome {props.name}</Text>
                 </Paper>
                 {profileOptions.map((val,index) => <Paper className = {classes.paper_text} elevation={3} key={index}>
                 <Text  
                  className = {classes.text} 
                  padding={'1em 0em'} 
                  sm_padding={'1em 0em'} 
                  size={'1em'} 
                  sm_size = {'0.85em'}
                  fontcolor = {"#33313b"}
                  weight={'350'} spacing={'0.1em'} 
                  cursor = {'pointer'}
                  onClick = {() =>  setOption(val) }>{val}</Text> 
                  </Paper>)}  
           </Position>                       
          </Paper>
          </Position>
          
        </Grid>

        <Grid item xs={6} sm={9} className={classes.grid}>
        <Position position={'relative'} sm_margin={'0em'}
          margin={'0em'}>    
        
        <Paper elevation={2} className={classes.paper}>
           
            { option === 'User Profile' && <List 
            {...props}
            part = {'dashboard-profile'}/>}
        
            { option === 'Account Settings' && <List 
            {...props}
            part = {'dashboard-settings'}/>}
            
            {option ==='Check Your Tickets' && <List {...props} part = {'dashboard-ticket'}/>}
            {option === 'Service Categories' && <List {...props} part = {'dashboard-categories'}/>} 
            {option === 'Check Your History' && 'Check Your History'}
            {option === 'Sign Out' && <List part={'dashboard-signout'} {...props} Logout={Logout}/>} 
        </Paper>
        </Position>
        </Grid>

      </Grid>         
    </div>)
}
export default connect(mapStateToProps)(WorkerDashboard);
