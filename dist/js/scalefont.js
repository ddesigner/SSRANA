/* Copyright 2014 Georgia-Pacific LP All Rights Reserved 

ScaleRemFonts:
jQuery Plug-in to scale fonts based on REMs.  REM sizes scale based on the 
font-size of the HTML tag.
        
1) Assign a pixel sized font to the HTML tag.
    
2) Assign proportional "rem"-sized fonts to elements within the parent.
Those rem-sized fonts will scale relative to the HTML tag.

Optionally, you can pass in this object:
{
    Sizes : [1024, 960, 320], // Array of size breaks to be scaled against.  By default it will be read from the max-width of the "row" class.
    DefaultFontSize: 16 // FontSize to use as the basis for scaling. By default it will be read from the HTML tag.
}

*/

!function(e){var t="ScaleRemFonts",n=0,i=[],o=[1024,960,320],r=16,a={init:function(e){i=jQuery("html");var n=i.each(function(){{var n=jQuery(this);n.data(t)}"object"==typeof e&&("undefined"!=typeof e.Sizes&&(o=e.Sizes),"undefined"!=typeof e.DefaultFontSize&&(r=e.DefaultFontSize)),jQuery(this).data(t,{target:n})});return jQuery(window).bind("resize",a.adjustFontSizes),a.adjustFontSizes(),n},adjustFontSizes:function(){if(n>0)return i;n++;var t=i.each(function(t,n){var i=e(n),a=r,s=0;i.height()<jQuery(document).height()?(i.css({overflow:"hidden"}),s=i.width(),i.css({overflow:"auto"})):s=i.width();var u=s;a=i.attr("InitialFontSize"),("undefined"==typeof a||0===a.length)&&(a=i.css("font-size"),a=1*a.replace("px",""),i.attr("InitialFontSize",a));var f=a;if("undefined"!=typeof o&&o.length>0&&s<o[0])for(var d=o[0],c=1;c<=o.length;c++){if(_size=c<o.length?o[c]:0,d>=s&&s>_size){f=a/(d/s);break}d=_size}else u>s&&(f=a/(u/s));i.css("font-size",f)});return n--,t}};e.fn.ScaleRemFonts=function(t){return a[t]?a[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist on jQuery.ScaleRemFonts"):a.init.apply(this,arguments)}}(jQuery);