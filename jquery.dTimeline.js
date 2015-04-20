(function($) {
  var myPlugin, defaultOptions, __bind;
  var defaults = {
    currentPos: 0,
    mouseOverFlagZ: 0,
    rightPoint: [0, 0, 0],
    timelineBorders: [0, 0, 0, 0],
    timeWidth: 0,
    endTime: 0,
    navBarContentHeight: 0,
    rowHeight: 0,
    startTime: 0,
    windowHeight: 0,
    windowWidth: 0
  };
  jQuery.fn.dTimeline = function(action, options) {
    return this
      .each(function() {
        var $this = $(this);
        var data = $this.data('dTimeline');
        if (action === "init") {
          var settings = $.extend({
            delta: 0
          }, defaults, options);
          if (!data)
            $this.data('dTimeline', settings);
        }
        if (action === "select") {
          if (typeof(data.CurrentMarkerId) != "undefined" && data.CurrentMarkerId !== null) {
            $('#' + data.CurrentMarkerId).removeClass('active');
          }
          data.CurrentMarkerId = options.id;
          var markerpos = $(options).position();
          left_pos = data.windowWidth / 2 - markerpos.left;
          options.className = options.className + ' active';
          $('.timenav-content').animate({
            "left": left_pos + "px"
          }, "slow");
          data.currentTime = parseInt(options
            .getAttribute('time'));
          var requestURL = 'http://e.gov.ge/timeline/ajax/getnode/' + options.getAttribute('nid');
          $.ajax({
            url: requestURL
          }).done(
            function(c) {
              $('.features').html(c);
              $('.features .content').css('width',
                data.windowWidth - 220 + 'px');
            });
        }
        if (action === "send_to_back") {
          options.style.zIndex = data.mouseOverFlagZ;
          options.getElementsByClassName('title')[0].style.color = '#999';
          options.getElementsByClassName('line')[0].style.background = '#ccc';
        }
        if (action === "bring_to_front") {
          data.mouseOverFlagZ = options.style.zIndex;
          options.style.zIndex = 1000;
          options.getElementsByClassName('title')[0].style.color = '#444';
          options.getElementsByClassName('line')[0].style.background = '#777';
        }
        if (action === "zoom_out") {
          if (data.currentZoom < 12) {
            data.currentZoom++;

            var requestURL = 'http://e.gov.ge/timeline/ajax/timelinecontent/' + data.currentTime + '/' + data.currentZoom;
            $
              .ajax({
                url: 'http://e.gov.ge/timeline/ajax/timelinecontent/' + data.currentTime + '/' + data.currentZoom
              }).done(function(c) {
                $('timenav-wrapper').html(c);
                $this.dTimeline('init');
                $this.dTimeline('redraw');
              });
          }
        }
        if (action === "zoom_in") {
          if (data.currentZoom > 1) {
            data.currentZoom--;
            var requestURL = 'http://e.gov.ge/timeline/ajax/timelinecontent/' + data.currentTime + '/' + data.currentZoom;
            $
              .ajax({
                url: 'http://e.gov.ge/timeline/ajax/timelinecontent/' + data.currentTime + '/' + data.currentZoom
              }).done(function(c) {
                $('timenav-wrapper').html(c);
                $this.dTimeline('init');
                $this.dTimeline('redraw');
              });
          }
        }
        if (action === "reload") {

        }
        if (action === "setContent") {

        }
        if (action === "redraw") {

          var $this = $(this);
          var data = $this.data('dTimeline');
          data.delta = Math.pow(2, data.currentZoom) * 86400;

          data.windowWidth = window.innerWidth;
          data.windowHeight = window.innerHeight;
          $('#dtimeline .timenav-background .timenav-line')
            .offset({
              left: data.windowWidth / 2 - 1
            });

          $('#dtimeline .timenav-background .timenav-indicator')
            .offset({
              left: data.windowWidth / 2 - 11
            });
          data.timeline = document.getElementById(data.id);
          data.timeline.style.width = data.windowWidth;
          data.timeline.style.height = data.windowHeight - document.getElementById('header').clientHeight + "px";
          data.startTime = data.currentTime - data.delta;
          data.endTime = data.currentTime + data.delta;
          data.navBarContentHeight = data.timeline
            .getElementsByClassName('timenav')[0].clientHeight;
          var navBarContent = data.timeline
            .getElementsByClassName('content')[0];
          navBarContent.style.height = data.navBarContentHeight - 50 + "px";
          data.rowHeight = (data.navBarContentHeight - 50) / 3;
          var timeMarkers = data.timeline
            .getElementsByClassName('marker');
          var markerTime = 0;
          for (i = 0; i < timeMarkers.length; ++i) {
            markerTime = timeMarkers[i].getAttribute('time');
            if (i == 0) {
              data.minTime = markerTime;
              data.maxTime = markerTime;
            } else {
              if (data.minTime > markerTime) {
                data.minTime = markerTime;
              }
              if (data.maxTime < markerTime) {
                data.maxTime = markerTime;
              }
            }
          }
          data.timeWidth = (2 * data.windowWidth - 255) / (data.endTime - data.startTime);
          for (i = 0; i < timeMarkers.length; ++i) {
            markerTime = timeMarkers[i].getAttribute('time');
            markerPos = (markerTime - data.startTime) * data.timeWidth;
            timeMarkers[i].style.left = markerPos + 'px';
            minPoint = 0;
            for (r = 1; r < 3; ++r) {
              if (data.rightPoint[r] < data.rightPoint[minPoint]) {
                minPoint = r;
              }
            }
            data.rightPoint[i % 3] = markerPos + 255;
            timeMarkers[i].getElementsByClassName('flag')[0].style.top = data.rowHeight * (minPoint) + 1 + "px";
            timeMarkers[i].getElementsByClassName('flag')[0].style.height = data.rowHeight - 3 + "px";
          }
          timenavContent = data.timeline
            .getElementsByClassName('timenav-content')[0];
          timenavContent.style.height = data.navBarContentHeight - 50 + "px";
          timelineWidth = 2 * data.windowWidth;
          timenavContent.style.width = timelineWidth + "px";
          navBarContent.style.width = timelineWidth + "px";
          timeBar = timenavContent.getElementsByClassName('time')[0];
          timeBar.style.width = timelineWidth + "px";
          var br = data.timeline
            .getElementsByClassName('timenav')[0]
            .getBoundingClientRect();
          data.timelineBorders = [br.top, 0, br.bottom,
            br.width - timelineWidth
          ];
          data.currentPos = -(data.windowWidth / 2);
        }
      });
  };
})(jQuery);