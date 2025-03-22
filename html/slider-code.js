
$(function() {
  let trackHeight = 0;
}

/*  On Window Load - Fix the Arrows and Dots  */
  
  $(window).on('load', function() {
    $('button.slick-prev, button.slick-next, .slick-dots button').addClass("fas");
    $('button.slick-prev, button.slick-next, .slick-dots button').text('');
    
/*  Set Slider Sections All To The Same Height  */
    
    $('[data-title*="sliderColumn"] .slick-track').each(function() {
      trackHeight = $(this).css('height');
      document.body.style.setProperty('--trackHeight', trackHeight);
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
  
//  Run on initialization - if cloned slide is clicked it gets temp-current
  
  $('[data-title*="mySlider"] .slick-slide.slick-cloned').on('click', function() {
    let clickedSlide = $(this).attr('data-slick-index');
    $('[data-title*="mySlider"] .slick-slide.slick-cloned').removeClass('temp-current');
    $('[data-slick-index="' + clickedSlide + '"]').addClass('temp-current');
  });
  
// Add the temp-current class to the cloned nextSlide
  
  $('[data-title*="mySlider"]').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    let firstClone = slick.slideCount; 
    let lastSlide = firstClone - 1;
    let autoPlay = slick.options.autoplay;
    
    if ( autoPlay == true ) {
      if ( currentSlide == lastSlide ) {
        if ( nextSlide == 0 ) {
          $('[data-slick-index="' + firstClone + '"]').addClass('temp-current');
        }
      }
      if ( currentSlide == 0 ) {
        $('[data-slick-index="' + firstClone + '"]').removeClass('temp-current');
      }
    } 
  }); 

//  Remove temp-current after change
  
  $('[data-title*="mySlider"]').on('afterChange', function(event, slick, currentSlide) {
    let firstClone = slick.slideCount; 
    let lastSlide = firstClone - 1;
    if ( currentSlide >= 0 && currentSlide <= lastSlide ) {
      $('[data-title*="mySlider"] .slick-slide.slick-cloned').removeClass('temp-current');
    };
  });
  
