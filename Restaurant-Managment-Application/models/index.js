const mongoose=require('mongoose');
const booking=require('./CreateBooking');
const user=require('./User');
const Product=require('./Product');
const order=require('./order');
const feedback=require('./feedback');
function connect(){
    return mongoose.connect('mongodb+srv://Shikhar4223:qwerty21QA@cluster0-yo1gt.mongodb.net/restaurant_booking?retryWrites=true&w=majority',{
     useNewUrlParser:true   
    ,useUnifiedTopology:true
    });
}
var products= [new Product({
    imagePath:"https://i2.wp.com/www.vegrecipesofindia.com/wp-content/uploads/2013/04/paneer-butter-masala-fb.jpg" ,
    title: 'Paneer Butter Masala',
    description: 'Qty - 250 gm',
    price: 300
      
}),
new Product({
    imagePath:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSu7Ap3HsanOHThQqxLf9m5qvoi2_YcOb5yCWiWfCC3nzxNTGcm" ,
    title: 'Chiken Curry',
    description: 'Qty - 250 gm',
    price: 350
    
}),

new Product({
    imagePath:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSYSa4x8CAXWPAresUorDFJhwc2yJW6DwLN61PXWtJ9QXkBWWWn" ,
    title: 'Chapati Without Buttur',
    description: 'Per Piece',
    price: 15
      
}),

new Product({
    imagePath:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQzaNL6ES3bGNQEhL_ku5zNsLjJnVjvjHTHSF-YRE79lOLjQr77" ,
    title: 'Buttur Naan',
    description: 'Per Piece',
    price: 40
      
}),

new Product({
    imagePath:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTz3RlrBWACZlH0r3S465pO-6V10JPCbfhGVBg9dOmV6sMM87Ju" ,
    title: 'Cold Coffee',
    description: 'qty - 300ml',
    price: 120
      
}),

new Product({
    imagePath:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTB-5LxvECqC0CQiqgjrPUmM7Rab2xmX8PrzFK98wW29DWS0xxW" ,
    title: 'Strawberry Daiquiri Cocktail',
    description: 'Qty - 200ml',
    price: 220
      
}),
new Product({
    imagePath:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ-UtSA4hhREztMUakFGCgyHIR-nrwwJu4wu1i0OEpcTpYx_6Zt" ,
    title: 'Coffee',
    description: 'Qty - 200ml',
    price: 80
      
}),
new Product({
    imagePath:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSo0Febty0ma9xPjm2H1SprzBg2vX5UCj1FbPymVcbeoOflTGrg" ,
    title: 'Mango Mojito Mocktail ',
    description: 'Qty - 200ml',
    price: 200
      
}),
];
var done = 0;
for (var i=0; i<products.length; i++){
    products[i].save(function(err,result){
        done++;
        if(done === products.length){
            console.log('Products updated for frontend');
            products=[];           
        }
    });
}

module.exports={
    models:{
        booking:booking,
        user:user,
        product:Product,
        order:order,
        feedback:feedback
    },
    connect:connect
}