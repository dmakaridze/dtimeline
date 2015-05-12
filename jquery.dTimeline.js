(function($) {
  var defaults = {
<<<<<<< HEAD
<<<<<<< HEAD
    selector: ".timenav-wrapper",
=======
>>>>>>> 73c76901012f2b7b888bff8b449c6d3dd5838066
=======
    selector: ".timenav-wrapper",
>>>>>>> 3622f4d5f04b3abe1b6b1590ac19d03efb915ad9
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
<<<<<<< HEAD
<<<<<<< HEAD
    minTime: 0,
    maxTime:0,
=======
    maxTime: 0,
    minTime: 0,
>>>>>>> 73c76901012f2b7b888bff8b449c6d3dd5838066
=======
    minTime: 0,
    maxTime:0,
>>>>>>> 3622f4d5f04b3abe1b6b1590ac19d03efb915ad9
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 3622f4d5f04b3abe1b6b1590ac19d03efb915ad9
    markerW: 220,
    setPos: function(position) {
      if (position != this.currentPos) {
        this.currentPos = position;
        /*if (this.currentPos > 0) {
          this.currentTime = (this.winW / 2 - this.currentPos) / this.timeW + this.startTime;
          $(this.selector).dTimeline('recalc');
          var requestURL = this.baseURL + '/timelinecontent/' + (this.startTime - this.delta / 2) + '/' + (this.endTime - this.delta / 2);
          $.ajax({
            url: requestURL
          }).done(
            function(c) {
              $(this.selector + '.timenav-content').empty().html(c);
              this.currentPos = -(window.innerWidth / 2);
              $(this.selector).dTimeline('recalc').dTimeline('redraw').dTimeline('slideto');
              window.history.pushState({}, "",
                this.baseURL + '/dtimeline/' + this.nid + '/' + this.currentZoom);
            });
        } else if (this.currentPos < -10000) {

        }*/
      }
    }
<<<<<<< HEAD
=======
    markerW: 220
>>>>>>> 73c76901012f2b7b888bff8b449c6d3dd5838066
=======
>>>>>>> 3622f4d5f04b3abe1b6b1590ac19d03efb915ad9
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
<<<<<<< HEAD
<<<<<<< HEAD
          data.setPos(- window.innerWidth / 2);
=======
>>>>>>> 73c76901012f2b7b888bff8b449c6d3dd5838066
=======
          data.setPos(- window.innerWidth / 2);
>>>>>>> 3622f4d5f04b3abe1b6b1590ac19d03efb915ad9
        }
        if (action === 'recalc') {
          data.delta = Math.pow(2, data.currentZoom) * 86400;
          data.winW = window.innerWidth;
          data.winH = window.innerHeight;
          data.startTime = data.currentTime - data.delta;
          data.endTime = data.currentTime + data.delta;
<<<<<<< HEAD
<<<<<<< HEAD
          data.minTime = minTime;
          data.maxTime = maxTime;
=======
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
>>>>>>> 73c76901012f2b7b888bff8b449c6d3dd5838066
=======
          data.minTime = minTime;
          data.maxTime = maxTime;
>>>>>>> 3622f4d5f04b3abe1b6b1590ac19d03efb915ad9
        }
        if (action === "select") {
          if (!data.dragged) {
            $('#' + data.currentMarkerId).removeClass('active');
            data.currentMarkerId = options.id;
            $currentMarker = $("#" + data.currentMarkerId);
            $currentMarker.addClass('active');
<<<<<<< HEAD
<<<<<<< HEAD
            data.setPos(data.winW / 2 - $currentMarker.position().left);
            $('.timenav-content').animate({
              "left": data.currentPos
            }, "slow");

            data.currentTime = parseInt($currentMarker.attr('time'));

=======
=======
            data.setPos(data.winW / 2 - $currentMarker.position().left);
>>>>>>> 3622f4d5f04b3abe1b6b1590ac19d03efb915ad9
            $('.timenav-content').animate({
              "left": data.currentPos
            }, "slow");

            data.currentTime = parseInt($currentMarker.attr('time'));
<<<<<<< HEAD
>>>>>>> 73c76901012f2b7b888bff8b449c6d3dd5838066
=======

>>>>>>> 3622f4d5f04b3abe1b6b1590ac19d03efb915ad9
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
<<<<<<< HEAD
<<<<<<< HEAD
            $this.dTimeline('recalc');
            var requestURL = data.baseURL + '/timelinecontent/' + data.startTime + '/' + data.endTime;
=======
            var requestURL = data.baseURL + '/timelinecontent/' + data.currentTime + '/' + data.currentZoom;
>>>>>>> 73c76901012f2b7b888bff8b449c6d3dd5838066
=======
            $this.dTimeline('recalc');
            var requestURL = data.baseURL + '/timelinecontent/' + data.startTime + '/' + data.endTime;
>>>>>>> 3622f4d5f04b3abe1b6b1590ac19d03efb915ad9
            $.ajax({
              url: requestURL
            }).done(
              function(c) {
                $('.timenav-wrapper .timenav-content').empty().html(c);
<<<<<<< HEAD
<<<<<<< HEAD
                data.setPos(-(window.innerWidth / 2));
=======
                $this.dTimeline('recalc');
>>>>>>> 73c76901012f2b7b888bff8b449c6d3dd5838066
=======
                data.setPos(-(window.innerWidth / 2));
>>>>>>> 3622f4d5f04b3abe1b6b1590ac19d03efb915ad9
                $this.dTimeline('redraw');
                window.history.pushState({}, "",
                  data.baseURL + '/dtimeline/' + data.nid + '/' + data.currentZoom);
              });
          }
        }
        if (action === "zoom_in") {
          if (data.currentZoom > 1) {
            data.currentZoom--;
<<<<<<< HEAD
<<<<<<< HEAD
            $this.dTimeline('recalc');
            var requestURL = data.baseURL + '/timelinecontent/' + data.startTime + '/' + data.endTime;
=======
            var requestURL = data.baseURL + '/timelinecontent/' + data.currentTime + '/' + data.currentZoom;
>>>>>>> 73c76901012f2b7b888bff8b449c6d3dd5838066
=======
            $this.dTimeline('recalc');
            var requestURL = data.baseURL + '/timelinecontent/' + data.startTime + '/' + data.endTime;
>>>>>>> 3622f4d5f04b3abe1b6b1590ac19d03efb915ad9
            $.ajax({
              url: requestURL
            }).done(
              function(c) {
                $('.timenav-wrapper .timenav-content').empty().html(c);
<<<<<<< HEAD
<<<<<<< HEAD
                data.setPos(-(window.innerWidth / 2));
=======
                $this.dTimeline('recalc');
>>>>>>> 73c76901012f2b7b888bff8b449c6d3dd5838066
=======
                data.setPos(-(window.innerWidth / 2));
>>>>>>> 3622f4d5f04b3abe1b6b1590ac19d03efb915ad9
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
<<<<<<< HEAD
<<<<<<< HEAD
          //data.timeW = (2 * data.winW /*- 255*/ ) / (data.endTime - data.startTime);
          data.timeW = 32/(Math.pow(2,data.currentZoom)*86400);
          var timelineWidth = 0;
          $(data.timeline).find('.marker').each(function(i) {
            //var markerPos = ($(this).attr('time') - data.startTime) * data.timeW;
            var markerPos = ($(this).attr('time') - data.minTime) * data.timeW;
=======
          var timeMarkers = $(data.timeline).find('.marker');
          data.timeW = (2 * data.winW - 255) / (data.endTime - data.startTime);
          $(data.timeline).find('.marker').each(function(i) {
            var markerPos = ($(this).attr('time') - data.startTime) * data.timeW;
>>>>>>> 73c76901012f2b7b888bff8b449c6d3dd5838066
=======
          //data.timeW = (2 * data.winW /*- 255*/ ) / (data.endTime - data.startTime);
          data.timeW = 32/(Math.pow(2,data.currentZoom)*86400);
          var timelineWidth = 0;
          $(data.timeline).find('.marker').each(function(i) {
            //var markerPos = ($(this).attr('time') - data.startTime) * data.timeW;
            var markerPos = ($(this).attr('time') - data.minTime) * data.timeW;
>>>>>>> 3622f4d5f04b3abe1b6b1590ac19d03efb915ad9
            $(this).css('left', markerPos);
            var minPoint = 0;
            for (r = 1; r < 3; ++r) {
              if (data.rightPoint[r] < data.rightPoint[minPoint]) {
                minPoint = r;
              }
<<<<<<< HEAD
            }
            data.rightPoint[i % 3] = markerPos + 255;
            $(this).find('.flag').css('top', data.rowHeight * (minPoint) + 1)
              .height(data.rowHeight - 3);
            if (markerPos > timelineWidth) {
              timelineWidth = markerPos;
            }
          });
          var prevLabRightPoint = -50;
          $(data.timeline).find('.time-interval div').each(function(i) {
            var labelPos = ($(this).attr('time') - data.minTime) * data.timeW;
            $(this).css('left', labelPos);
            if (labelPos < prevLabRightPoint + 50) {
              $(this).hide();
            } else {
              $(this).show();
              prevLabRightPoint = labelPos + $(this).width();
            }          
          });
          var firstLabel = true;
          $(data.timeline).find('.time-interval-major div').each(function(i) {
            var labelPos = ($(this).attr('time') - data.minTime) * data.timeW;
            if (firstLabel) {
              labelPos = 0;
              firstLabel = false;
            }
            $(this).css('left', labelPos);
          });
          timelineWidth += 255;
          timenavContent = $(data.timeline).find('.timenav-content');
          //timenavContent.height(data.navBarContentHeight - data.timeH).width(2 * data.winW);
          timenavContent.height(data.navBarContentHeight - data.timeH).width(timelineWidth);
          timeBar = timenavContent.find('.time');
          //timeBar.width(2 * data.winW);
          timeBar.width(timelineWidth);
          
          //for (t=data.minTime; t<data.maxTime; t+=(86400)){
        	//  var d = new Date(t*1000);
        	//  $('.time-interval').append('<div>'+d.getMonth()+' '+d.getDate()+'</div>')
          //}
          $(".time-interval div").each(function (){});
=======
            }
            data.rightPoint[i % 3] = markerPos + 255;
            $(this).find('.flag').css('top', data.rowHeight * (minPoint) + 1)
              .height(data.rowHeight - 3);
            if (markerPos > timelineWidth) {
              timelineWidth = markerPos;
            }
          });
          var prevLabRightPoint = -50;
          $(data.timeline).find('.time-interval div').each(function(i) {
            var labelPos = ($(this).attr('time') - data.minTime) * data.timeW;
            $(this).css('left', labelPos);
            if (labelPos < prevLabRightPoint + 50) {
              $(this).hide();
            } else {
              $(this).show();
              prevLabRightPoint = labelPos + $(this).width();
            }          
          });
          var firstLabel = true;
          $(data.timeline).find('.time-interval-major div').each(function(i) {
            var labelPos = ($(this).attr('time') - data.minTime) * data.timeW;
            if (firstLabel) {
              labelPos = 0;
              firstLabel = false;
            }
            $(this).css('left', labelPos);
          });
          timelineWidth += 255;
          timenavContent = $(data.timeline).find('.timenav-content');
          //timenavContent.height(data.navBarContentHeight - data.timeH).width(2 * data.winW);
          timenavContent.height(data.navBarContentHeight - data.timeH).width(timelineWidth);
          timeBar = timenavContent.find('.time');
<<<<<<< HEAD
          timeBar.width(2 * data.winW);
>>>>>>> 73c76901012f2b7b888bff8b449c6d3dd5838066
=======
          //timeBar.width(2 * data.winW);
          timeBar.width(timelineWidth);
          
          //for (t=data.minTime; t<data.maxTime; t+=(86400)){
        	//  var d = new Date(t*1000);
        	//  $('.time-interval').append('<div>'+d.getMonth()+' '+d.getDate()+'</div>')
          //}
          $(".time-interval div").each(function (){});
>>>>>>> 3622f4d5f04b3abe1b6b1590ac19d03efb915ad9
          data.dragged = false;
          $('.timenav-content')
            .draggable()
            .draggable({
              start: function(event, ui) {
                data.dragged = true;
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 3622f4d5f04b3abe1b6b1590ac19d03efb915ad9
                $('#' + data.currentMarkerId).removeClass('active');
              },
              stop: function(event, ui) {
                  data.dragged = false;
              },
              drag: function(event, ui) {
                data.setPos(ui.position.left);
<<<<<<< HEAD
=======
                if (typeof(data.currentMarkerId) != "undefined" && data.currentMarkerId !== null) {
                  $(
                      '#' + data.currentMarkerId)
                    .removeClass(
                      'active');
                };
>>>>>>> 73c76901012f2b7b888bff8b449c6d3dd5838066
=======
>>>>>>> 3622f4d5f04b3abe1b6b1590ac19d03efb915ad9
              },
              axis: "x"
            });

        }
      });
  };
})(jQuery);