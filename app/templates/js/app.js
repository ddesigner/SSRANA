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


     $('.accordion ul li i').on('click',function(e){
      e.preventDefault();
      //  $(this).toggleClass('expanded');
        if($(this).hasClass('expanded')){
             $(this).removeClass('expanded');
             $(this).parent().next().slideUp();
         }
         else{
            $('.accordion ul li i').removeClass('expanded');
            $('.accordion ul li div').slideUp();
            $(this).addClass('expanded');
            $(this).parent().next().slideDown();
         }
        
      });

      $('.filter-btn').on('click',function(){
        $(this).toggleClass('open');
        if($(this).hasClass('open')){
            $('.filter').slideDown();
        }
        else{
            $('.filter').slideUp();
        }
    });
 

});