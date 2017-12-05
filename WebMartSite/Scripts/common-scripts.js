//The MIT License (MIT)
//Copyright (c) 2016 Codrops
//Copyright (c) 2016 Sadia Afrin
//Copyright (c) 2012 Craig Thomas

//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

//The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



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
        // 20160910 SA Validate Comments field and show error if invalid
        if ($('#message').val().trim() == '') {
            $('#message').css('background-color', 'rgba(127, 7, 7, 0.14)');
            $('#error-message-message').css('display', 'inline');
        }
        else {
            $('#message').css('background-color', '');
            $('#error-message-message').css('display', 'none');
        }

        // 20160910 SA Validate Email field and show error if invalid
        if (!validateEmail($('#email').val())) {
            $('#email').css('background-color', 'rgba(127, 7, 7, 0.14)');
            $('#error-message-email').css('display', 'inline');
        } else {
            $('#email').css('background-color', '');
            $('#error-message-email').css('display', 'none');
        }

        // 20160910 SA If anything is invalid, return out of the method without sending an email.
        if (($('#name').val().trim() == '') || ($('#message').val().trim() == '') || (!validateEmail($('#email').val()))) {
            return;
        }

        // 20160910 SA All validation over. Now send the email
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

        // 20160910 SA Reset all the form fields
        $('#email').val('');
        $('#message').val('');
        $('#name').val('');

        $('#check').css('display', 'inline');
        setTimeout(function () { $('#check').css('display', 'none'); }, 4000);

    });
});


// 20160925 SA Global state variable
var winSize = '';
window.onresize = function () {
    // 20160925 SA when the window is resized, refresh the map. This is necessary because 
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
        setTimeout(function () { init(); }, 1000);
        winSize = newWinSize;
    }


		bindGrid();
};

// 20160913 SA Pricing hover scale
$(document).ready(function () {
    $('.promo').mouseover(function () {
        $('.promo').removeClass('scale');
        $(this).addClass('scale');
    });

});

$(document).ready(function () {
    $('input[type=checkbox]').change(function () {
        if ($(this).is(':checked')) {
            $(this).addClass('checked');
        } else {
            $(this).removeClass('checked');
        }
    });
});

// 20160913 SA Bind the Signup button from the pricing page
$(document).ready(function ($) {
    $('#btn-signup-submit').click(function (e) {
        e.preventDefault();

        //  20160913 SA Validate Name field and show error if invalid
        if ($('#name').val().trim() == '') {
            $('#name').css('background-color', '#909090');
            $('#name').css('color', '#FFFFFF');
            $('#error-message-signup-name').css('color', 'black');
        }
        else {
            $('#name').css('background-color', '');
            $('#name').css('color', '');
            $('#error-message-signup-name').css('color', '');
        }
        //  20160913 SA Validate Email field and show error if invalid
        if (!validateEmail($('#email').val())) {
            $('#email').css('background-color', '#909090');
            $('#email').css('color', '#FFFFFF');
            $('#error-message-signup').css('color', 'black');
        } else {
            $('#email').css('background-color', '');
            $('#email').css('color', '');
            $('#error-message-signup').css('color', '');
        }

        //  20160913 SA If anything is invalid, return out of the method without sending an email.
        if (($('#name').val().trim() == '') || (!validateEmail($('#email').val()))) {
            return;
        }
      

        var comm = $('#preferred-comm :selected').text();
        var options = $('input[type=checkbox]:checked').map(function () {
            return this.value;
        }).get().join(', ');

        // 20160913 SA All validation over. Now send the email
        $.ajax({
            url: "/PostMessageSignup",
            method: "POST",
            data: {
                email: $('#email').val(),
                message: $('#special-req').val(),
                name: $('#name').val(),
                phone: $('#phone').val(),
                communicationMethod: comm,
                options: options

            },
            dataType: "json"
        });

        // 20160913 SA Reset all the form fields
        $('#email').val('');
        $('#special-req').val('');
        $('#name').val('');
        $('#phone').val('');
        $('#preferred-comm').val('');
        $("input:checkbox").prop('checked', $(this).prop("checked"));
        $("select#preferred-comm")[0].selectedIndex = 0;

        $('#check').css('display', 'inline');
        setTimeout(function () { $('#check').css('display', 'none'); }, 4000);
    });
});

