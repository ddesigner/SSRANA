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


});