// This makes the banner div expand to allow the navbar-collapse to show up.
$('.navbar-toggle').click(function () {
    if ($('.navbar-collapse').hasClass('collapse in')) {
        // the nav is expanded and is about to collapse
        $('.banner')
          .delay(800)
          .queue(function (next) {
              $(this).css('height', '');
              next();
          });
    } else {
        // the nav is collapsed and is about to expand
        $('.banner').css("height", "800");
    }
});