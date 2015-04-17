/**
 * @file dtimeline.js
 * 
 * Version: 1.x Drupal Core: 7.x
 * 
 */
var dTimeline = {};
var setContent = function() {
  if (this.status === 200) {
    dTimeline.timeline = document.getElementById(dTimeline.id);
    timenavContent = dTimeline.timeline.getElementsByClassName('timenav-content')[0];
    timenavWrapper = dTimeline.timeline.getElementsByClassName('timenav-wrapper')[0];
    timenavContent.innerHTML = this.responseText;
    dTimeline.init();
    dTimeline.redraw_timeline();
  }
}
dTimeline.zoom_in = function() {
  if (this.currentZoom < 12) {
    this.currentZoom++;
    var request = new XMLHttpRequest();
    request.onload = setContent;
    var requestURL = 'http://e.gov.ge/timeline/ajax/timelinecontent/'
      + this.currentTime + '/' + this.currentZoom;
    request.open('GET', requestURL);
    request.send(null);
  }
};
dTimeline.reload = function() {
    var request = new XMLHttpRequest();
    request.onload = setContent;
    var requestURL = 'http://e.gov.ge/timeline/ajax/timelinecontent/'
      + this.currentTime + '/' + this.currentZoom;
    request.open('GET', requestURL);
    request.send(null);
};
dTimeline.zoom_out = function() {
  if (this.currentZoom > 1) {
    this.currentZoom--;
    var request = new XMLHttpRequest();
    request.onload = setContent;
    var requestURL = 'http://e.gov.ge/timeline/ajax/timelinecontent/'
      + this.currentTime + '/' + this.currentZoom;
    request.open('GET', requestURL);
    request.send(null);
  }
};
dTimeline.bring_to_front = function(flag) {
  this.mouseOverFlagZ = flag.style.zIndex;
  flag.style.zIndex = 1000;
  flag.getElementsByClassName('title')[0].style.color = '#444';
  flag.getElementsByClassName('line')[0].style.background = '#777';
};
dTimeline.send_to_back = function(flag) {
  flag.style.zIndex = this.mouseOverFlagZ;
  flag.getElementsByClassName('title')[0].style.color = '#999';
  flag.getElementsByClassName('line')[0].style.background = '#ccc';
};
dTimeline.redraw_timeline = function() {
  this.windowWidth = window.innerWidth;
  this.windowHeight = window.innerHeight;
  this.timeline = document.getElementById(this.id);
  this.timeline.style.width = this.windowWidth;
  this.timeline.style.height = this.windowHeight
      - document.getElementById('header').clientHeight + "px";
  this.startTime = this.currentTime - this.delta;
  this.endTime = this.currentTime + this.delta;
  this.navBarContentHeight = this.timeline.getElementsByClassName('timenav')[0].clientHeight;
  var navBarContent = this.timeline.getElementsByClassName('content')[0];
  navBarContent.style.height = this.navBarContentHeight - 50 + "px";
  this.rowHeight = (this.navBarContentHeight - 50) / 3;
  var timeMarkers = this.timeline.getElementsByClassName('marker');
  var markerTime = 0;
  for (i = 0; i < timeMarkers.length; ++i) {
    markerTime = timeMarkers[i].getAttribute('time');
    if (i == 0) {
      this.minTime = markerTime;
      this.maxTime = markerTime;
    } else {
      if (this.minTime > markerTime) {
        this.minTime = markerTime;
      }
      if (this.maxTime < markerTime) {
        this.maxTime = markerTime;
      }
    }
  }
  this.timeWidth = (2 * this.windowWidth - 255)
      / (this.endTime - this.startTime);
  for (i = 0; i < timeMarkers.length; ++i) {
    markerTime = timeMarkers[i].getAttribute('time');
    markerPos = (markerTime - this.startTime) * this.timeWidth;
    timeMarkers[i].style.left = markerPos + 'px';
    minPoint = 0;
    for (r = 1; r < 3; ++r) {
      if (this.rightPoint[r] < this.rightPoint[minPoint]) {
        minPoint = r;
      }
    }
    this.rightPoint[i % 3] = markerPos + 255;
    timeMarkers[i].getElementsByClassName('flag')[0].style.top = this.rowHeight
        * (minPoint) + 1 + "px";
    timeMarkers[i].getElementsByClassName('flag')[0].style.height = this.rowHeight
        - 3 + "px";
  }
  timenavContent = this.timeline.getElementsByClassName('timenav-content')[0];
  timenavContent.style.height = this.navBarContentHeight - 50 + "px";
  timelineWidth = 2 * this.windowWidth;
  timenavContent.style.width = timelineWidth + "px";
  navBarContent.style.width = timelineWidth + "px";
  timeBar = timenavContent.getElementsByClassName('time')[0];
  timeBar.style.width = timelineWidth + "px";
  var br = this.timeline.getElementsByClassName('timenav')[0]
      .getBoundingClientRect();
  this.timelineBorders = [ br.top, 0, br.bottom, br.width - timelineWidth ];
  this.currentPos = -(this.windowWidth / 2);
};
dTimeline.init = function() {
  this.currentPos = 0; // timeline left corner position
  this.delta = Math.pow(2, this.currentZoom) * 86400;
  this.id = Drupal.settings.dTimeline.id;
  this.mouseOverFlagZ = 0; // mouseover flag z index
  this.rightPoint = [ 0, 0, 0 ]; // rightpoints for rows
  this.timelineBorders = [ 0, 0, 0, 0 ]; // timeline borders
  this.timeWidth = 0; // 
  this.endTime = 0; // 
  this.navBarContentHeight = 0; // 
  this.rowHeight = 0; // 
  this.startTime = 0; // 
  this.windowHeight = 0; // 
  this.windowWidth = 0; // 
};
(function($) {
  Drupal.behaviors.pathFieldsetSummaries = {
    attach : function(context) {
      if (typeof (Drupal.settings.dTimeline) != 'undefined') {
        dTimeline.currentTime = parseInt(Drupal.settings.dTimeline.timestamp);
        dTimeline.currentZoom = parseInt(Drupal.settings.dTimeline.zoom);
        dTimeline.init();
        dTimeline.redraw_timeline();
        $timenav_wrapper = $('#' + dTimeline.id + ' .timenav-wrapper');

      }
    }
  };
})(jQuery);