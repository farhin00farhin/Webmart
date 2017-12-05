//The MIT License (MIT)
//Copyright (c) 2016 Sadia Afrin

//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

//The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


// 20160907 SA background slider element
$(function() {
	
	 SliderModule = (function() {
	 	var pb = {};
	 	pb.el = $('#slider');
	 	pb.items = {
	 		panels: pb.el.find('.slider-wrapper > li'),
	 	}
	 	
	 	var SliderInterval,
	 		currentSlider = 0,
	 		nextSlider = 1,
	 		lengthSlider = pb.items.panels.length;
	 	
	 	pb.init = function(settings) {
	 		this.settings = settings || {duration: 8000};
	 		var items = this.items,
	 			lengthPanels = items.panels.length,
	 			output = '';

	 		for(var i = 0; i < lengthPanels; i++) {
	 			if(i == 0) {
	 				output += '<li class="active"></li>';
	 			} else {
	 				output += '<li></li>';
	 			}
	 		}

	 		activateSlider();
	 		
	 	}

	 	var activateSlider = function() {
	 		SliderInterval = setInterval(pb.startSlider, pb.settings.duration);
	 	}

	 	pb.startSlider = function() {
	 		var items = pb.items;
	 			
	 		if(nextSlider >= lengthSlider) {
	 			nextSlider = 0;
	 			currentSlider = lengthSlider-1;
	 		}

	 		items.panels.eq(currentSlider).fadeOut(2000);
	 		items.panels.eq(nextSlider).fadeIn(2000);

	 		currentSlider = nextSlider;
	 		nextSlider += 1;
	 	}


	 	pb.changePanel = function(id) {
	 		clearInterval(SliderInterval);
	 		var items = pb.items;
	 		if(id >= lengthSlider) {
	 			id = 0;
	 		} else if(id < 0) {
	 			id = lengthSlider-1;
	 		}

	 		items.panels.eq(currentSlider).fadeOut(2000);
	 		items.panels.eq(id).fadeIn(2000);

	 		currentSlider = id;
	 		nextSlider = id+1;
	 		activateSlider();
	 	}

	 	
	 	pb.changeNext = function() {
	 		pb.changePanel(currentSlider + 1);
	 	}

	 	pb.changePrev = function() {
	 		pb.changePanel(currentSlider - 1);
	 	}

		return pb;
	 }());

	 SliderModule.init({duration: 6000});

});

// 20160907 SA indicates that slide animation is happening
isChangingSlides = false;

//20160907 SA binding click events for next and previous buttons
$(document).ready(function () {
    $('.prev-button').click(function () {
        if (!isChangingSlides) {
            SliderModule.changePrev();
            isChangingSlides = true;
            setTimeout(function () {
                isChangingSlides = false;
            }, 2000);
        }

    });

    $('.next-button').click(function () {
        if (!isChangingSlides) {
            SliderModule.changeNext();
            isChangingSlides = true;
            setTimeout(function () {
                isChangingSlides = false;
            }, 2000);
        }
    });
});




