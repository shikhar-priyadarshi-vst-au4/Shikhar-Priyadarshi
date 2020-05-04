const Available = require('../../models/Available');
const Worker = require('../../models/Worker');


function controller () {
  this.Available = async ( req, res, next )=>{
      try {
         let workers = await Worker.findAll();
         if(workers){
            workers.map( async ( value ) => {
                    let {id : worker_id,
                         specialisation : domain} = value;
                    let upload = await Available.findOrCreate(
                        {
                            where : { domain, worker_id, 
                                status : 'FREE' }
                        }
                    )
            })
          next(); 
        }
      }
      catch(error){
        throw new Error(`Server Failed - ${error.message}`);
      }
  }
}

module.exports = new controller();