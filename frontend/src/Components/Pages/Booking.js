import React, { Component, Fragment } from 'react';
import { Grid, withStyles } from "@material-ui/core";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { mapStateToProps } from '../StateTransition';
import { List } from '../General/index'
import  Navbar  from '../Navbar/Navbar'
import { FilterServices, AddServices,
         RemoveServices, ConfirmBooking } from '../../Actions/booking'
const styles = (theme) => ({
  root : {
    margin : '4em 0em',  
  },
  item : {
     margin : '0em 1em'
  }
})




class Booking extends Component {
    constructor(props){
      super(props)
      this.revertFilter=this.revertFilter.bind(this);
      this.setFilter=this.setFilter.bind(this);
      this.addService = this.addService.bind(this);
      this.removeService = this.removeService.bind(this);
      this.confirmBooking = this.confirmBooking.bind(this);
    }
    componentDidMount(){
      if(this.props.services.length>0){
         this.revertFilter();
      }
    }
    componentDidUpdate(prevProps){
      if(this.props.services!==prevProps.services){
        this.revertFilter();
      }
    }
     revertFilter(){
      let { match : {
        params : { serviceId : id }
      }, services} = this.props;
      let value = services.find(val => val.id === id);
      console.log(value);
      this.props.dispatch(FilterServices(value)) 
    }
     setFilter(){
       this.revertFilter();
       //this.props.dispatch(FilterServices(val));
     }
     addService(index){
       this.props.dispatch(AddServices(index));
     }
      removeService(serviceName){
       this.props.dispatch(RemoveServices(serviceName));   
     }    
     confirmBooking(){
      let { customerData : { id : customer_id }, serviceId : service_id,
        addedServices: services, finalamount : balance } = this.props;
        let value = {customer_id, service_id, services, balance }
        this.props.dispatch(ConfirmBooking(value));          
      }
    render() {
        const {classes} = this.props;
        console.log(this.props.match.params);
        return (
            <Fragment>
              <Navbar 
              mainBar={[{ navLinkName : "Login", path : '/login'},{ navLinkName : "Create Account", path : '/signup'}]} 
                    top={'0em'} radius={'0em'} />
             <Grid container className={classes.root}>
                      <Grid item className={classes.item} xs={2}>
                      <List part={'booking-page-services'} categories={
                        this.props.services
                      }
                      setFilter={this.setFilter} {...this.props}/>
                      </Grid>
                      <Grid item className={classes.item} xs={5}>
                      <List part={'booking-page-services-category'}
                      addService={this.addService}
                      removeService={this.removeService}
                      {...this.props}/>
                      </Grid>
                      <Grid item className={classes.item} xs={4}>
                      <List part={'booking-page-payment'} {...this.props} confirmBooking={this.confirmBooking}/>
                      </Grid>
                 </Grid>             
                    
            </Fragment>
        )
    }
}

export default compose(connect(mapStateToProps),withStyles(styles))(Booking);

