function openNav() {
    document.getElementById("pricing-overlay").style.width = "100%";
    document.getElementById("pricing-overlay-back").style.width = "100%";
}

function closeNav() {
    document.getElementById("pricing-overlay").style.width = "0%";
    document.getElementById("pricing-overlay-back").style.width = "0%";

}

//Cycling text on the about us page
$(document).ready(function ($) {
    var quotes = $(".cycle-text");
    var quoteIndex = -1;

    function showNextQuote() {
        ++quoteIndex;
        quotes.eq(quoteIndex % quotes.length)
            .fadeIn(1000)
            .delay(1500)
            .fadeOut(500, showNextQuote);
    }

    showNextQuote();

});


function openPreview(path) {
    $("#preview-iframe").attr("src", path);
    document.getElementById("preview-overlay").style.width = "100%";
    document.getElementById("preview-overlay-back").style.width = "100%";
    setTimeout(function () {
        $('.switch-theme').tooltip('enable');
        $('.switch-theme').tooltip('show');
    }, 1000);
    setTimeout(function () {
        $('.switch-theme').tooltip('hide');
        $('.switch-theme').tooltip('disable');
    }, 5000);
}

function closePreview() {
    document.getElementById("preview-overlay").style.width = "0%";
    document.getElementById("preview-overlay-back").style.width = "0%";
}

var sliderTimeout;

// 20160925 SA Displaying survey options
$(document).ready(function ($) {
    $('#survey-options .survey-option').click(function () {
        $('#previousAnswers').append($($(this).prevAll(".survey-question")[0]).addClass('option-selected'));
        $(this).css("pointer-events", "none");
        $("#survey-options .survey-option").removeClass("visible");
        $("#survey-options .survey-question").removeClass("visible");

        // 20160925 SA display the options for the chosen option
        $("#survey-options").find("[data-after*='" + $(this).attr('id') + "']").addClass("visible");
        if (selectedSliderValue == 3) {
            $("#survey-options").find("[data-only-for-value='3'].visible").siblings().not("[data-only-for-value='3'].visible").removeClass('visible');
        } else {
            $("#survey-options").find("[data-only-for-value='3'].visible").removeClass('visible');
        }

        $("html, body").animate({ scrollTop: $('#survey-options').offset().top }, 1000);

        // 20160925 SA Have to keep setting this
        $('#slider-container').css("margin-bottom", "70px");
        $('#slider-container').css("pointer-events", "none");
    });


    // 20160917 SA Binding the budget slider with JQuery
    selectedSliderValue = 0;
    $("#budgetSlider").slider();
    $("#budgetSlider").on("change", function (slideEvt) {
        clearTimeout(sliderTimeout);

        sliderTimeout = setTimeout(function myfunction() {
            selectedSliderValue = slideEvt.value.newValue;
            $('#slider-container').css("pointer-events", "none");
            if (slideEvt.value.newValue > 2) {
                // 20160917 SA medium budget plus
                $("#survey-options").addClass("visible");
                $("#questionFor").addClass("visible");
                $("#questionA").addClass("visible");
                $("#questionB").addClass("visible");
            }
            else {
                // 20160917 SA very low budget
                $("#survey-options").addClass("visible");
                $('#basic-option').addClass("visible");
                $('#basic-option-button').addClass("visible");
                $('#feature-page-redirect').addClass("visible");
                
            }

            $("#questionBudget").addClass("option-selected");
            $('#previousAnswers').append($("#questionBudget"));
            $('#slider-container').fadeOut();

        }, 1000);

    });
});

