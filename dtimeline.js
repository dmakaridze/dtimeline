/**
 * @file dtimeline.js
 * 
 * Version: 1.x Drupal Core: 7.x
 * 
 */
var timeLine;
(function($) {
  Drupal.behaviors.pathFieldsetSummaries = {
    attach : function(context) {
      if (typeof (Drupal.settings.dTimeline) != 'undefined') {
        timeLine = $('.timenav-wrapper');
        timeLine.dTimeline('init', {
          id : Drupal.settings.dTimeline.id,
          currentTime : parseInt(Drupal.settings.dTimeline.timestamp),
          currentZoom : Drupal.settings.dTimeline.zoom
        });
        timeLine.dTimeline('redraw');
      }
    }
  };
})(jQuery);