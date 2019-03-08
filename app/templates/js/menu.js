var cbpHorizontalMenu = (function() {

    var $listItems = $('#cbp-hrmenu > ul > li'),
        $menuItems = $listItems.children('a'),
        $body = $('body'),
        current = -1;

    function init() {
        $menuItems.on('click', open);
        $listItems.on('click', function(event) {
            event.stopPropagation();
        });
    }
  
    function open(event) {

        if (current !== -1) {
            $listItems.eq(current).removeClass('cbp-hropen');
        }

        var $item = $(event.currentTarget).parent('li'),
            idx = $item.index();

        if (current === idx) {
            $item.removeClass('cbp-hropen');
            current = -1;
        } else {
            var left =$item.offset().left;
            var top =$('.nav').outerHeight(true);
            var height =$(window).height();
              $item.find('.cbp-hrsub').css({'width':$(window).width(), 'left':-left, 'top':top, 'max-height':height-top});
            $item.addClass('cbp-hropen');
            
            current = idx;
            $body.off('click').on('click', close);
        }

        return false;

    }

    function close(event) {
        $listItems.eq(current).removeClass('cbp-hropen');
        current = -1;
    }

    return {
        init: init
    };

})();

$(window).scroll(function(){
	var sticky = $('.nav'),
		scroll = $(window).scrollTop();
  
	if (scroll >= $('.nav').outerHeight(true)){
		sticky.addClass('fixedHeader');
	 
	}
	else sticky.removeClass('fixedHeader');
  });