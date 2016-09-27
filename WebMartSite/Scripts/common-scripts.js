//Validate email address string
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

//Bind the submit button from the contact page
$(document).ready(function ($) {
    $('#btnSubmit').click(function (e) {
    e.preventDefault();

    // Validate Name field and show error if invalid
    if ($('#name').val().trim() == '') {
        $('#name').css('background-color', 'rgba(127, 7, 7, 0.14)');
        $('#error-message-name').css('display', 'inline');
    }
    else {
        $('#name').css('background-color', '');
        $('#error-message-name').css('display', 'none');
    }
    // Validate Comments field and show error if invalid
    if ($('#message').val().trim() == '') {
        $('#message').css('background-color', 'rgba(127, 7, 7, 0.14)');
        $('#error-message-message').css('display', 'inline');
    }
    else {
        $('#message').css('background-color', '');
        $('#error-message-message').css('display', 'none');
    }

    // Validate Email field and show error if invalid
    if (!validateEmail($('#email').val())) {
        $('#email').css('background-color', 'rgba(127, 7, 7, 0.14)');
        $('#error-message-email').css('display', 'inline');
    } else {
        $('#email').css('background-color', '');
        $('#error-message-email').css('display', 'none');
    }

    // If anything is invalid, return out of the method without sending an email.
    if (($('#name').val().trim() == '') || ($('#message').val().trim() == '') || (!validateEmail($('#email').val()))) {
        return;
    }

    //All validation over. Now send the email
    $.ajax({
        url: "/PostMessage",
        method: "POST",
        data: {
            email: $('#email').val(),
            message: $('#message').val(),
            name: $('#name').val(),
        },
        dataType: "json"
    });

    // Reset all the form fields
    $('#email').val('');
    $('#message').val('');
    $('#name').val('');

    $('#check').css('display', 'inline');
    setTimeout(function () { $('#check').css('display', 'none'); }, 4000);

    });
});


// Global state variable
var winSize = '';
window.onresize = function () {
    // when the window is resized, refresh the map. This is necessary because 
    // google centers the map according to the size of the window it was originally loaded in.
    // The page is meant to be loaded at a certain size and users don't resize windows frequently.

    var newWinSize = ''; // default value, check for actual size
    if ($(this).width() >= 1200) {
        newWinSize = 'lg';
    } else if ($(this).width() >= 992) {
        newWinSize = 'md';
    } else if ($(this).width() >= 768) {
        newWinSize = 'sm';
    }
    else if ($(this).width() >= 420) {
        newWinSize = 'xs';
    }
    if (newWinSize != winSize) {
        console.log('resizing');
        setTimeout(function () { init(); }, 1000);
        winSize = newWinSize;
    }
};

//Pricing hover scale
$(document).ready(function () {
    $('.promo').mouseover(function () {
        $('.promo').removeClass('scale');
        $(this).addClass('scale');
    });

});

//Bind the Signup button from the pricing page
$(document).ready(function ($) {
    $('#btn-signup-submit').click(function (e) {
        e.preventDefault();

  
        // Validate Email field and show error if invalid
        if (!validateEmail($('#email').val())) {
            $('#email').css('background-color', '#909090');
            $('#email').css('color', '#FFFFFF');
            $('#error-message-email').css('color', 'black');
        } else {
            $('#email').css('background-color', '');
            $('#email').css('color', '');
            $('#error-message-email').css('color', '');
        }

        // If anything is invalid, return out of the method without sending an email.
        if ((!validateEmail($('#email').val()))){
            return;
        }

        //All validation over. Now send the email
        $.ajax({
            url: "/PostMessage",
            method: "POST",
            data: {
                email: $('#email').val(),
                message: 'This user requested to sign up for a package',
                name: 'Pricing Page'
            },
            dataType: "json"
        });

        // Reset all the form fields
        $('#email').val('');

        $('#check').css('display', 'inline');
        setTimeout(function () { $('#check').css('display', 'none'); }, 4000);
    });
});

function openNav() {
    document.getElementById("pricing-overlay").style.width = "100%";
    document.getElementById("pricing-overlay-back").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("pricing-overlay").style.width = "0%";
    document.getElementById("pricing-overlay-back").style.width = "0%";

}

$(document).ready(function ($) {
    $('#survey-options .survey-option').click(function () {
        $('#previousAnswers').append($(this));
        $(this).addClass('option-selected');

        //dispaly the options for the chosen option
        //var lastId = $('#previousAnswers .checkbox:last').attr('id');
        $("#survey-options .survey-option").removeClass("visible");

        $("#survey-options").find("[data-after*='" + $(this).attr('id') + "']").addClass("visible");


    });
});
