(function($) {
  var defaults = {
    selector: ".timenav-wrapper",
    id: "dtimeline",
    mPath: "", // Module path in Drupal directory
    baseURL: "", // Base url for dTimeline jQuery module
    winH: 0, // Window height
    winW: 0, // Window width
    timeW: 0, // 
    currentTime: 0,
    currentZoom: 0,
    minTime: 0,
    maxTime:0,
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
    markerW: 220,
    setPos: function(position) {
      if (position != this.currentPos) {
        this.currentPos = position;
        this.currentTime = Math.round(this.minTime - (this.currentPos - this.winW / 2)/this.timeW);
      }
    }
  };
  var dragMomentum = new function () {    
    var howMuch = 300;
    var easeType = 'easeOutQuad';
    var dXa =[0];
    var dTa =[0];
    this.start = function (elemId, Xa, Ta)  {
        dXa[elemId] = Xa;
        dTa[elemId] = Ta;
      };
    this.end = function (elemId, Xb, Tb)  {        
        var newLocX = $('#'+elemId).position().left - Math.round(((dXa[elemId]-Xb) / (Tb - dTa[elemId]))*howMuch) ;
        $('#'+elemId).animate({ left:newLocX }, 700, easeType );
    };

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
          data.setPos(- window.innerWidth / 2);
        }
        if (action === 'recalc') {
          data.winW = window.innerWidth;
          data.winH = window.innerHeight;
          data.timeW = 256/(Math.pow(2,data.currentZoom/4)*86400);
          data.currentPos = (data.minTime - data.currentTime)*data.timeW+ data.winW /2;
        }
        if (action === "select") {
          if (!data.dragged) {
            $('#' + data.currentMarkerId).removeClass('active');
            data.currentMarkerId = options.id;
            $currentMarker = $("#" + data.currentMarkerId);
            $currentMarker.addClass('active');
            data.setPos(data.winW / 2 - $currentMarker.position().left);
            $('.timenav-content').animate({
              "left": data.currentPos
            }, 800);
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
            $this.dTimeline('recalc');
            $this.dTimeline('redraw');
            $('.timenav-content').hide().css("left", data.currentPos).show();
            window.history.pushState({}, "",
              data.baseURL + '/dtimeline/' + data.nid + '/' + data.currentZoom);
          }
        }
        if (action === "zoom_in") {
          if (data.currentZoom > 1) {
            data.currentZoom--;
            $this.dTimeline('recalc');
            $this.dTimeline('redraw');
            $('.timenav-content').hide().css("left", data.currentPos).show();
            window.history.pushState({}, "",
                data.baseURL + '/dtimeline/' + data.nid + '/' + data.currentZoom);
          }
        }
        if (action === "reload") {
        }
        if (action === "setContent") {
        }
        if (action === "redraw") {
          $('.timenav-content').hide();
          var timeNavLine = $('#dtimeline .timenav-background .timenav-line');
          timeNavLine.offset({
            left: (data.winW - timeNavLine.width()) / 2
          });
          var timeNavIndicator = $('#dtimeline .timenav-background .timenav-indicator');
          timeNavIndicator.offset({
            left: (data.winW - timeNavIndicator.width()) / 2
          });
          $(data.timeline).width(data.winW);
          $(data.timeline).height(data.winH - $('#page header').height() - 45);
          data.navBarContentHeight = $(data.timeline).find('.timenav').height();
          data.featuresContentHeight = data.winH - $('#page header').height() - 43 - data.navBarContentHeight;
          $(data.timeline).find('.content').height(data.navBarContentHeight - data.timeH);
          data.rowHeight = (data.navBarContentHeight - data.timeH) / 3;
          var timelineWidth = 0;
          $(data.timeline).find('.marker').each(function(i) {
            var markerPos = ($(this).attr('time') - data.minTime) * data.timeW;
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
          timenavContent.height(data.navBarContentHeight - data.timeH).width(timelineWidth);
          timeBar = timenavContent.find('.time');
          timeBar.width(timelineWidth);
          $(".time-interval div").each(function (){});
          data.dragged = false;

          $('.timenav-content')
            .draggable()
            .draggable({
              start: function(event, ui) {
                data.dragged = true;
                $('#' + data.currentMarkerId).removeClass('active');
                dragMomentum.start(this.id, event.clientX, event.timeStamp);
              },
              stop: function(event, ui) {
                dragMomentum.end(this.id, event.clientX, event.timeStamp);
              },
              drag: function(event, ui) {
                data.setPos(ui.position.left);
                var dddate = new Date(data.currentTime * 1000);
              },
              containment: [data.winW/2-$('.timenav-content').width(),0,data.winW/2,data.winH],
              axis: "x"
            });

          $(".flag").click(function(mouseEvent){timeLine.dTimeline('select',this.parentNode);});
          $(".flag").mouseover(function(mouseEvent){timeLine.dTimeline('bring_to_front',this.parentNode);});
          $(".flag").mouseout(function(mouseEvent){timeLine.dTimeline('send_to_back',this.parentNode);});
          $('.timenav-content').show();
        }
      });
  };
})(jQuery);