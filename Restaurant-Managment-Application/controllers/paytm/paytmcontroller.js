var checksum=require('./checksum');
module.exports={
    getRequest:(req,res)=>{
        res.render('paytm',{
            value:Math.random()+"SD",
            CSSlink:'./../../public/stylesheet/booking.css'
        });
    },
    request: (req,res)=>{
        var paramlist=req.body;
        var paramarray=new Array();
        console.log(paramlist);
        console.log(typeof paramlist);
        for(var name in paramlist){
            if(name==="PAYTM_MERCHANT_KEY")
            {    
                var PAYTM_MERCHANT_KEY=paramlist[name];
                console.log(PAYTM_MERCHANT_KEY);
            }
            else{
                paramarray[name]=paramlist[name];
               
            }
        }
        console.log(paramarray);//array treated as an object.
     paramarray['CALLBACK_URL']="https://flavor-restaurant-management.herokuapp.com/paymentgate/paytm/response";
     checksum.genchecksum(paramarray,PAYTM_MERCHANT_KEY,function(err,result){
         console.error(err);
         res.render("paytmstatus",
             result
         );
     })
    },
    response:(req,res)=>{
        var data=req.body;
        console.log("Request in response",req.body);
        console.log("success"+data.RESPCODE);
        Promise.resolve(
            require('./../../models/order').findOneAndUpdate(
                {orderId:data.ORDERID},
                {paymentStatus:data.STATUS},{new:true},
                (error,doc)=>{
                    if(!error){
                        console.log(error);
                    }
                    else{
                        console.log(doc);
                    }
                }
            )
        ).then(()=>{
            if(Number(data.RESPCODE)===01){
                res.render('response',{
                    result:data
                });
            }
            else{
                res.send(
                 " Transaction Failure."   
                )
            }
    
        })
                
    }
}