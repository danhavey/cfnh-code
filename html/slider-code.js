 
$(window).on('load', function() {
  $('button.slick-prev, button.slick-next, .slick-dots button').addClass("fas");
  $('button.slick-prev, button.slick-next, .slick-dots button').text('');
  
  $('[data-title*="sliderColumn"] .slick-track').each(function() {
    let trackHeight = $(this).css('height');
    $(this).find('.slick-slide').css('height', trackHeight);
    $(this).find('.slick-slide > div').css('height', trackHeight);
    $(this).find('.slick-slide > div > .container').css('height', trackHeight);
  });
});
  
$('[data-title*="mySlider"]').on('breakpoint', function(event, slick, breakpoint){
  $('button.slick-prev, button.slick-next, .slick-dots button').addClass("fas");
  $('button.slick-prev, button.slick-next, .slick-dots button').text('');
});    
  
$('[data-title*="mySlider"] .slick-slide.slick-cloned').on('click', function() {
  //let focus = $('[data-title*="mySlider"]').slick('slickGetOption', 'focusOnSelect');
  //if ( focus == true ) {
    $(this).addClass('temp-current'); 
  //}
});

$('[data-title*="mySlider"]').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
  //console.log('currentSlide', currentSlide);
  //console.log('nextSlide', nextSlide);
  let firstClone = slick.slideCount; 
  //console.log('firstClone=#slides', firstClone);
  let lastSlide = firstClone - 1;
  //console.log('lastSlide=#slides-1', lastSlide);
  //let autoPlay = slick.options.autoplay;
  let thisSlider = $(this).closest('.slick-initialized').attr('data-title');
  
  //if ( autoPlay == true ) {
    if ( currentSlide == lastSlide ) {
      if ( nextSlide == 0 ) {
        $('[data-title="' + thisSlider + '"] [data-slick-index="' + firstClone + '"]').addClass('temp-current');
      }
    }
    if ( currentSlide == 0 ) { //  Fixes Last Slide not working on Prev Arrow
      if ( nextSlide == lastSlide ) {  
        $('[data-title="' + thisSlider + '"] [data-slick-index="-1"]').addClass('temp-current');
        //$('[data-title="' + thisSlider + '"] [data-slick-index="' + firstClone + '"]').removeClass('temp-current');
      }
    }
  //} 
}); 

$('[data-title*="mySlider"]').on('afterChange', function(event, slick, currentSlide) {
  //let firstClone = slick.slideCount; 
  //let lastSlide = firstClone - 1;
  //if ( currentSlide >= 0 && currentSlide <= lastSlide ) {
    //$('.slick-slide.slick-cloned', this).removeClass('temp-current');
    $('.slick-slide', this).removeClass('temp-current');
  //};
});

$('[data-title*="mySlider"]').on('swipe', function(event, slick, direction) {
  $('.slick-slide.slick-cloned', this).removeClass('temp-current');
});
  
  
