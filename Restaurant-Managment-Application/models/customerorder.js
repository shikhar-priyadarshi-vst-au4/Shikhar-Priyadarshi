const records=require('./../models/order');
const products=require('./../models/Product');
const users=require('./../models/User');
const booking=require('./../models/CreateBooking');
const feedback=require('./../models/feedback');
module.exports=function Records(){
   
   this.record=()=>{
     var array=[];  
    records.find({},(err,docs)=>{
        if(!err){
            //console.log("documents found=>",docs)
            array.push(docs);
           // console.log("array=>",array);
                
        }
        else{
          return err;
        }
        })
        return array;
   }
   this.product=()=>{
    var dishes=[];
    products.find({},(empty,items)=>{
       if(!empty){
         //console.log("items available=>",items);
         console.log("You're here inside in products");
         dishes.push(items);
         
           
        }
       else{
         return empty;
       }
       
     })
     console.log(dishes.length);
    return dishes;
    }
   this.user=()=>{
     var login=[];
     users.countDocuments({},(diminish,counts)=>{
      if(counts){
        login.push(counts);
        console.log("inside",login)
      }   
     })
     console.log("outside",login)
    return login;
    }
    this.booking=()=>{
      var number=[];
      booking.countDocuments({},(none,books)=>{
        if(books)
        {
          number.push(books);
        }
      })
      return number;
    }
    this.feedback=(username,text,press)=>{
     feedback.create({username:username,
                      feedback:text,
                      star:press},(flaw,outcome)=>{
                        if(outcome){
                          console.log(outcome);
                        }
                      })
    }
     this.fetch=()=>{
       var elements=[]
       feedback.find({},function(noresult,feedback){
        if(feedback){
          elements.push(feedback);
        } 
        
       })
      return elements;
      }
}