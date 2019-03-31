// REGEX PATTERN FOR EMAIL VALIDATION
function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}


// VALIDATE FORM FIELDS AND SUBMIT
//function submitForm() {
$.fn.submitForm = function () {
    var errorCount = 0;
    var errorString = '';

    $(this).find('input, textarea,  select').removeClass('formError');
    $(this).find('input, textarea, select').each(function () {
        if (typeof $(this).attr('validation') !== typeof undefined && $(this).attr('validation') !== false && ($(this).css('display') !== 'none' || $(this).attr('type') == 'hidden')) {
            // CONFIRM EMAIL
            if ($(this).attr('validation').indexOf('emailconfirm') !== -1) {
                if ($(this).val() == document.getElementsByName('Email')[0].value) {
                    $(this).removeClass('formError');
                    $(this).addClass('GPformValid');


                } else {
                    $(this).addClass('formError');
                    $(this).removeClass('GPformValid');
                    errorCount++;
                    errorString += 'ERROR: ' + $(this).attr('name').toUpperCase() + ' - Confirm Email. ';

                }
            }



            // CHECK REQUIRED FILEDS
            if ($(this).attr('validation').indexOf('required') !== -1 && $(this).val() == '') {
                $(this).addClass('formError');
                errorCount++;
                errorString += 'ERROR: ' + $(this).attr('name').toUpperCase() + ' - Required field missing. ';
                $(this).next('.error-msg').text($(this).attr('name').toUpperCase() + ' - Required field missing. ');

            }

            // CHECK REQUIRED CHECKBOXES


            if (($(this).attr('validation').indexOf('required') !== -1 && $(this).is(':checkbox')) && $(this).is(':checked') !== true) {
                if ($('.validateform').data('alert') != 'suppress') {
                    alert('The opt-in check box is required.');
                }
                $(this).addClass('formError');
                errorCount++;
                errorString += 'ERROR: ' + $(this).attr('name').toUpperCase() + ' - Required checkbox not checked. ';
                $(this).parent().next('.error-msg').text($(this).attr('name').toUpperCase() + ' - Required checkbox not checked. ');

            }


            // CHECK FOR VALID EMAIL ADDRESS
            if ($(this).attr('validation').indexOf('email') !== -1) {
                if (isValidEmailAddress($(this).val())) {
                    $(this).addClass('GPformValid');
                    $(this).removeClass('formError');
                }
                else if ($(this).attr('name', 'Email').val() == '') {
                    $(this).next('.error-msg').text($(this).attr('name').toUpperCase() + ' - Required field missing');
                }
                else {
                    $(this).addClass('formError');
                    errorCount++;
                    errorString += 'ERROR: ' + $(this).attr('name').toUpperCase() + ' - Email isn\'t valid. ';
                    $(this).next('.error-msg').text('Email isn\'t valid. ');

                }
            }

            // TELEPHONE NUMBER VALIDATION

            if ($(this).attr('validation').indexOf('phone') !== -1) {
                if ($(this).val() == '') {
                    errorCount++;
                    $(this).next('.error-msg').text($(this).attr('name').toUpperCase() + ' - Required field missing');
                }
                else {


                    $(this).attr('maxlength', '10');
                    $(this).val($(this).val().replace(/[^0-9.]/g, ''));
                    if ($(this).val().length < 10) {
                        $(this).addClass('formError');
                        $(this).removeClass('formValid');
                        errorCount++;


                    } else {
                        $(this).addClass('formValid');
                        $(this).removeClass('formError');
                    }
                }
            }




            if ($(this).prop('selectedIndex') == 0) {

                $(this).next().find('.stylish-select-left').addClass('formError');
                $(this).next().find('.stylish-select-left').removeClass('formValid');
                errorCount++;
            }
            else {
                $(this).next().find('.stylish-select-left').removeClass('formError');
                $(this).next().find('.stylish-select-left').addClass('formValid');
            }



        }
        $(this).next('.error-msg').show();
    });

    // NO ERRORS...SUBMIT THE FORM
    if (errorCount < 1) {
        $('.error-msg').hide();
        $('body').prepend('<div class="formBlackout"><div class="submittingMsg">Submitting...</div></div>')
        $('body').find('.formBlackout').fadeIn();
        var formData = {};
        $('.validateform').find('input,textarea,select').each(function (index, element) {
            var _el = $(element);
            formData[_el.attr("name")] = _el.val();
        });
        //CaptchaResponse.aspx


        $.post($('.validateform').data("submiturl").toLowerCase(),
            formData,
            function (data) {
                //console.log(data)
                if (data.results.success == true) {
                    if ($('.validateform').data('successtype') && $('.validateform').data('successtype') == 'inpage') {
                        $('.formBlackout').remove();
                        $('.validateform').load($('.validateform').data('successurl').toLowerCase() + ' #successmessage');
                    } else {

                        document.location = $('.validateform').data('successurl').toLowerCase();
                    }
                } else {
                    $('.formBlackout').remove();
                    $('.formErrorMsg').show();
                    $('.formErrorMsg').html('There was a problem submitting the form. Please try again.');
                }
            });
    }

}




