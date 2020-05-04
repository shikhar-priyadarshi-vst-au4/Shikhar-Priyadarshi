const Feedback = require('../../models/Feedback');
const Worker = require('../../models/Worker');

Feedback.belongsTo(Worker,{foreignKey : 'profile_id'});

function controller() {
   this.feedback = async ( req, res) => {
     let {profile_id} = req.params;  
     let { feedback, rating } = req.body;
       try{
        if(!!profile_id && !!feedback && !!rating){
            let data = await Feedback.findOrCreate({
                where : { profile_id, feedback, rating },
                include : [{
                 model : Worker
                }]
            })
            if(data){
                res.json({
                    status : true,
                    data
                })
            }
        }
        else{
            res.json({
                status : false,
                message : 'Incomplete data'
            })
        }
    }
    catch(error){
        res.json({
            status : false,
            error
        })
    }
 }
       
}

module.exports = new controller();