// 20161003 SA Binding the switch theme button
$(document).ready(function ($) {

    $("#switch-dark").click(function () {
        $('#preview-iframe')[0].contentWindow.switchStyle('dark');
    });
    $("#switch-light").click(function () {
        $('#preview-iframe')[0].contentWindow.switchStyle('light');
    });
    $("#switch-autumn").click(function () {
        $('#preview-iframe')[0].contentWindow.switchStyle('autumn');
    });
    $("#switch-original").click(function () {
        $('#preview-iframe')[0].contentWindow.switchStyle('');
    });
});

// 20161003 SA Show the tooltip on the overlay in the survey page.
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});



// 20161003 SA  Animate the overlay for the features page
function animateOverlay(overlayToOpen) {
    overlayToOpen.addClass('zoomInUp animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass('zoomInUp animated');

    });
};

presentationStarting = false;

function presentationStart() {
    presentationStarting = false;
}

// 20161007 SA Cycling text on the basic elements page
function startBasicTextcycle() {
    clearBasicCycleText();

    basicQuoteHandle0 = setTimeout(function () {
        $($(".basic-cycle-text")[0]).fadeIn(250).delay(350).fadeOut(250);
    }, 100);
    basicQuoteHandle1 = setTimeout(function () {
        $($(".basic-cycle-text")[1]).fadeIn(250).delay(350).fadeOut(250);
    }, 1100);
    basicQuoteHandle2 = setTimeout(function () {
        $($(".basic-cycle-text")[2]).fadeIn(250).delay(350).fadeOut(250);
    }, 2100);
    basicQuoteHandle3 = setTimeout(function () {
        $($(".basic-cycle-text")[3]).fadeIn(250).delay(350).fadeOut(250);
    }, 3100);
    basicQuoteHandle4 = setTimeout(function () {
        $($(".basic-cycle-text")[4]).fadeIn(250).delay(350).fadeOut(250);
    }, 4100);
    basicQuoteHandle5 = setTimeout(function () {
        $($(".basic-cycle-text")[5]).fadeIn(250).delay(350).fadeOut(250);
    }, 5100);
}


// 20161006 SA show the sidebar on the basic element slide in the tour 
function showBasicElementSidebar() {
    if (!(typeof basicSlideExitHandle === "undefined")) {
        console.log('clearing basicSlideExitHandle timout');
        clearTimeout(basicSlideExitHandle);
    }

    if (!(typeof basicSlideEnterHandle === "undefined")) {
        console.log('clearing basicSlideEnterHandle timout');
        clearTimeout(basicSlideEnterHandle);
    }

    $('.basic-elements-sidebar').css('width', '');
    $('.basic-elements-sidebar').css('opacity', '0');
    $('.basic-elements-content').css('left', '');

    basicSlideEnterHandle = setTimeout(function () {
        $('.basic-elements-sidebar').animate({
            width: "50vmin",
            opacity: "1"
        }, 1000);

        $('.basic-elements-content').animate({
            left: "-60vmin"
        }, 1000);
    }, 7000);


    basicSlideExitHandle = setTimeout(function () {
        $('.basic-elements-sidebar').animate({
            width: "",
            opacity: "0"
        }, 1000);
        $('.basic-elements-content').animate({
            left: ""
        }, 1000);
    }, 12000);

}

// 20161006 SA show the sidebar on the startup element slide in the tour 
function showstartupElementSidebar() {

    if (!(typeof startupSlideExitHandle === "undefined")) {
        clearTimeout(startupSlideExitHandle);
    }

    if (!(typeof startupSlideEnterHandle === "undefined")) {
        clearTimeout(startupSlideEnterHandle);
    }
    if (!(typeof startupSlide2ExitHandle === "undefined")) {
        clearTimeout(startupSlide2ExitHandle);
    }

    if (!(typeof startupSlide2EnterHandle === "undefined")) {
        clearTimeout(startupSlide2EnterHandle);
    }

    $('.startup-elements-sidebar').css('display', 'none');
    $('.startup-elements-sidebar2').css('display', 'none');

    startupSlideEnterHandle = setTimeout(function () {
        $('.startup-elements-sidebar').fadeIn(1000);
    }, 7000);


    startupSlideExitHandle = setTimeout(function () {
        $('.startup-elements-sidebar').fadeOut();
    }, 14000);

    startupSlide2EnterHandle = setTimeout(function () {
        $('.startup-elements-sidebar2').fadeIn(1000);
    }, 11000);


    startupSlide2ExitHandle = setTimeout(function () {
        $('.startup-elements-sidebar2').fadeOut();
    }, 14000);
}

