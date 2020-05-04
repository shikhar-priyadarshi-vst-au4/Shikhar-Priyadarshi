Task to do -

worker dashboard page -

1) Profile option - done
2) Account Settings - in process
3) Tickets - in proceess
4) Services 
5) History

customer dashboard page -

1) Profile options
2) Bookings
3) History 

booking page -

select a service from homepage

1) Services - regular, premuim, gold
2) billing layout
3) ticket send to all related worker profile ( hair styler, carpenter, electricians, plumber, cleaner) 





//in class state transformations ->
// setFilter(val){
//   this.setState({filtered : val, addedServices : [], serviceId : "",
//  balance : 0, charges : 0, finalamount : 0});

// }
// addService(index){
//   let filteredState = this.state.filtered;
//   let addedServices = this.state.addedServices;
//   if(!addedServices.includes(filteredState.services[index])){
//    addedServices = [...addedServices, filteredState.services[index]];
//    let balance =  addedServices.reduce((acc, curr) => {
//             acc+=curr.price;
//             return acc;
//    },0)
//    let charges = 0.05*balance;
//    let finalamount = balance + charges;
//     this.setState({
//      ...{ addedServices },
//      serviceId : filteredState.id,
//      ...{balance}, ...{charges},
//      ...{finalamount}
//    })
//   }
// }
//  removeService(serviceName){
//      let { addedServices, balance, 
//           charges, finalamount } = this.state;
     
//      if(addedServices.length>0){
//        addedServices.map(({service, price}) => {
//          if(service === serviceName.service){
//            balance = balance - price;
//            charges = balance*0.05;
//            finalamount = balance + charges;
//            this.setState({...{balance},...{charges},...{finalamount}});              
//          }
//          return ;
//        })
//        addedServices = addedServices?.filter(({service}) => service !== serviceName.service );
//        this.setState({...{addedServices}})
//      }
// }    
// confirmBooking(value){
//     console.log('Confirm Booking');
// }
