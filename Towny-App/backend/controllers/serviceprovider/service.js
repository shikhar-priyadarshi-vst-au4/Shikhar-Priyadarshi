const Category = require('../../models/Category');
const Service = require('../../models/Service');

Service.belongsTo(Category,{foreignKey : 'category_id'});


function serviceController() {
    this.inject = async ( req, res ) => {
        let {  category , services } = req.body;
            if( !!category && !!services ){
               try{
                  
                let data = await Category.create({ 
                                category, 
                                services });
                  if(data){
                      res.status(200).json({
                        data     
                      });
                  }
               }catch(error){
                   res.status(500).json({
                       error
                   })
               }
                }
            else{
                res.status(400).json({
                    status : false,
                    msg : "Validation Error! Some data is empty"
                })
            }         
    }
    this.render = async( req, res ) => {
        let { category } = req.query;
        let data;
        if(!!category){
            try{
                switch (category.toUpperCase()) {
                    case 'ALL':
                         data = await Category.findAll();
                         break;                              
                    default:
                          data = await Category.findOne( { where : { category } } );
                        break;
                }
                if(data){
                    res.json({
                        status : true,
                        data
                    });
            }
        }
            catch(error){
                res.json({
                    error
                })
            }
        }
        else{
            res.json({
                status : false,
                msg : "No data"
            })
        }
        
    }
    this.register = async (req, res) => {
        let { profile_id, category_id } = req.body;
        if(!!profile_id && !!category_id){
            try{
          
                let data = await Service.findOrCreate({
                   where:{ profile_id,
                    category_id},
                    include : [{
                        model : Category
                    }]
                });
                  if(data){
                      res.status(200).json({
                          data
                      })
                  }
               }catch(error){
                   res.status(500).json({
                       error
                   })
               }        
              
        }
        else{
            res.json({
                status : false,
                msg : "No data"
            })
        }

    }
    
}

module.exports =  new serviceController();
