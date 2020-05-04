import React, { useState, useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom'
import {CircularProgress, Paper, Typography, makeStyles} from '@material-ui/core';


const useStyle = makeStyles((theme)=>({
    loader:{
        margin : '4em 8em',
        padding : '2em 4em',
        textAlign : 'center',
    }
}))


export const ProtectedRoute = ( { component : Component, isAuthenticated, 
    isCustomerAuthenticated, part, ...rest } ) => {    
    
    const [Loading, setLoading ] = useState(true);
    const [progress, setProgress] = useState(0);
    const classes = useStyle();
    
    useEffect(() => {
        
        let timer = setInterval(( ) => {
            setProgress((oldprogress) => (oldprogress>=400) ? ((( ) => {
                setLoading(false);
                clearInterval(timer);       
                return 0
            })()):oldprogress+1);
                 
        }, 10)
        
    },[]);
    
    if(Loading){
        return( 
            <Paper variant={'outlined'} className={classes.loader}>
            <Typography variant={'h4'} style={{margin : '2em 0em'}}>Please wait while it loads</Typography>    
            <CircularProgress variant="determinate" value={progress} color="secondary" 
            size={'8em'}/>
            </Paper>
        )
    }
    else{
        return(

            <Route {...rest} render = {
                 props => {
                       
                       
                           if((isAuthenticated && 
                            part === 'Dashboard')||
                            ( isCustomerAuthenticated 
                            && part === 'User') ){
                               
                               return <Component {...rest} />
                           }
                           else{
                               
                               return <Redirect to = {
                                   {
                                       pathname : '/',
                                       state : {
                                           from : rest.location
                                       }
                                   }
                               }/>
                           } 
                     
               }
                  
            }/>   
           
            )
    }
    
}

