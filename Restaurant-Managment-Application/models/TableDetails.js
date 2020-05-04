const Table={};
const Promise=require('promise');
const booking=require('./CreateBooking');
const user=require('./User');
const product=require('./Product');
const tabledata=require('./tableexpansion');
var index=0;
var counter=0;
var vacantTab=0;
var vacant;
var available;
var Tab;
var Flag=0;
 data=[{
    "tableId":1,
    "reserved":false,
},{"tableId":2,
"reserved":false
},{
    "tableId":3,
    "reserved":false,
    },{
        "tableId":4,
        "reserved":false,
        },{
            "tableId":5,
            "reserved":false,
            },{
                "tableId":6,
                "reserved":false,
                },{"tableId":7,
            "reserved":false,
            },{
                "tableId":8,
                "reserved":false,
                },{
                    "tableId":9,
                    "reserved":false,
                    },{
                        "tableId":10,
                        "reserved":false,
                        },{
                            "tableId":11,
                            "reserved":false,
                        
                        },{"tableId":12,
                        "reserved":false,
                        },{
                            "tableId":13,
                            "reserved":false,
                            },{
                                "tableId":14,
                                "reserved":false,
                                },{
                                    "tableId":15,
                                    "reserved":false,
                                    },{
                                        "tableId":16,
                                        "reserved":false,
                                        
                                    },{"tableId":17,
                                    "reserved":false,
                                    },{
                                        "tableId":18,
                                        "reserved":false,
                                        },{
                                            "tableId":19,
                                            "reserved":false,
                                        },{
                                                "tableId":20,
                                                "reserved":false,
                                                }]
Table.switchindices=(indices,callbackfn)=>{
index=indices;
console.log(index);
return callbackfn(null,{status:true,
            message:"indcies is set"});
}

Table.tableMatrix=(number,indices,callbackfn)=>{
    index=indices;
    var matrix=new Array(Number(number));
    for(var i=0; i<matrix.length;i++)
    {
        matrix[i]={
            "tableId":i+1,
            "reserved":false
        }
    }

    tabledata.create({table:matrix,
     index:index
    },function(error,result){
      console.log(result);
      console.error(error);
      tabledata.countDocuments({},(error,count)=>{
          Flag=count;
          console.log("COUNT==>"+Flag);
        tabledata.find({index:index},(error,value)=>{
            Tab=value; 
            console.log(Tab);
         })
      })
    })   
 return callbackfn(null,matrix);
}
Table.retrieve=(callbackfn)=>{
    
      console.log("Table present in DB");
      Promise.resolve(()=>{tabledata.countDocuments({},(error,count)=>{
           Flag=count;
           console.log(count);
           return Flag;
      })}).then(tabledata.find({index:index},(error,value)=>{
          console.log(value,"here1");
          if(Flag!=0){
            Tab=value[0].table;

            console.log(Tab);
          }
          
     })).then(
            booking.find({},(error,result)=>{
                console.error(error,"here2");
                result.map((value,index)=>{
                    var pos=Number(value.tableNumber
                        .substring(value.tableNumber.indexOf('-')+1));
                        console.log(pos);
                         if(Flag>0){
                            console.log( Tab);  
                            Tab[pos-1].reserved=true;
                         }
                         else{
                            data[pos-1].reserved=true;
                         }
                        
                })
                if(Flag>0)
                {
                    return callbackfn(null,Tab);
                }
                else{
                    return callbackfn(null,data);
                }
            })
        )
      }

Table.createbooking=(username,tableNumber,bookingStatus,callbackfn)=>{
    console.log(username,tableNumber,bookingStatus);
    booking.create({username:username,
        tableNumber:tableNumber,
        bookingStatus:bookingStatus
    },function(err,result){
        if(err){
            return callbackfn({
                error:err.errors.username.path,
            })
            
        }
        else{
            return callbackfn(null,{
                status:true,
                response:result,
                message:"Booking is confirmed."
            })
        }
        
    }
             
         )
}


Table.product=(callbackfn)=>{
    product.find(function(err,docs){
        productChunks=[];
        chunkSize = 4;
        //console.log(docs);
        for (var i = 0; i<docs.length; i+= chunkSize){
         productChunks.push(docs.slice(i, i+ chunkSize));
         //console.log(productChunks+" "+i+","+(i+chunkSize));
         
        }
        //console.log(productChunks);
    return callbackfn(null,productChunks);
})
}

Table.adminbookingticket=(username,tableNumber,bookingStatus,callbackfn)=>{
    console.log(username,tableNumber,bookingStatus);
    if(Number(tableNumber.substring(tableNumber.indexOf("-")+1))>20)
    {
        data.push({ "tableId":Number(tableNumber.substring(tableNumber.indexOf("-")+1)),
        "reserved":false});
        
    }
    console.log(data);
      booking.create({username:username,
            tableNumber:tableNumber,
            bookingStatus:bookingStatus},(error,result)=>{
                console.log(error);
                if(error){
                   return callbackfn({
                       status:false,
                       message:error
                   })
                }
                else{
                     return callbackfn(null,{status:true,
                     message:result,
                    })
                }
            })
}

Table.bookingdetails=(callbackfn)=>{
    tabledata.countDocuments({},(error,count)=>{
        //console.log(count);
        Flag=count;
        console.log(Flag);
        if(count!=0)
        {
            tabledata.find({index:index},(error,table)=>{
                console.log(table);
              Tab=table[0].table
              console.log(Tab);
              booking.find({},(error,booking)=>{
                  console.log(booking);
                  Promise.resolve(booking.forEach((item,index)=>{
                       console.log(Tab[Number(item.tableNumber.substring(
                          item.tableNumber.indexOf('-')+1))-1]);                
                              Tab[Number(item.tableNumber.substring(item.tableNumber.indexOf('-')+1))-1].reserved=true;
                      })).then(
                      ()=>{
                       console.log(Tab);
                       console.log("hello"+index);
                       return callbackfn(null,{
                          status:true,
                          matrix:Tab,
                          message:booking
                      
                      });
                  
              })          
          })
      }) 
        }
        else{
            console.log("data=>",data);
            booking.find({},(error,booking)=>{
                console.log(booking);
                Promise.resolve(booking.forEach((item,index)=>{
                     console.log(data[Number(item.tableNumber.substring(
                        item.tableNumber.indexOf('-')+1))-1]);                
                            data[Number(item.tableNumber.substring(item.tableNumber.indexOf('-')+1))-1].reserved=true;
                    })).then(
                    ()=>{
                     console.log(data);
                     console.log("hello"+index);
                     return callbackfn(null,{
                        status:true,
                        matrix:data,
                        message:booking,
                        length:data.length
                    
                    });
                
            })          
        })






        }
       
})}
Table.addCart=(id,callbackfn)=>{
    console.log("Inside model=>"+id);
product.findById(id,(error,output)=>{
    if(!error){
       return callbackfn(null,output);
    }
    else{
        return callbackfn({
            status:false,
            message:"product not found"
        })
    }
})
}

Table.checkuser=(username,table,callbackfn)=>{
    console.log(username,table);
    booking.find({username:username},(error,result)=>{
        console.log("error",error);
        console.log("response",result);
        if(!error){
         return callbackfn(null,result);
     }
     else{
         return callbackfn(error);
     }
    })
}
module.exports=Table;