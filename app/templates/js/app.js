$(document).ready(function(){

    $('.serchBtn').on('click',function(){
        $(this).toggleClass('open');
        if($(this).hasClass('open')){
            $('.searchContainer').animate({'top':$('.nav').height()},1000);
        }
        else{
            $('.searchContainer').animate({'top':0},1000);
        }
    });

    $('.menu').on('click',function(){
        $(this).toggleClass('on');
     });


     $('.accordion ul li a').on('click',function(){
      
      //  $(this).toggleClass('expanded');
        if($(this).hasClass('expanded')){
             $(this).removeClass('expanded');
             $(this).next().slideUp();
         }
         else{
            $('.accordion ul li a').removeClass('expanded');
            $('.accordion ul li div').slideUp();
            $(this).addClass('expanded');
            $(this).next().slideDown();
         }
        
      });
 

});