// 20161006 SA stop the text from cycling
function clearBasicCycleText() {
    $(".basic-cycle-text").css('display', 'none');

    if (!(typeof basicQuoteHandle0 === "undefined")) { clearTimeout(basicQuoteHandle0); }
    if (!(typeof basicQuoteHandle1 === "undefined")) { clearTimeout(basicQuoteHandle1); }
    if (!(typeof basicQuoteHandle2 === "undefined")) { clearTimeout(basicQuoteHandle2); }
    if (!(typeof basicQuoteHandle3 === "undefined")) { clearTimeout(basicQuoteHandle3); }
    if (!(typeof basicQuoteHandle4 === "undefined")) { clearTimeout(basicQuoteHandle4); }
    if (!(typeof basicQuoteHandle5 === "undefined")) { clearTimeout(basicQuoteHandle5); }
    $(".basic-cycle-text").css('display', 'none');
}



if (document.getElementById("gravity-zero") != null) {
	window.gravityDivTemplate = document.getElementById("gravity-zero").outerHTML;
}


//20161007 SA initialise the gravity function adopted from jGravity example code
function bindGravity() {
    $('div.jGravity').on('click', function () { 
        $('div#gravity-zero').jGravity({ 
            target: '.headPiece, .logoBar, .barPiece, .goButton, .duck, .para', 
            ignoreClass: 'ignoreMe', 
            weight: 25, 
            depth: 5, 
            drag: true 
        });
        $('div.jGravity').off('click');
    });
}

if (document.getElementById("slideshow") != null) {
	window.slideshowDivTemplate = document.getElementById("slideshow").outerHTML;
}

function initialiseSlideshow() {
    (function () {
        new SliderFx(document.getElementById('slideshow'), {
            easing: 'cubic-bezier(.8,0,.2,1)'
        });
        $('#slideshow .slide h1').css('visibility','visible');

    })();

    $('#slideshow nav span').click(function () {
    	setTimeout(function myfunction() {
    		$('#slideshow .slide h1').hide();
    		setTimeout(function () {
    			$('#slideshow .slide h1').show();
    		}, 1);
    	}, 200);
        
    });

}

if (document.getElementById("sb-slider") != null) {
	window.sliceDivTemplate = document.getElementById("sb-slider").outerHTML;
}

function initialiseSlice() {
    $(function () {
        slicedSlideshow = (function () {
            var $navArrows = $('#nav-arrows').hide(),
                $navOptions = $('#nav-options').hide(),
                slicebox = $('#sb-slider').slicebox({
                    onReady: function () {
                        $navArrows.show();
                        $navOptions.show();
                    },
                    orientation: 'h',
                    cuboidsCount: 3
                }),
                initEvents = function () {
                    // //20161005 SA add navigation events
                    $navArrows.children(':first').on('click', function () {
                        slicebox.next();
                        return false;
                    });

                    $navArrows.children(':last').on('click', function () {
                        slicebox.previous();
                        return false;
                    });

                    slicebox.jump(1);

                },
                    init = function () {
                        initEvents();
                    };

            return { init: init };
        })();
        slicedSlideshow.init();
    });
    //$('.slice-wrapper').hide();
}

if (document.getElementById("ripple-element") != null) {
	window.ripplesTemplate = document.getElementById("ripple-element").outerHTML;
}

