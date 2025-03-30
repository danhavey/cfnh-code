
/*  On Window Load - Fix the Arrows and Dots  */
  
  $(window).on('load', function() {
    $('button.slick-prev, button.slick-next, .slick-dots button').addClass("fas");
    $('button.slick-prev, button.slick-next, .slick-dots button').text('');
    
/*  Set Slider Sections All To The Same Height  */
    /*  Turned off March 26  */
    $('[data-title*="sliderColumn"] .slick-track').each(function() {
      trackHeight = $(this).css('height');
      $(this).find('.slick-slide').css('height', trackHeight);
      $(this).find('.slick-slide > div').css('height', trackHeight);
      $(this).find('.slick-slide > div > .container').css('height', trackHeight);
    });
  });

  
/*  On Responsive Breakpoint - Fix the Arrows and Dots  */
  
$('[data-title*="mySlider"]').on('breakpoint', function(event, slick, breakpoint){
  $('button.slick-prev, button.slick-next, .slick-dots button').addClass("fas");
  $('button.slick-prev, button.slick-next, .slick-dots button').text('');
});
  
/*****     *****     *****/    
  
//  Run on initialization - if cloned slide is clicked, and focusOnSelect = true, then it gets .temp-current
  $('[data-title*="mySlider"] .slick-slide.slick-cloned').on('click', function() {
    let focus = $('[data-title*="mySlider"]').slick('slickGetOption', 'focusOnSelect');
    if ( focus == true ) {
      $(this).addClass('temp-current'); 
    }
  });
  
// Add the .temp-current class to the cloned nextSlide
  $('[data-title*="mySlider"]').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    let firstClone = slick.slideCount; 
    let lastSlide = firstClone - 1;
    let autoPlay = slick.options.autoplay;
    let thisSlider = $(this).closest('.slick-initialized').attr('data-title');
    
    if ( autoPlay == true ) {
      if ( currentSlide == lastSlide ) {
        if ( nextSlide == 0 ) {
          $('[data-title="' + thisSlider + '"] [data-slick-index="' + firstClone + '"]').addClass('temp-current');
        }
      }
      if ( currentSlide == 0 ) {
        $('[data-title="' + thisSlider + '"] [data-slick-index="' + firstClone + '"]').removeClass('temp-current');
      }
    } 
  }); 

//  Remove .temp-current After Change
  $('[data-title*="mySlider"]').on('afterChange', function(event, slick, currentSlide) {
    let firstClone = slick.slideCount; 
    let lastSlide = firstClone - 1;
    if ( currentSlide >= 0 && currentSlide <= lastSlide ) {
      $('.slick-slide.slick-cloned', this).removeClass('temp-current');
    };
  });
  
//  Remove .temp-current on Swipe
  $('[data-title*="mySlider"]').on('swipe', function(event, slick, direction) {
    $('.slick-slide.slick-cloned', this).removeClass('temp-current');
  });
  
  
