$(document).ready(function(){
    $('.logout').on('click',function(){
        console.log('logout clicked');
        $.post('/logout')
    })
    $('.btn-light').on('click',function(){
        console.log("menu");
        window.location.href="/menu";
    })
   var i=0;
    setInterval(()=>{
       var array=["paneer","aloo","bindi","banana","loki"];
       $('.flasher').html("<div class='text-center card card-body w-50 display-4 bg-secondary'>"+array[i++]+"</div>");
       
       if(i==array.length){
           i=0;
       }
    },1000)


})