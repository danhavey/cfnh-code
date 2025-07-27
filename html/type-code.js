    
    onBegin: (self) => {
      setTimeout(function() {
        let mainBoldColor = $('[mainTypedHeadline] [data-align-selector=".elHeadline"] b').css('color') || 'inherit';
        $('.typed-cursor').css('border-color', mainBoldColor);
      }, 100);
    },
    preStringTyped: (arrayPos, self) => {   
      //console.log(arrayPos,self.strings[arrayPos]);
      
  //  Get the style object for this array position
      let currentStyle = elementStyles[arrayPos];
      let $element = $(self.el);
      
      $element.addClass('boldFix');

      $element.css({
        'color': currentStyle.color,
        'font-size': currentStyle.fontSize,
        'font-family': currentStyle.fontFamily,
        'font-weight': currentStyle.fontWeight,
        'text-shadow': currentStyle.textShadow,
        //'--line-height': currentStyle.lineHeight,
        //'--line-height': maxLineHeight + 'px',
        '--bold-color': currentStyle.boldColor
      });   
      
      $('.typed-cursor').css('border-color', currentStyle.boldColor);
      
  //  Add or remove the CSS fix class based on whether this headline has a leading tag
      if (currentStyle.needsCSSFix) {
        $element.addClass('cssFix');
      } else {
        $element.removeClass('cssFix');
      }
    },
    onComplete: function(self) {
      self.strPos = 0;
      self.arrayPos = -1;
      
  //  Clear any lingering timeouts
      if (self.timeout) {
        clearTimeout(self.timeout);
      }
  //  Clear typed.js internal timeouts (if accessible)
      if (self.timeouts) {
        self.timeouts.forEach(timeout => clearTimeout(timeout));
        self.timeouts = [];
      }
    }
  });
  
/****************************************************/  
  
//  Aggressive cleaning function for ClickFunnels HTML
  function aggressiveCleanHTML(htmlString) {
    //console.log('Before aggressive cleaning:', htmlString);
    
//  Step 0: Convert all &nbsp; to regular spaces first
    htmlString = htmlString.replace(/&nbsp;/g, ' ');
    //console.log('After nbsp conversion:', htmlString);

    var $temp = $('<div>').html(htmlString);

//  Step 1: Remove all React/CF classes (id-6Z-* pattern)
    $temp.find('*').each(function() {
      var $el = $(this);
      var className = $el.attr('class') || '';

  //  Remove classes that match CF pattern (id-6Z-*)
      var cleanedClasses = className
        .split(' ')
        .filter(function(cls) {
          return !cls.match(/^id-6Z-/);
        })
        .join(' ');

      if (cleanedClasses.trim()) {
        $el.attr('class', cleanedClasses.trim());
      } else {
        $el.removeAttr('class');
      }
    });
    
//  Step 2: Convert inline bold styles back to <b> tags
    $temp.find('*').each(function() {
      var $el = $(this);
      var style = $el.attr('style') || '';

  //  Check if element has font-weight: bold in inline styles
      if (style.includes('font-weight:bold') || style.includes('font-weight: bold')) {
        
    //  If it's not already a <b> tag, wrap it in <b>
        if (!$el.is('b')) {
          $el.wrapInner('<b>');
        }

    //  Remove the font-weight from style
        var cleanedStyle = style
          .replace(/font-weight\s*:\s*bold\s*;?/gi, '')
          .replace(/;\s*;/g, ';')  // Clean up double semicolons
          .replace(/^;|;$/g, '');  // Remove leading/trailing semicolons

        if (cleanedStyle.trim()) {
          $el.attr('style', cleanedStyle.trim());
        } else {
          $el.removeAttr('style');
        }
      }
    });
    
//  Step 3: Remove all <span> tags and unwrap content
    while ($temp.find('span').length > 0) {
      $temp.find('span').contents().unwrap();
    }
    
//  Step 4: FIXED - Only merge adjacent tags that are TRULY adjacent (no text between)
  function mergeAdjacentTags(tagName) {
    $temp.find(tagName).each(function() {
      var $current = $(this);
      var $next = $current.next();
      
  //  Check if next element is the same tag AND they are immediately adjacent
      if ($next.length && 
          $next.is(tagName) && 
          $current.attr('class') === $next.attr('class') && 
          $current.attr('style') === $next.attr('style')) {
        
        // Check if there's any text node between them
        var nextSibling = $current[0].nextSibling;
        var hasTextBetween = false;
        
        while (nextSibling && nextSibling !== $next[0]) {
          if (nextSibling.nodeType === 3 && nextSibling.textContent.trim()) {
            hasTextBetween = true;
            break;
          }
          nextSibling = nextSibling.nextSibling;
        }
        
     // Only merge if there's no text between them
        if (!hasTextBetween) {
          $current.append($next.contents());
          $next.remove();
        }
      }
    });
  }
//  Apply merge to each tag type
    mergeAdjacentTags('b');
    mergeAdjacentTags('i');
    mergeAdjacentTags('u');
    mergeAdjacentTags('strike');

    console.log('After aggressive cleaning:', $temp.html());
    return $temp.html();
  }








