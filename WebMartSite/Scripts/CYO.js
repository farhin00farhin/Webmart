//The MIT License (MIT)
//Copyright (c) 2016 Sadia Afrin

//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

//The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// 21060909 SA Validate email address string
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

$("#custom").spectrum({
    color: "#0062C4",
    change: function (color) {
        $(".selected").not(".tool-text, .icon-tool, .line-tool-v, .line-tool-h").css("background-color", color.toHexString());
        $(".selected").css("color", color.toHexString());
    }
});

elementsInDesign = 0;

$(document).ready(function () {
    $('.design-area').not(".tool").click(function () {
        $(".selected").removeClass("selected");
    });
    $('[data-toggle="tooltip"]').tooltip();
    $('.tool').click(function () {
    	$(".design-area").append($(this)[0].outerHTML);
    	elementsInDesign++;
        $(".selected").removeClass("selected");
        $(".design-area .tool:last-child").addClass("selected");
        $(".design-area .tool:last-child").css("left", "100px");
        $(".design-area .tool:last-child").css("z-index", ++window.maxZindex);
        if ($(".design-area .tool:last-child").hasClass("tool-text")) {
            $(".design-area .tool").draggable({ containment: "parent", scroll: false, cancel: "span" });
        }
        else {
            $(".design-area .tool").draggable({ containment: "parent", scroll: false });
            $(".design-area .tool").resizable({ containment: "parent" });

        }
        $(".design-area .tool-text span").attr("contenteditable", "true");
        $('.design-area .tool').click(function (event) {
            event.stopPropagation();
            $(".selected").removeClass("selected");
            $(this).addClass("selected");
           
        });
    });

    $('.blank-link').click(function (event) {
        $(".design-area").css("display", "none");
        $(".canvas-container").css("display", "block");

        $("#close-canvas").css("display", "block");
        $("#edit-canvas").css("display", "block");
        $("#clear-canvas").css("display", "block");

				$('.tools').children().hide();
			  $('.send-design').show();
			  $(".send-design").css("margin-top", "-84px");
    });

    $('#close-canvas').click(function (event) {
        $(".design-area").css("display", "block");
        $(".canvas-container").css("display", "none");

        $("#close-canvas").css("display", "none");
        $("#edit-canvas").css("display", "none");
        $("#clear-canvas").css("display", "none");

        $('.tools').children().show();
        $(".send-design").css("margin-top", "");

    });
    window.eraseMode = false;

    $('#edit-canvas').click(function (event) {
    	window.eraseMode = !window.eraseMode;
    	if (window.eraseMode) {
		    $('#edit-canvas').removeClass("fa-eraser").addClass("fa-pencil");
	    } else {
    		$('#edit-canvas').removeClass("fa-pencil").addClass("fa-eraser");

	    }
    });

    $('#clear-canvas').click(function (event) {
    		clearArea();
    });


});



$(function () {

	window.minZindex = 50000;
	window.maxZindex = 50001;
    $.contextMenu({
        selector: '.design-area .tool',
        callback: function (key, options) {
        	if (key == 'toFront') {
        			$(this).css("z-index", ++window.maxZindex);
	        }
					else if (key == 'toBack') {
							$(this).css("z-index", --window.minZindex);
		      }
					else if (key == 'delete') {
							$(this).remove();
			    }
        },
        items: {

        	"toFront": { name: "Send to Front" },
        	"toBack": { name: "Send to Back" },
        	"delete": { name: "Remove" },
        }
    });
});




//  21060909 SA Database saving functionality
$(document).ready(function ($) {
    $('#submit-button').click(function (e) {
        e.preventDefault();

        //  21060909 SA Validate Email field and show error if invalid
        if (!validateEmail($('#email').val())) {
            $('#error-message-email').css('display', 'block');
        } else {
            $('#error-message-email').css('display', 'none');
        }

        // 21060909 SA If anything is invalid, return out of the method without sending an email.
        if (!validateEmail($('#email').val())) {
            return;
        }

        var encodedMessage = String($('.design-area').html()).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

        if ($('.canvas-container').is(":visible")) {
            encodedMessage = document.getElementById("myCanvas").toDataURL();
        }

        // 21060909 SA All validation over. Now send the email
        $.ajax({
        	url: "/PostHTMLDesign",
        	method: "POST",
        	data: {
        		email: $('#email').val(),
        		message: encodedMessage
        	},
        	dataType: "json"
        });

        // 21060909 SA Reset all the form fields
        $('#email').val('');

        $('#check').css('display', 'inline');
        setTimeout(function () { $('#check').css('display', 'none'); }, 4000);

    });
});


var mousePressed = false;
var lastX, lastY;
var ctx;
window.eraseMode = false;

function InitThis() {
    ctx = document.getElementById('myCanvas').getContext("2d");

    $('#myCanvas').mousedown(function (e) {
        mousePressed = true;
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
    });

    $('#myCanvas').mousemove(function (e) {
        if (mousePressed) {
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });

    $('#myCanvas').mouseup(function (e) {
        mousePressed = false;
    });
    $('#myCanvas').mouseleave(function (e) {
        mousePressed = false;
    });
}

function Draw(x, y, isDown) {

	if (isDown) {
		if (!window.eraseMode) {
				ctx.beginPath();
				ctx.strokeStyle = 'black';
				ctx.lineWidth = 5;
				ctx.lineJoin = "round";
				ctx.moveTo(lastX, lastY);
				ctx.lineTo(x, y);
				ctx.closePath();
				ctx.stroke();
		} else {
				ctx.beginPath();
				ctx.strokeStyle = '#f0f0f0';
				ctx.lineWidth = 50;
				ctx.lineJoin = "round";
				ctx.moveTo(lastX, lastY);
				ctx.lineTo(x, y);
				ctx.closePath();
				ctx.stroke();
		}
    }
    lastX = x; lastY = y;
}

function clearArea() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