function initialiseRipples() {
    try {
        $('.ripple').ripples({
            resolution: 512,
            dropRadius: 8, //px
            perturbance: 0.01,
        });
        $('.ripple header').ripples({
            resolution: 128,
            dropRadius: 10, //px
            perturbance: 0.04,
            interactive: false
        });
    }
    catch (e) {
        $('.error').show().text(e);
    }

    // 20161007 SA Automatic drops - took example from the code provided by the ripple library.
    setInterval(function () {
        var $el = $('.ripple');
        var x = Math.random() * $el.outerWidth();
        var y = Math.random() * $el.outerHeight();
        var dropRadius = 15;
        var strength = 0.04 + Math.random() * 0.04;

        $el.ripples('drop', x, y, dropRadius, strength);
    }, 400);
}

if (document.getElementById("startup-gallery-grid") != null) {
	window.galleryTemplate = document.getElementById("startup-gallery-grid").outerHTML;
}

function bindGrid() {
    var grid = document.querySelector('.startup-gallery-grid');
    if (grid == null) {
        return;
    }
	window.msnry = new Masonry(grid,
	{
		itemSelector: '.startup-gallery-grid-item',
		columnWidth: '.startup-gallery-grid-sizer',
		percentPosition: true,
		resize: true
    });

    $(function () {
        $('.grid-item > .da-thumbs').each(function () { $(this).hoverdir(); });
        $('.startup-gallery-grid-item > .da-thumbs').each(function () { $(this).hoverdir(); });
    });
}

//20161005 SA Shows any slide and does any cleanup of old slide if needed
function showPresentationDiv(currentDiv, nextDiv) {
    if (presentationStarting) {
        return;
    }

    clearBasicCycleText();

    if (nextDiv.length > 0) {
        nextDiv.addClass('active');
        $(".tour-options > li.hovered").removeClass('hovered');
        $(".tour-options").find("[data-related-item='" + nextDiv.attr('id') + "']").addClass('hovered');
        if ($('.presentation.active').not(nextDiv).length > 0) {
            $('.presentation.active').not(nextDiv).removeClass('active');
        }
        presentationStarting = true;
        setTimeout(presentationStart, 1000);

        if (nextDiv.attr('id') == 'basic-elements') {
            showBasicElementSidebar();
            setTimeout(function () {
                startBasicTextcycle();
            }, 1000);
        }

        if (nextDiv.attr('id') == 'startup-elements') {
            showstartupElementSidebar();
        }

        $('#sb-slider').remove();
        if (nextDiv.attr('id') == 'startup-sliders') {
            $('#startup-slideshow').append(window.sliceDivTemplate);
            initialiseSlice();
            $('.slice-wrapper').hide();
            $('.slice-wrapper').fadeIn(2000);
        }

        $('#slideshow').remove();
        if (nextDiv.attr('id') == 'basic-sliders') {
            $('.wobble-container').append(window.slideshowDivTemplate);
            initialiseSlideshow();
        }

        $('div#gravity-zero').remove();
        if (nextDiv.attr('id') == 'premium-elements') {
            $('.gravity-zero-container').append(window.gravityDivTemplate);
            bindGravity();
        }

        $('#ripple-element').remove();
        if (nextDiv.attr('id') == 'premium-sliders') {
            $('#premium-sliders').append(window.ripplesTemplate);
            initialiseRipples();
        }

        $('#startup-gallery-grid').remove();
        if (nextDiv.attr('id') == 'startup-gallery') {
            $('#startup-gallery').append(window.galleryTemplate);
            bindGrid();
            $(".startup-gallery-grid-item.fadeInUp").hide();

            setTimeout(function () {
                // 20161017 SA  Animate the overlay for the startup page
                $(".startup-gallery-grid-item.fadeInUp").fadeIn();
            }, 1200);
        }

        nextDiv.parent().css("background-color", nextDiv.data("bg-color"));
    }
}

function showNextPresentationDiv() {
    var thisDiv = $('.presentation.active');
    var nextDiv = thisDiv.next();
    showPresentationDiv(thisDiv, nextDiv);

}

function showPreviousPresentationDiv() {
    var thisDiv = $('.presentation.active');
    var prevDiv = thisDiv.prev();
    showPresentationDiv(thisDiv, prevDiv);
}

