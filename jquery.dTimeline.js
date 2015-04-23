(function($) {
  var defaults = {
    id: "dtimeline",
    mPath: "", // Module path in Drupal directory
    baseURL: "", // Base url for dTimeline jQuery module
    winH: 0, // Window height
    winW: 0, // Window width
    timeW: 0, // 
    currentTime: 0,
    currentZoom: 0,
    delta: 0, //
    startTime: 0, // Timeline start timestamp
    endTime: 0, // Timeline end timestamp
    maxTime: 0,
    minTime: 0,
    nid: 0, // Current marker nid
    currentPos: 0, // Timeline current position
    currentMarkerId: "",
    rowHeight: 0, // Timeline row height
    mouseOverFlagZ: 0,
    rightPoint: [0, 0, 0],
    navBarContentHeight: 0,
    featuresContentHeight: 0,
    dragged: false,
    timeline: {}, // Timeline DOM object
    markerW: 220
  };
  jQuery.fn.dTimeline = function(action, options) {
    return this
      .each(function() {
        var $this = $(this);
        var data = $this.data('dTimeline');
        if (action === "init") {
          var settings = $.extend({}, defaults, options);
          if (!data) {
            $this.data('dTimeline', settings);
            data = $this.data('dTimeline');
          }
          data.timeline = document.getElementById(data.id);
          data.timeH = $(data.timeline).find('.timenav .time').height();
        }
        if (action === 'recalc') {
          data.delta = Math.pow(2, data.currentZoom) * 86400;
          data.winW = window.innerWidth;
          data.winH = window.innerHeight;
          data.startTime = data.currentTime - data.delta;
          data.endTime = data.currentTime + data.delta;
          data.currentPos = -(data.winW / 2);
        }
        if (action === "slideto") {
          $('#' + data.currentMarkerId).removeClass('active');
          data.currentMarkerId = "marker" + data.nid;
          $currentMarker = $("#" + data.currentMarkerId);
          $currentMarker.addClass('active');
          $('.timenav-content').animate({
            "left": data.winW / 2 - $currentMarker.position().left
          }, "slow");
          data.currentTime = parseInt($currentMarker.attr('time'));
          $.ajax({
            url: data.baseURL + '/getnode/' + data.nid
          }).done(
            function(c) {
              $('.features').html(c);
              $('.features .content').width(data.winW - 230).height(data.featuresContentHeight);
            });
        }
        if (action === "select") {
          if (!data.dragged) {
            $('#' + data.currentMarkerId).removeClass('active');
            data.currentMarkerId = options.id;
            $currentMarker = $("#" + data.currentMarkerId);
            $currentMarker.addClass('active');
            $('.timenav-content').animate({
              "left": data.winW / 2 - $currentMarker.position().left
            }, "slow");
            data.currentTime = parseInt($currentMarker.attr('time'));
            data.nid = parseInt($currentMarker.attr('nid'));
            var requestURL = data.baseURL + '/getnode/' + data.nid;
            $.ajax({
              url: requestURL
            }).done(
              function(c) {
                $('.features').html(c);
                $('.features .content').width(data.winW - 230).height(data.featuresContentHeight);
                window.history.pushState({}, "",
                  data.baseURL + '/dtimeline/' + data.nid + '/' + data.currentZoom);
              });
          } else {
            data.dragged = false;
          }
        }
        if (action === "send_to_back") {
          $(options).zIndex(data.mouseOverFlagZ).find('.title').css('color', '#999');
          $(options).find('.line').css('background', '#ccc');
        }
        if (action === "bring_to_front") {
          data.mouseOverFlagZ = $(options).zIndex();
          $(options).zIndex(1000).find('.title').css('color', '#444');
          $(options).find('.line').css('background', '#777');
        }
        if (action === "zoom_out") {
          if (data.currentZoom < 12) {
            data.currentZoom++;
            var requestURL = data.baseURL + '/timelinecontent/' + data.currentTime + '/' + data.currentZoom;
            $.ajax({
              url: requestURL
            }).done(
              function(c) {
                $('.timenav-wrapper .timenav-content').empty().html(c);
                $this.dTimeline('recalc');
                $this.dTimeline('redraw');
                window.history.pushState({}, "",
                  data.baseURL + '/dtimeline/' + data.nid + '/' + data.currentZoom);
              });
          }
        }
        if (action === "zoom_in") {
          if (data.currentZoom > 1) {
            data.currentZoom--;
            var requestURL = data.baseURL + '/timelinecontent/' + data.currentTime + '/' + data.currentZoom;
            $.ajax({
              url: requestURL
            }).done(
              function(c) {
                $('.timenav-wrapper .timenav-content').empty().html(c);
                $this.dTimeline('recalc');
                $this.dTimeline('redraw');
                window.history.pushState({}, "",
                  data.baseURL + '/dtimeline/' + data.nid + '/' + data.currentZoom);
              });
          }
        }
        if (action === "reload") {

        }
        if (action === "setContent") {

        }
        if (action === "redraw") {
          var timeNavLine = $('#dtimeline .timenav-background .timenav-line');
          timeNavLine.offset({
            left: (data.winW - timeNavLine.width()) / 2
          });
          var timeNavIndicator = $('#dtimeline .timenav-background .timenav-indicator');
          timeNavIndicator.offset({
            left: (data.winW - timeNavIndicator.width()) / 2
          });
          $(data.timeline).width(data.winW);
          $(data.timeline).height(data.winH - $('#page header').height() - 43);
          data.navBarContentHeight = $(data.timeline).find('.timenav').height();
          data.featuresContentHeight = data.winH - $('#page header').height() - 43 - data.navBarContentHeight;
          $(data.timeline).find('.content').height(data.navBarContentHeight - data.timeH);
          data.rowHeight = (data.navBarContentHeight - data.timeH) / 3;
          var timeMarkers = $(data.timeline).find('.marker');
          data.timeW = (2 * data.winW - 255) / (data.endTime - data.startTime);
          $(data.timeline).find('.marker').each(function(i) {
            var markerPos = ($(this).attr('time') - data.startTime) * data.timeW;
            $(this).css('left', markerPos);
            var minPoint = 0;
            for (r = 1; r < 3; ++r) {
              if (data.rightPoint[r] < data.rightPoint[minPoint]) {
                minPoint = r;
              }
            }
            data.rightPoint[i % 3] = markerPos + 255;
            $(this).find('.flag').css('top', data.rowHeight * (minPoint) + 1)
              .height(data.rowHeight - 3);
          })

          timenavContent = $(data.timeline).find('.timenav-content');
          timenavContent.height(data.navBarContentHeight - data.timeH).width(2 * data.winW);
          timeBar = timenavContent.find('.time');
          timeBar.width(2 * data.winW);
          data.dragged = false;
          $('.timenav-content')
            .draggable()
            .draggable({
              start: function(event, ui) {
                data.dragged = true;
                if (typeof(data.currentMarkerId) != "undefined" && data.currentMarkerId !== null) {
                  $(
                      '#' + data.currentMarkerId)
                    .removeClass(
                      'active');
                };
              },
              axis: "x"
            });

        }
      });
  };
})(jQuery);