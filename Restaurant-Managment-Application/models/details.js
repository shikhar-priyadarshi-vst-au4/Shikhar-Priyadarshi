var order=require('./order');
module.exports=function details(username,tablenumber,cart,paymentstatus)
{
    this.username=username;
    this.tablenumber=tablenumber;
    this.cart=cart;
    this.paymentstatus=paymentstatus;
    this.orderId=cart.orderId;
    this.items=cart.items;
    this.totalquantity=cart.totalQty;
    this.totalamount=cart.totalPrice;
    this.storedetails=()=>{
        order.create({username:this.username,
            orderId:this.orderId,
            bookingtable:this.tablenumber,
            items:this.items,
            paymentStatus:this.paymentstatus},
            (error,result)=>{
                console.log(error,result);
            })
    }
    
}
