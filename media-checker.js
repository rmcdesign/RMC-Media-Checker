//source: http://zerosixthree.se/detecting-media-queries-with-javascript/

'use strict';
var RMC_media_check = (function (parent, $) {

  var MediaQueryListener = function() {
    this.afterElement = window.getComputedStyle ? window.getComputedStyle(document.body, ':after') : false;
    this.currentBreakpoint = '';
    this.lastBreakpoint = '';
    this.init();
  };

  MediaQueryListener.prototype = {
    init: function () {
      var self = this;
      if(!self.afterElement) {
        return;
      }
      self._resizeListener();
    },
    _resizeListener: function () {
      var self = this;
      $(window).on('resize orientationchange load', function() {
        // Regexp for removing quotes added by various browsers
        self.currentBreakpoint = self.afterElement.getPropertyValue('content').replace(/^["']|["']$/g, '');
        if (self.currentBreakpoint !== self.lastBreakpoint) {
          console.log(self.currentBreakpoint);
          $(window).trigger('breakpoint-change', self.currentBreakpoint);
          self.lastBreakpoint = self.currentBreakpoint;
        }
      });
    }
  };

  parent.mediaqueryListener = parent.mediaqueryListener || new MediaQueryListener();
  return parent;

}(RMC_media_check || {}, jQuery));

$(window).on('breakpoint-change', function(e, breakpoint) {
  if(breakpoint === 'sm') {
    document.body.innerHTML = 'CSS Breakpoint <span>screen-small</span>';
  }
  if(breakpoint === 'md') {
    document.body.innerHTML = 'CSS Breakpoint <span>screen-medium</span>';
  }
  if(breakpoint === 'lg') {
    document.body.innerHTML = 'CSS Breakpoint <span>screen-large</span>';
  }
});
