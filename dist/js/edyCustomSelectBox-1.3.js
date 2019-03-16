/* * *****************************************************************************
 *                JQUERY CODE FOR CUSTOM SELECT BOX 
 * ******************************************************************************
 *      Author:     Nitesh Kumar Verma
 *      Email:      nitesh.verma@edynamic.net
 *      Website:    http://www.edynamic.net
 * 		Date Created 10 Oct 2014
 *      File:       edyCustomSelectBox-1.3.js
 *      Version:    1.3
 * ******************************************************************************
 *  VERION HISTORY:
 *                  NONE
 *
 * ******************************************************************************
 *  DESCRIPTION:
 *      This is a complete core jQuery code for Custom Select Box
 * ******************************************************************************
 * EXAMPLE USAGE
 *		$('#ID').edyCustomSelectBox();
 *		$('.class').edyCustomSelectBox();
 *      $('select').edyCustomSelectBox();
 *		
 * ******************************************************************************
 * Fix LOG
 *		Fix tabindex problem
 *		Fix default value problem
 * 
 * *******************************************************************************/
$.fn.edyCustomSelectBox = function (options) {
    var defaults = {};
    var settings = $.extend({}, defaults, options);
    var keyinterval;
    var currindex = -1;
    var zindexno = 8;
    $(this).each(function (i) {
       // debugger;
        var selid = $(this).attr("id");
        var tabindex = ($(this).attr("tabindex") != undefined) ? $(this).attr("tabindex") : 0;
        //$(this).find("option").removeAttr("selected");
        //$(this).find("option:selected").attr("selected", "selected");

        if (typeof ($(this).find("option:selected").attr("selected")) == "undefined") {
            $(this).find("option:eq(0)").attr("selected", "selected");
        }


        //var defaultValue = $(this).find("option:selected").text();


        //if ($(this).find("option:selected").size() == 0) {
        //    defaultValue = $(this).find("option").eq(0).text()
        //    $(this).find("option").eq(0).attr("selected", "selected")
        //}

        var ultext = '<div class="stylish-select select" id="ul' + selid + '">';
        ultext += '<div class="stylish-select-left" tabindex="' + tabindex + '" data-filter=""><div class="stylish-select-right styledSelect">' + $(this).find("option:selected").text() + '</div></div>';
        ultext += '<ul class="listing">';
        $(this).find("option").each(function () {
            if ($(this).attr("selected") == "selected") {
                ultext += "<li data='" + $(this).val() + "' tabindex='0' class='selected'>" + $(this).text() + "</li>";
            } else {
                ultext += "<li data='" + $(this).val() + "' tabindex='0'>" + $(this).text() + "</li>";
            }
        });
        ultext += '</ul>';
        ultext += '</div>';

        $(this).hide();
        $(this).wrap('<div class="main" style="z-index:' + zindexno + '">');
        $(this).after(ultext);
        zindexno--;
    });



    $(document).unbind("click").on("click", ".stylish-select-left", function (e) {
		 
		   //Set Select box position
			/* var listPosition = parseInt($(this).offset().top);
			var scrollPosition = parseInt($(window).scrollTop());
			var listHeight = parseInt($(this).next().outerHeight());
			var viewport = parseInt($(window).height());
		    var selectBoxHeight= parseInt($(this).height());
			topToBottom = (listPosition + listHeight <= viewport + scrollPosition);
			prevZindex = parseInt($(this).parents().closest('.main').css('z-index'));
		 	bottomReached = !topToBottom;
			if (!bottomReached) {
				 
			 }
            else{
			   $(this).next().css({"top":-(listHeight)});
			 
		 	} */
		
		//Set Select box position end
		
		$(".stylish-select-left").not(this).parents(".stylish-select").find(".listing").hide();
		$(".stylish-select-left").not(this).removeClass('open');
		$('.main').removeClass('select-active');
        e.stopPropagation();
		 
       
		
		$(this).toggleClass('open');
        $(this).next().stop(true,true).toggle();
        if ($(this).next().is(":visible")) {
            $(this).next().find("li.selected").focus();
            $(this).closest('.main').addClass('select-active');
		
        } else {
            $(this).focus();
            $(this).closest('.main').removeClass('select-active');
		
        }

    });
   /*  $(document).on("focusout", ".stylish-select-left", function (e) {
        $(this).parents(".stylish-select").prev().trigger("change");
    }); */

    $(document).on("click", ".listing li", function (e) {
		$(this).parents(".stylish-select").find(".stylish-select-right").parent().removeClass('open')
		$(this).parents(".stylish-select").closest('.main').removeClass('select-active');
        $(this).parent().find("li.selected").removeClass("selected");
        $(this).focus().addClass("selected")

        $(this).parents(".stylish-select").find(".stylish-select-right").text($(this).text());

        $(this).parents(".stylish-select").prev().val($(this).attr("data"));
        $(".stylish-select-left").removeClass('active');
        $(this).parents(".stylish-select").find(".stylish-select-left").focus();
        e.preventDefault();
        $(this).parent().hide();
        $(this).parents(".stylish-select").prev().trigger("change");
    });



    $(document).on("keydown", ".stylish-select-left", function (e) {
        
        if (e.keyCode == "13") {
            $(this).next().show();
            $(this).next().find("li.selected").focus();
            e.preventDefault();

        } else if (e.keyCode == "38") {
            if ($(this).next().find("li.selected").prev().size() > 0) {
                $(this).next().find("li.selected").removeClass("selected").prev().focus().addClass("selected");
                $(this).find(".stylish-select-right").text($(this).next().find("li.selected").text());
                $(this).parents(".stylish-select").prev().val($(this).next().find("li.selected").attr("data"));
            }
            e.preventDefault();
        } else if (e.keyCode == "40") {
            if ($(this).next().find("li.selected").next().size() > 0) {
                $(this).next().find("li.selected").removeClass("selected").next().focus().addClass("selected");
                $(this).find(".stylish-select-right").text($(this).next().find("li.selected").text());
                $(this).parents(".stylish-select").prev().val($(this).next().find("li.selected").attr("data"));
            }
            e.preventDefault();

        } else if (e.keyCode > 47 && e.keyCode < 91) {
            clearInterval(keyinterval);
            if ($(this).attr("data-filter") != String.fromCharCode(e.which))
                $(this).attr("data-filter", $(this).attr("data-filter") + "" + String.fromCharCode(e.which));

            var currentval = $(this).find(".stylish-select-right").text();
            if (currentval == "") currentval = "-1";
            if ($(this).next().find("li:not('.selected'):containsIN('" + $(this).attr("data-filter") + "')").size() > 0) {
                $(this).next().find("li").removeClass("selected");
                var nextli = $(this).next().find("li:containsIN('" + $(this).attr("data-filter") + "')");
                currindex++;
                if (currindex > nextli.size() - 1) {
                    currindex = -1;
                }
                nextli.eq(currindex).addClass("selected");

                $(this).find(".stylish-select-right").text($(this).next().find("li.selected").text());
                $(this).parents(".stylish-select").prev().val($(this).next().find("li.selected").attr("data"));
            }

            keyinterval = setInterval(function () { clearDataFilter(); }, 300);
        } else if (e.keyCode == 16 || e.keyCode == 9 || e.keyCode == 27) {

        } else {
            e.preventDefault();
        }

    });

    $.extend($.expr[':'], {
        focusable: function (element) {
            var nodeName = element.nodeName.toLowerCase(),
                tabIndex = $.attr(element, 'tabindex');
            return (/input|select|textarea|button|object/.test(nodeName)
                ? !element.disabled
                : 'a' == nodeName || 'area' == nodeName
                    ? element.href || !isNaN(tabIndex)
                    : !isNaN(tabIndex))
                // the element and all of its ancestors must be visible
                // the browser may report that the area is hidden
                && !$(element)['area' == nodeName ? 'parents' : 'closest'](':hidden').length;
        }
    });
    var focusables = $(":focusable");


    $(document).on("keydown", ".stylish-select li", function (e) {
        if (e.keyCode == "13" || e.keyCode == 9) {
			  $(this).parents(".stylish-select").find(".stylish-select-right").text($(this).text());
            $(this).parents(".stylish-select").prev().val($(this).attr("data"));
            $(".stylish-select-left").removeClass('active');
            $(this).parents(".stylish-select").find(".stylish-select-left").focusout();
            var current = focusables.index($(this).parents(".stylish-select").find(".stylish-select-left")),
            next = focusables.eq(current + 1).length ? focusables.eq(current + 1) : focusables.eq(0);
            if (next.css("display") == "none") {
                next = focusables.eq(current + 1).length ? focusables.eq(current + 1) : focusables.eq(0);
            }
            next.focus();
            e.preventDefault();
            $(this).parent().hide();
			 
        }
        else if (e.keyCode == "38") {
		    if ($(this).removeClass("selected").prev().size() > 0) {
                $(this).removeClass("selected").prev().focus().addClass("selected");
                $(this).parents(".stylish-select").find(".stylish-select-right").text($(this).prev().text());
                $(this).parents(".stylish-select").prev().val($(this).prev().attr("data"));
            }

            e.preventDefault();
        }
        else if (e.keyCode == "40") {
			console.log('d2');
            if ($(this).removeClass("selected").next().size() > 0) {
                $(this).removeClass("selected").next().focus().addClass("selected");
                $(this).parents(".stylish-select").find(".stylish-select-right").text($(this).next().text());
                $(this).parents(".stylish-select").prev().val($(this).next().attr("data"));
            }
            e.preventDefault();
			
        } else if (e.keyCode > 47 && e.keyCode < 91) {
            clearInterval(keyinterval);

            if ($(this).parents(".stylish-select").find(".stylish-select-left").attr("data-filter") != String.fromCharCode(e.which)) {
                $(this).parents(".stylish-select").find(".stylish-select-left").attr("data-filter", $(this).parents(".stylish-select").find(".stylish-select-left").attr("data-filter") + "" + String.fromCharCode(e.which));
            }
            var currentval = $(this).parents(".stylish-select").find(".stylish-select-right").text();
            if (currentval == "") currentval = "-1";

            if ($(this).parents(".stylish-select").find(".stylish-select-left").next().find("li:not('.selected'):containsIN('" + $(this).parents(".stylish-select").find(".stylish-select-left").attr("data-filter") + "')").size() > 0) {
                $(this).removeClass("selected");

                var nextli = $(this).parents(".stylish-select").find(".stylish-select-left").next().find("li:containsIN('" + $(this).parents(".stylish-select").find(".stylish-select-left").attr("data-filter") + "')");
                currindex++;
                if (currindex > nextli.size() - 1) {
                    currindex = 0;
                }
                nextli.eq(currindex).addClass("selected").focus();
                $(this).parents(".stylish-select").find(".stylish-select-right").text($(this).parents(".stylish-select").find(".stylish-select-left").next().find("li.selected").text());
                $(this).parents(".stylish-select").prev().val($(this).parents(".stylish-select").find(".stylish-select-left").next().find("li.selected").attr("data"));
            }

            keyinterval = setInterval(function () { clearDataFilter(); }, 300);
        } else if (e.keyCode == 27) {
            $(this).parent().hide();
            $(this).parents(".stylish-select").find(".stylish-select-left").focus();
        } else if (e.keyCode == 16) {

        } else {
            e.preventDefault();
        }
    });



    keyinterval = setInterval(function () { clearDataFilter(); }, 300);
    function clearDataFilter() {
        $(".stylish-select-left").attr("data-filter", "");
    }

    $.extend($.expr[":"], {
        "containsIN": function (elem, i, match, array) {
            return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) == 0;
        }
    });


    $(document).click(function () {
		 
		$(".stylish-select-left").removeClass('open')
		$('.main').removeClass('select-active');
		$(".listing").hide();
		 
    });


}


$(document).ready(function () {
    $('.filter-section').addClass('filterhid');
    $('.filter-section').hide().removeClass('filterhid');
    /*$('.filter-btn').click(function(){
                    if(!$(this).hasClass('active')){
                                                    $('.filter-section').removeClass('filterhid');
                    }
    })
    */
})
