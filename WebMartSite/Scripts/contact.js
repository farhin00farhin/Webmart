﻿$(document).ready(function ($) {
    $('#btnSubmit').click(function (e) {
    e.preventDefault();

    // Validate Name field and show error if invalid
    if ($('#name').val().trim() == '') {
        $('#name').css('border-color', 'red');
        $('#name').css('background-color', 'rgba(127, 7, 7, 0.14)');
    }
    else {
        $('#name').css('border-color', '');
        $('#name').css('background-color', '');
    }
    // Validate Comments field and show error if invalid
    if ($('#comments').val().trim() == '') {
        $('#comments').css('border-color', 'red');
        $('#comments').css('background-color', 'rgba(127, 7, 7, 0.14)');
    }
    else {
        $('#comments').css('border-color', '');
        $('#comments').css('background-color', '');
    }

    // Validate Email field and show error if invalid
    if (!validateEmail($('#email').val())) {
        $('#email').css('border-color', 'red');
        $('#email').css('background-color', 'rgba(127, 7, 7, 0.14)');
    } else {
        $('#email').css('border-color', '');
        $('#email').css('background-color', '');
    }

    // If anything is invalid, return out of the method without sending an email.
    if (($('#name').val().trim() == '') || ($('#comments').val().trim() == '') || (!validateEmail($('#email').val()))) {
        return;
    }

    //All validation over. Now send the email
    $.ajax({
        url: "https://formspree.io/samdanae@gmail.com",
        method: "POST",
        data: {
            email: $('#email').val(),
            comment: $('#comments').val(),
            name: $('#name').val(),
        },
        dataType: "json"
    });

    // Reset all the form fields
    $('#email').val('');
    $('#comments').val('');
    $('#name').val('');

    $('#check').css('display', 'inline');
    setTimeout(function () { $('#check').css('display', 'none'); }, 4000);

    });
});