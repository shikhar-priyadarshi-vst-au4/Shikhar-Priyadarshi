$(document).ready(function(){
    var count=0;
    $('.fas').on('click',function(){
        $(this).toggleClass("text-warning");
         var clicked=$(this).attr('class');
         
        if(clicked.includes("text-warning"))
         {   clicked=clicked.split(' ');
             console.log(true, clicked);
             count++;
         }
         else{
           count--;
         }

         
        })
    
    
    
    
    
    
    $('.btn-warning').on('click',function(){
        var username=$('input[name="username"]').val();
        var text=$('textarea[name="text"]').val();
        var press=count;
        console.log(username,text,count);
        $.post('/feedback/report/database',{
            username:username,
            text:text,
            star:press
        },function(){
            console.log("Proceed");
        });
    })
    
    
})