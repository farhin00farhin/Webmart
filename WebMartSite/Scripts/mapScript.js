//This prevents the map element from zoomed in being scrolled accidentally.
$(document).ready(function ($) {
    $('#my-map-display').addClass('scrolloff');
    // set the mouse events to none when doc is ready to stop user scrolling

    $('.contact-map').on("mouseup", function () {
        // lock it when mouse up
        console.log('mouseup');
    });
    $('.contact-map').on("mousedown", function () {
        // when mouse down, set the mouse events free
        console.log('mousedown: removing');
        $('#my-map-display').removeClass('scrolloff');
    });

    $("#my-map-display").mouseleave(function () {
        console.log('mouseleave');
        $('#my-map-display').addClass('scrolloff');

    });
});