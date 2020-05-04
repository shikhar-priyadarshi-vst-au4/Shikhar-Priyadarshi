import React, { createRef, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCamera } from '@fortawesome/free-solid-svg-icons';
import { makeStyles,   Avatar} from '@material-ui/core';
import  Skeleton  from '@material-ui/lab/Skeleton';
import Styled from 'styled-components';
import {Position, CustomPosition,Text, CardImage} from '../Styled/Styled';
const useStyles = makeStyles((theme) => ({
    Skeleton : {
        backgroundColor : "ffffff",
        margin : "1em 1em"
    },
    CustomerSkeleton : {
        backgroundColor : "ffffff",
        margin : "0em 8em"
    },
    image : {
        margin : "0.8em 0.5em",
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
    list : {
        width : '100%',
        maxWidth : 360,
        backgroundColor : theme.palette.background.paper,
    }
  }));

const AccountImage = Styled.img`
width : 100%;
position : relative;
z-index : 0;
`;  

export const Image = ({ image, imageHandler, part,...rest }) => {
    const classes = useStyles();    
    let inputRef = createRef();
    return(<Fragment>
        {part ==='dashboard' && (image && !!image.length ? 
               <Avatar alt="Remy Sharp" src={image} className={classes.image} />:
              <div className={classes.Skeleton}>
              <input type="file" 
                     style = {{display : "none"}}
                     onChange = {( e ) => imageHandler( e )}
                     ref={(inputFile) => inputRef.current = inputFile}/>
               <Skeleton variant="circle" width={48} height={48}>
               <FontAwesomeIcon icon={faUserCircle} 
              style = {{cursor : "pointer", color:"#272727"}}
              size={'3x'} onClick = {( ) => inputRef.current.click( )}/>    
                 </Skeleton> </div>)}
        { (['signup','login'].includes(part)) && 
        <div>
        <Position position={'relative'}>    
        <CustomPosition position={'absolute'} margin={'0em'}
        sm_margin = {'2em 3.8em'} index={'1'} top = {'7em'} left = {'15.5em'}
        sm_top = {'3em'} sm_left = {'8em'}>
            <Text size={'1em'} sm_size={'0.5em'} sm_weight={'500'}>
            Welcome to Towny!
            </Text>
            <Text size={'0.5em'} sm_size={'0.2em'} weight={'400'}
            sm_weight={'300'}>
            {part==='signup'?`Create your account 
            & rejoice`:`Let's make a booking`}
            </Text>
            </CustomPosition>
        <AccountImage src="images/SignUp.png"/>
        </Position>
        </div>}
        {
            part === 'dashboard-signout' && <div>
              <CardImage src="images/logout.png"
              width={'100%'} height={'400px'}/>  
            </div>
        }

        {
            part === 'booking-page-payment' && <div>
            <CardImage src={'../images/09.png'}
            width={'100%'}
            height={'20%'}
            />  
          </div>
        }
        {part ==='userpage' && (image && !!image.length ? 
               <Avatar alt="Remy Sharp" src={image} className={classes.image} />:
              <div className={classes.CustomerSkeleton}>
              <input type="file" 
                     style = {{display : "none"}}
                    // onChange = {( e ) => imageHandler( e )}
                     ref={(inputFile) => inputRef.current = inputFile}/>
               <Skeleton variant="circle" width={120} height={120} style={{
                   textAlign : 'center'
               }}>
               <FontAwesomeIcon icon={faCamera} 
              style = {{cursor : "pointer", color:"#272727",
              margin : "1.3em"}}
              size={'2x'} onClick = {( ) => inputRef.current.click( )}/>    
                 </Skeleton> </div>)}         
    </Fragment>)
}