// VALIDATE OUR FORM'S FIELDS
function formValidate(thisElement) {
    var errorCount = 0;
    if (typeof thisElement.attr('validation') !== typeof undefined && thisElement.attr('validation') !== false && thisElement.css('display') !== 'none') {

        // REQUIRED FIELD VALIDATION
        if (thisElement.attr('validation').indexOf('required') !== -1 && (thisElement.val() == '' || thisElement.checked == false || thisElement.index < 0)) {
            thisElement.addClass('formError');
            thisElement.removeClass('formValid');
            thisElement.next('.error-msg').text($(this).attr('name') + ' - Required field missing');
            errorCount++;
        } else {
            thisElement.next('.error-msg').text('');
            thisElement.addClass('formValid');
            thisElement.removeClass('formError');
            thisElement.next('.error-msg').hide();
        }

        // EMAIL VALIDATION
        if (thisElement.attr('validation').indexOf('email') !== -1) {
            if (isValidEmailAddress(thisElement.val())) {
                thisElement.addClass('formValid');
                thisElement.removeClass('formError');
            }
            else if (thisElement.attr('validation').indexOf('required') !== -1 && (thisElement.val() == '')) {
                thisElement.next('.error-msg').text($(this).attr('name') + ' - Required field missing');
            }
            else {

                thisElement.addClass('formError');
                thisElement.removeClass('formValid');
                thisElement.next('.error-msg').text('Email isn\'t valid.');
                errorCount++;

            }
        }

        // TELEPHONE NUMBER VALIDATION
        if (thisElement.attr('validation').indexOf('phone') !== -1) {
            thisElement.attr('maxlength', '10');
            thisElement.val(thisElement.val().replace(/[^0-9.]/g, ''));
            thisElement.next('.error-msg').show().text('Please enter valid phone no.');
            if (thisElement.val().length < 10) {
                thisElement.addClass('formError');
                thisElement.removeClass('formValid');

                errorCount++;
            } else {
                thisElement.addClass('formValid');
                thisElement.removeClass('formError');
                thisElement.next('.error-msg').hide()
            }
        }


        // EMAIL (CONFIRM) VALIDATION
        if (thisElement.attr('validation').indexOf('emailconfirm') !== -1) {
            if (thisElement.val() == document.getElementsByName('Email')[0].value) {
                thisElement.removeClass('formError');
                thisElement.addClass('formValid');

            } else {

                thisElement.addClass('formError');
                thisElement.removeClass('formValid');
                errorCount++
            }
        }
    }
}


// AS-YOU-TYPE VALIDATION
$(document).on('keyup', '.validateform input ', function () {

    var thisElement = $(this);
    formValidate(thisElement);
    return false;
});

$(document).on('change', '.validateform select', function () {
    var thisElement = $(this);
    formValidate(thisElement);
    return false;
});


