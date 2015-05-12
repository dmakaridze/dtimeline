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
          //$( window ).resize(function() {
          //  $('.timenav-wrapper').dTimeline('redraw');
          //	});
        timeLine = $('.timenav-wrapper').dTimeline('init', {
          id : Drupal.settings.dTimeline.id,
          nid : Drupal.settings.dTimeline.nid,
          currentTime : parseInt(Drupal.settings.dTimeline.timestamp),
          currentZoom : Drupal.settings.dTimeline.zoom,
          baseURL: Drupal.settings.dTimeline.baseURL,
          mPath: Drupal.settings.dTimeline.mPath
        }).dTimeline('recalc').dTimeline('redraw');
        timeLine.dTimeline('select', $('#marker'+Drupal.settings.dTimeline.nid)[0]);
      }
    }
  };
})(jQuery);