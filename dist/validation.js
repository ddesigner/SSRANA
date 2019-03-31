// REGEX PATTERN FOR EMAIL VALIDATION
function GPisValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}

// VALIDATE OUR FORM'S FIELDS
function GPformValidate(thisElement) {
    var errorCount = 0;
    if (typeof thisElement.attr('validation') !== typeof undefined && thisElement.attr('validation') !== false && thisElement.css('display') !== 'none') {

        // REQUIRED FIELD VALIDATION
        if (thisElement.attr('validation').indexOf('required') !== -1 && (thisElement.val() == '' || thisElement.checked == false || thisElement.index < 0)) {
            thisElement.addClass('GPformError');
            thisElement.removeClass('GPformValid');
            thisElement.next('.error-msg').text(jQuery(this).attr('name') + ' - Required field missing');
            errorCount++;
        } else {
            thisElement.next('.error-msg').text('');
            thisElement.addClass('GPformValid');
            thisElement.removeClass('GPformError');
        }

        // EMAIL VALIDATION
        if (thisElement.attr('validation').indexOf('email') !== -1) {
            if (GPisValidEmailAddress(thisElement.val())) {
                thisElement.addClass('GPformValid');
				thisElement.removeClass('GPformError');
            } 
			else if(thisElement.attr('validation').indexOf('required') !== -1 && (thisElement.val() == '')){
				thisElement.next('.error-msg').text(jQuery(this).attr('name') + ' - Required field missing');
			}
			else {

                thisElement.addClass('GPformError');
                thisElement.removeClass('GPformValid');
				thisElement.next('.error-msg').text('Email isn\'t valid.');
				errorCount++;

            }
        }

        // TELEPHONE NUMBER VALIDATION
        if (thisElement.attr('validation').indexOf('phone') !== -1) {
            thisElement.attr('maxlength', '10');
            thisElement.val(thisElement.val().replace(/[^0-9.]/g, ''));
            if (thisElement.val().length < 10) {
                thisElement.addClass('GPformError');
                thisElement.removeClass('GPformValid');

                errorCount++;
            } else {
                thisElement.addClass('GPformValid');
                thisElement.removeClass('GPformError');
            }
        }

        // ZIP CODE VALIDATION
        /* if (thisElement.attr('validation').indexOf('zip') !== -1) {
            thisElement.attr('maxlength', '5');
            thisElement.val(thisElement.val().replace(/[^0-9.]/g, ''));
            if (thisElement.val().length < 5) {
                thisElement.addClass('GPformError');
                thisElement.removeClass('GPformValid');

                errorCount++
            } else {
                thisElement.addClass('GPformValid');
                thisElement.removeClass('GPformError');

            }
        } */
		
		
			if($("#Zip").length >0){
		if ($("#Zip").val() === "undefined" || $("#Zip").val() === "") {
			$("#Zip").addClass('GPformError');
			$("#Zip").removeClass('GPformValid');
			$("#Zip").next('.error-msg').text($("#Zip").attr('name') + ' - Required field missing');
			errorCount++
        
		} 
		else if ($("#Zip").val().length < 5 || isNaN($("#Zip").val())) {
			 
			$("#Zip").addClass('GPformError');
			$("#Zip").removeClass('GPformValid');
			$("#Zip").next('.error-msg').text('Please Enter a Valid ZipCode');
			errorCount++
			 
		 }
		else {
				$("#Zip").removeClass('GPformError');
				$("#Zip").addClass('GPformValid');
					 
		}
		}

        // EMAIL (CONFIRM) VALIDATION
        if (thisElement.attr('validation').indexOf('emailconfirm') !== -1) {
            if (thisElement.val() == document.getElementsByName('Email')[0].value) {
                thisElement.removeClass('GPformError');
                thisElement.addClass('GPformValid');

            } else {

                thisElement.addClass('GPformError');
                thisElement.removeClass('GPformValid');
                errorCount++
            }
        }
    }
}


// SUBMIT THE FORM 
jQuery(document).on('click', '.GPform .GPformButtonSubmit', function () { // added GPform...makes this button only work inside a GPform element

    if (jQuery('input[name="Email"]')) {
        document.cookie = 'thisEmail=' + jQuery('input[name="Email"]').val() + ';expires=Thu, 01 Jan 2970 00:00:01 GMT;path=/';



    }        
    GPsubmitForm();
    return false;
});