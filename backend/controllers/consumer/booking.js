const Booking = require('../../models/Booking');
const Category = require('../../models/Category');
const Worker = require('../../models/Worker');
const Available = require('../../models/Available');
Booking.belongsTo(Category,{foreignKey : 'service_id'});
Category.hasMany(Booking,{foreignKey : 'service_id'});
function controller(){
  //create a booking
  this.create = async ( req, res) => {
    let { customer_id } = req.params;  
    let { service_id, services,
        status = 'Pending', balance = 0.0 } = req.body;
        console.log(customer_id, service_id, services, balance);
      if(!!customer_id && !!services.length ){
          try{
           let data = await Booking.create(
               {customer_id, service_id, services, 
                status, balance});
             if(data){
                res.json({
                    status : true,
                    data,
                    message : "booking created successfully"
                })
             }   
          }
          catch(error){
                res.json({error, status : false})
          }
      }
      else{
        res.json({
            status : false,
            message : "No data"
        })
    }
  }
  //to get customer all booking records
  this.getInfo = async( req, res ) => {
      let { customer_id } = req.params;
      if(!!customer_id){
          try{
          let data = await Booking.findAll({ where : { customer_id }, include : Category});
             if(data){
                 res.json({
                     status : true,
                     data
                 })
             }    
          }
          catch(error){
              res.json({error, status : false});
          }
      }
      else{
          res.json({
              status : false,
              message : "No data"
          })
      }
  }
  //get the response of booking
  this.getBooking = async( req, res) => {
      let { bookingId : id } = req.body;
      let data = await Booking.findByPk(id);
      if(!!data){
        res.json({
            status : true, data 
        })
      }
  }
  //to assign a worker to booking
  this.assign = async( req, res ) => {
      let { bookingId : id  } = req.params;
      let { worker_id } = res.locals;
      if( !!id && !!worker_id){
            try{
            let data = await Booking.update({worker_id,
            status : 'Accept' },{where : {id}, 
            returning: true});
            if(!!data){
                res.json({
                    status : true,
                    data
                })
            }
            res.json({
                status : false,
                message : 'Worker not available'
            })
        }
        catch(error){
            res.json({status : false, error})
        }
      } 
  }
  // to cancel the booking
  this.cancel = async( req, res ) => {
      let { bookingId : id } = req.params;
      if(id){
         let data = await Booking.destroy({where : { id }});
         if(data){
             res.json({
                status : true, 
                data,
                message : "Booking cancelled"
             })
         }
      }
      else{
        res.json({
            status : false,
            message : "No data"
        })
    }
  }
  //gather available worker for assigning
  this.gather = async( req, res, next ) => {
    let { bookingId : id } = req.params;
    try{
      let booking = await Booking.findByPk(id,{include : Category});
        if(booking){
            let requiredWorkers = await Available.findAll({
                where : { domain : booking.Category.category,
                          status : 'FREE'}});
            if(requiredWorkers.length>0){
                requiredWorkers.map( async({id, worker_id, status, ...value}) => {
                    if(status!=='BUSY'){
                        res.locals.worker_id = worker_id;
                        let update = await Available.update({ status : 'BUSY'}, {
                            where : {
                                id
                            }
                        })
                        next()
                    }
                })
            }
            res.json({
                status : false,
                message : 'Worker not available'
            })
        }
        res.json({
            status : false,
            message : 'Booking not found'
        })
    }   
    catch(error){
      res.json({
          error,
          status : false
      })
    }     
  }
  //gather all bookings irrespective of customer id
  this.gatherAll = async(req,res)=>{
      let data = await Booking.findAndCountAll();
      if(data){
          res.json({
              data
          })
      }
  }
  //checker the availability of worker
  this.check = async(req,res,next) => {
      let {domain} = req.params;
      let check = await Available.findAll({
          where : {
              domain, 
              status : 'FREE'
          }
      })
      if(check.length>0){
        next();
      }
      res.json({
          status : false,
          message : 'Worker not available'
      })
  }
//   this.related = async( req, res ) => {
//       let {domain} = req.params;
//       if(domain){
//           let data = await Booking.findAll()
//       }
//   }
}
  
module.exports = new controller();

