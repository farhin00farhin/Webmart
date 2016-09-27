// background slider element
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

//slide animation is happening
isChangingSlides = false;

//binding click events for next and previous buttons
$(document).ready(function () {
    $('.prev-button').click(function () {
        if (!isChangingSlides) {
            SliderModule.changePrev();
            isChangingSlides = true;
            console.log('setting isChanging to true');
            setTimeout(function () {
                console.log('setting isChanging to false');
                isChangingSlides = false;
            }, 2000);
        }

    });

    $('.next-button').click(function () {
        if (!isChangingSlides) {
            SliderModule.changeNext();
            console.log('setting isChanging to true');
            isChangingSlides = true;
            setTimeout(function () {
                console.log('setting isChanging to false');
                isChangingSlides = false;
            }, 2000);
        }
    });
});

