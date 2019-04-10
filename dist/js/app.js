$(document).ready(function(){

    $('.serchBtn').on('click',function(){
        $(this).toggleClass('open');
        if($(this).hasClass('open')){
            $('.close').fadeIn();
            $('.searchContainer').animate({'top':$('.nav').height()},1000,function(){
               // $('.close').fadeIn();
            });
            
        }
        else{
            $('.close').fadeOut();
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
 
    $('.movbile-nav').click(function(){
		$(this).toggleClass('open');
    });
    
    // $window = $(window);
    // $('*[data-type="parallax"]').each(function(){

    //     var $bgobj = $(this);
       
    //     $(window).scroll(function() {
    //         var yPos = -($window.scrollTop() / $bgobj.data('speed'));
    //         var coords = '0px '+ -yPos + 'px';
    //         $bgobj.css({ backgroundPosition: coords });
            
    //     });
    // });
});