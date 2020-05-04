$(document).ready(function(){
    $('.bookingcard').hide();
    $('.btn-outline-secondary').on('click',function(){
        console.log('Pay is clicked');
        window.location.href='/paymentgate/paytm/request';
    })
    $('.col').on('click',function(){
        if($(this).css("background-color")!="rgb(247, 136, 136)")
          {
            $('.bookingcard').show().css({
                "display":"flex",
                "justify-content":"center",
                "align-item":"center",
                "margin-top":"5%",
                

            });
            console.log($(this).text());
            $('input:eq(1)').val($(this).text());            
          }

    })
    $('.mini-container').hide();
    $('input:eq(4)').on('click',function(){
        $('.mini-container').show();
        
    });
    $('.btn-dark').on('click',()=>{
        var customer_name=$('input[name=Customer_name]').val();
        var table_number=$('input[name=Table_number]').val();
        $('.alert').remove();
        $.post('/checkuserbooking',{
            customer_name:customer_name,
            table_number:table_number
        },function(status){
            console.log(status);
            if(status.length>0){
                console.log(status[0].tableNumber);
                $('input[name=Table_number]').val(status[0].tableNumber);
                $('<div class="alert alert-success  w-50" role="alert">'+"You already booked"+" "+status[0].tableNumber
                +". Resetting to "+status[0].tableNumber+", proceed now."+"</div>").prependTo('.message');
                $('.bookingcard').hide();
                setTimeout(()=>{window.location.href="/menu";},2000);
            }
            else{
                $('.bookingcard').hide();
                window.location.href="/menu";
            }
            
        })
        
        })
    $('.leftarrow').on('click',()=>{
        console.log($(this));
        $.get('/booking/details',{
           notclicked:true
        },function(){
            console.log("done");
        })
    })
    $('.rightarrow').on('click',()=>{
        console.log($(this));
        $.get('/booking/details',{
            notclicked:false
         },function(){
             console.log("done");
         })
    })
    
    $('.signout').on('click',function(){
        console.log("Signout clicked");
        $.post('/logout',function(data){
            console.log('Helloworld');
            window.location.href='/logout';
        });
    })

    /*Signout=()=>{
        console.log("signout clicked");
        $.post('/logout',function(data){
            console.log('Helloworld');
            window.location.href='/userlogout';
        });
    }*/
    
})