// 20161009 SA Overlay button clicks
$(document).ready(function () {
    $('.tour-options > li').click(function () {
        showPresentationDiv($('.presentation.active'), $('#' + $(this).data('related-item')));
    });
});


// 20161003 SA Overlay mouse wheel scroll makes the slides change
function addScrollBindings() {
    $('html').on('DOMMouseScroll', function (e) {
        if (!presentationStarting) {
            var delta = e.originalEvent.detail;

            if (delta < 0) {
                showPreviousPresentationDiv();
            } else if (delta > 0) {
                showNextPresentationDiv();
            }
        }
    });

    $('html').on('mousewheel', function (e) {
        if (!presentationStarting) {
            var delta = e.originalEvent.wheelDelta;

            if (delta < 0) {
                showNextPresentationDiv();
            } else if (delta > 0) {
                showPreviousPresentationDiv();
            }
        }
    });
}
// 20161003 SA When the slideshow is finished, take off the bindings again and allow normal scrolling
function removeScrollBindings() {
    $('html').off('DOMMouseScroll');
    $('html').off('mousewheel');
}

// 20161003 SA Overlay animations
$(document).ready(function () {
    $('.shape-overlay').click(function () {
        var overlayToOpen = $('#' + $(this).data('open-overlay'));
        overlayToOpen.css('display', 'block');
        $('html').css('overflow', 'hidden');
        animateOverlay(overlayToOpen);
        addScrollBindings();

        var thisDiv = overlayToOpen.find('.presentation.active');
        var nextDiv = $(overlayToOpen.find('.presentation')[0]);
        showPresentationDiv(thisDiv, nextDiv);


    });

    $('.close-parent').click(function () {
        $(this).parent().css("display", "none");
        $('html').css('overflow', '');
        removeScrollBindings();

    });
});

// 20161005 SA Slice slider code adopted from codrops

var items = []
  , point = document.querySelector('svg').createSVGPoint();

function getCoordinates(e, svg) {
    point.x = e.clientX;
    point.y = e.clientY;
    return point.matrixTransform(svg.getScreenCTM().inverse());
}

function changeColor(e) {
    document.body.className = e.currentTarget.className;
}

function Item(config) {
    Object.keys(config).forEach(function (item) {
        this[item] = config[item];
    }, this);
    this.el.addEventListener('mousemove', this.mouseMoveHandler.bind(this));
    this.el.addEventListener('touchmove', this.touchMoveHandler.bind(this));
}


Item.prototype = {
    update: function update(c) {
        this.clip.setAttribute('cx', c.x);
        this.clip.setAttribute('cy', c.y);
    },
    mouseMoveHandler: function mouseMoveHandler(e) {
        this.update(getCoordinates(e, this.svg));
    },
    touchMoveHandler: function touchMoveHandler(e) {
        e.preventDefault();
        var touch = e.targetTouches[0];
        if (touch) return this.update(getCoordinates(touch, this.svg));
    }
};

[].slice.call(document.querySelectorAll('.torch-item'), 0).forEach(function (item, index) {
    items.push(new Item({
        el: item,
        svg: item.querySelector('svg'),
        clip: document.querySelector('#clip-' + index + ' circle'),
    }));
});

//20160922 SA This prevents the map element from zoomed in being scrolled accidentally.
$(document).ready(function ($) {
    $('#my-map-display').addClass('scrolloff');

    $('.contact-map').on("mousedown", function () {
        $('#my-map-display').removeClass('scrolloff');
    });

    $("#my-map-display").mouseleave(function () {
        $('#my-map-display').addClass('scrolloff');

    });
});


//20161017 SA removing the animated class from the video container because it's not allowing the video to be fullscreen

$(document).ready(function () {
    $("video").mouseover(function () {
        $(".animated video").parent().removeClass("animated");
    });
});


//20161017 SA making the envelope visible after the page loads
$(document).ready(function () {
    $("#envelope").show();
});

