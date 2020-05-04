import React, { Component } from 'react';
import { withStyles, Grid, Typography, Paper,
        Chip } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux'
//import UserSvg from './UserSvg';
import { KeyStroke } from '../General/index'
import { mapStateToProps } from '../StateTransition';
import { Logo } from '../Navbar/logo';
import { Name, BrandName } from '../Navbar/Styled';
import { Link } from 'react-router-dom';
import { Image } from '../General/index'
import { Flex } from '../Styled/Styled';
import { customerBookings } from '../../Actions/customer';
const styles = (theme) => ({
   BrandName : {
       padding : '1em'
   },
   paper : {
       margin : theme.spacing(3)
   },
   details : {
       margin : '1em 2em',
       letterSpacing : '0.1em'
   },
   image : {
       padding : theme.spacing(1),
   },
   services : {
       padding : theme.spacing(1)
   }, 
   heading :{
    margin : '0.5em'
   },
   body : {
       margin : '0em 1.6em',
   }
})
 class User extends Component {
    constructor(props){
      super(props);
      this.state={
          edit : false
      }
      this.editHandler = this.editHandler.bind(this);
    }
    componentDidMount(){
        if(!!this.props.customerData){
            this.props.dispatch(customerBookings(this.props.customerData.id));
         }   
    }
    componentDidUpdate(){
     if(!this.props.bookings.length && !!this.props.customerData){
        this.props.dispatch(customerBookings(this.props.customerData.id));
     }
    }
    editHandler(){
       this.setState({...this.state, edit : true})
    }
    
    render() {
        
        let {classes, customerData : {
          name : Fullname, image, mobileNumber : Contact, email : Email, 
          area : Area  
        }} = this.props;
        
        let details = { Fullname, Contact, Email, Area };
        
        details = Object.entries(details);
        
        return (
              
            <div className={classes.topContainer}>    
            <Grid container className={classes.container}> 
               
                    <Grid item xs={12} className={classes.BrandName}>
                    <BrandName as={Link} to={'/'} style={{textDecoration : "none", color:'#e40475'}}>
                    <Logo/>
                    <Name>Towny</Name>
                    </BrandName>
                    </Grid>

                    <Grid item xs={12} >
                    <Paper  variant={'elevation'} elevation={2}
                    className={classes.paper}>
                      <Grid container>
                      <Paper component={Grid} item xs={12} 
                      className={classes.image}
                      variant={'outlined'}>
                          <Flex justifyContent={'flex-end'}>
                          <KeyStroke part={'userpage-signout-button'}/>    
                          <KeyStroke part={'userpage-button'}/>
                          </Flex>
                          <Grid container>
                              <Grid item xs={4}>
                              <Image part={'userpage'} />
                              </Grid>
                              <Grid item xs={8}>
                                 <Grid item xs={8}>
                                     Services<hr/>
                                 </Grid>
                                 <Grid item xs={8}>
                                 <Paper container component={Grid} className={classes.services} variant={'outlined'}>
                                  {this.props.services.map(({category, id}) => <Grid item xs={3} key={id}>
                                      <KeyStroke part={'userpage-service-button'} 
                                      {...{category}} {...{id}} />
                                  </Grid>)}
                                  </Paper>
                                  </Grid>
                              </Grid>
                          </Grid>
                          
                          <Typography variant={'h6'} className={classes.paper}>
                              Welcome to Towny
                          </Typography>
                      </Paper>
                      </Grid>
                      <Grid container>
                      
                      <Paper component={Grid} item xs={5} className={classes.paper} variant={'outlined'}>
                      <Typography variant={'button'} component={Grid} item
                      color={'secondary'} className={classes.heading}
                     xs={5}>Profile Details</Typography><hr/>
                     
                      {details?.map((val, index) => 
                     <Grid container key={index}>
                     <Grid container>
                     <Typography 
                     component={Grid} item xs={1} variant={'button'}
                     className={classes.details}>{val[0]}</Typography>
                      
                      <Typography 
                      component={Grid} item xs={4}
                      className={classes.details}>{val[1]}</Typography>
                      </Grid>
                      </Grid>
                      )
                    }

                      </Paper>
                      <Paper component={Grid} item xs={6} className={classes.paper} variant={'outlined'}>
                          <Typography  variant={'button'} className={classes.heading} 
                          component={Grid} xs={6} item color={'secondary'}>
                              Booking Information 
                          </Typography><hr/>
                          {this.props.bookings.map(val => <Paper key={val.id} component={Grid} 
                          className={classes.paper} xs={6} item variant={'outlined'}>
                            <Grid container>
                                <Typography component={Grid} item xs={4} 
                                className={classes.heading}
                                variant="button">Booking Id</Typography>
                                <Typography component={Grid} item xs={2} 
                                className={classes.heading}
                                variant="button">{val.id.slice(0,val.id.indexOf('-'))}</Typography>
                            </Grid>
                            <Grid container>
                                <Chip label={`${val.status}`}
                                className={classes.body} size={'small'}
                                variant="outlined" color={`${val.status==='Pending'?'secondary':
                                'primary'}`} />
                                <Typography variant="body2" className={classes.body}
                                component={Grid} item xs={2}>{val.Category.category}</Typography>
                                <Typography variant="body2" className={classes.body}
                                component={Grid} item xs={2}>&#8377;{val.balance}</Typography>
                          </Grid>
                          </Paper>)}
                         </Paper>
                      </Grid>
                      
                    </Paper>
                  
            </Grid>
            </Grid>
            </div>
            
        )
    }
}

export default compose(connect(mapStateToProps),withStyles(styles))(User);


                            