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
<<<<<<< HEAD
<<<<<<< HEAD
          //$( window ).resize(function() {
          //  $('.timenav-wrapper').dTimeline('redraw');
          //	});
=======
>>>>>>> 73c76901012f2b7b888bff8b449c6d3dd5838066
=======
          //$( window ).resize(function() {
          //  $('.timenav-wrapper').dTimeline('redraw');
          //	});
>>>>>>> 3622f4d5f04b3abe1b6b1590ac19d03efb915ad9
        timeLine = $('.timenav-wrapper').dTimeline('init', {
          id : Drupal.settings.dTimeline.id,
          nid : Drupal.settings.dTimeline.nid,
          currentTime : parseInt(Drupal.settings.dTimeline.timestamp),
          currentZoom : Drupal.settings.dTimeline.zoom,
          baseURL: Drupal.settings.dTimeline.baseURL,
          mPath: Drupal.settings.dTimeline.mPath
<<<<<<< HEAD
<<<<<<< HEAD
        }).dTimeline('recalc').dTimeline('redraw');
        timeLine.dTimeline('select', $('#marker'+Drupal.settings.dTimeline.nid)[0]);
=======
        }).dTimeline('recalc').dTimeline('redraw').dTimeline('slideto');
        $( window ).resize(function() {
          $('.timenav-wrapper').dTimeline('redraw');
        	});
>>>>>>> 73c76901012f2b7b888bff8b449c6d3dd5838066
=======
        }).dTimeline('recalc').dTimeline('redraw');
        timeLine.dTimeline('select', $('#marker'+Drupal.settings.dTimeline.nid)[0]);
>>>>>>> 3622f4d5f04b3abe1b6b1590ac19d03efb915ad9
      }
    }
  };
})(jQuery);