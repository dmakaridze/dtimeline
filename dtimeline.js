/**
 * @file dtimeline.js
 * 
 * Version: 1.x Drupal Core: 7.x
 * 
 */
var dTimeline = {};

dTimeline.zoom_in = function() {
	if (currentZoom > 1) {
		currentZoom++;
		var request = new XMLHttpRequest();
		request.open('GET', 'http://e.gov.ge/timeline/ajax/timelinecontent/'
				+ this.currentTime + '/' + currentZoom, false);
		request.send(null);

		if (request.status === 200) {
			dTimeline = document.getElementById(this.id);
			timenavContent = dTimeline
					.getElementsByClassName('timenav-content')[0];
			timenavContent.innerHTML = request.responseText;
		}
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
	var dTimelineElement = document.getElementById(this.id);
	dTimelineElement.style.width = this.windowWidth;
	dTimelineElement.style.height = this.windowHeight
			- document.getElementById('header').clientHeight + "px";
	this.startTime = this.currentTime - this.delta;
	this.navBarContentHeight = dTimelineElement.getElementsByClassName('timenav')[0].clientHeight;
	var navBarContent = dTimelineElement.getElementsByClassName('content')[0];
	navBarContent.style.height = this.navBarContentHeight - 50 + "px";
	this.rowHeight = (this.navBarContentHeight - 50) / 3;
	var timeMarkers = dTimelineElement.getElementsByClassName('marker');
	var leftPos = 0;
	for (i = 0; i < timeMarkers.length; ++i) {
		leftPos = timeMarkers[i].getAttribute('time');
		if (i == 0) {
			this.minLeft = leftPos;
			this.maxLeft = leftPos;
		} else {
			if (this.minLeft > leftPos) {
				this.minLeft = leftPos;
			}
			if (this.maxLeft < leftPos) {
				this.maxLeft = leftPos;
			}
		}
	}
	this.timeWidth = (2 * this.windowWidth - 255) / (this.maxLeft - this.minLeft);
	for (i = 0; i < timeMarkers.length; ++i) {
		leftPos = (timeMarkers[i].getAttribute('time') - this.minLeft) * this.timeWidth;
		timeMarkers[i].style.left = leftPos + 'px';
		minPoint = 0;
		for (r = 1; r < 3; ++r) {
			if (this.rightPoint[r] < this.rightPoint[minPoint]) {
				minPoint = r;
			}
		}
		this.rightPoint[i % 3] = leftPos + 255;
		timeMarkers[i].getElementsByClassName('flag')[0].style.top = this.rowHeight
				* (minPoint) + 1 + "px";
		timeMarkers[i].getElementsByClassName('flag')[0].style.height = this.rowHeight
				- 3 + "px";
	}
	timenavContent = dTimelineElement.getElementsByClassName('timenav-content')[0];
	timenavContent.style.height = this.navBarContentHeight - 50 + "px";
	timelineWidth = 2 * this.windowWidth;
	timenavContent.style.width = timelineWidth + "px";
	navBarContent.style.width = timelineWidth + "px";
	timeBar = timenavContent.getElementsByClassName('time')[0];
	timeBar.style.width = timelineWidth + "px";
	var br = dTimelineElement.getElementsByClassName('timenav')[0]
			.getBoundingClientRect();
	this.timelineBorders = [ br.top, 0, br.bottom, br.width - timelineWidth ];
	this.currentPos = -(this.windowWidth / 2);
};
dTimeline.init = function() {
	this.currentPos = 0;
	this.mouseOverFlagZ = 0;
	this.rightPoint = [ 0, 0, 0 ];
	this.timelineBorders = [ 0, 0, 0, 0 ];
	this.currentTime = 0;
	this.currentZoom = 0;
	this.timeWidth = 0;
	this.minLeft = 0;
	this.maxLeft = 0;
	this.timestamp = Drupal.settings.dTimeline.timestamp;
	this.zoom = Drupal.settings.dTimeline.zoom;
	this.delta = Drupal.settings.dTimeline.delta;
	this.id = Drupal.settings.dTimeline.id;
};
(function($) {
	Drupal.behaviors.pathFieldsetSummaries = {
		attach : function(context) {
			dTimeline.init();
			dTimeline.redraw_timeline();
			$timenav_wrapper = $('#' + dTimeline.id + ' .timenav-wrapper');
			$timenav_wrapper
					.pep(
							{
								axis : 'x',
								constrainTo : dTimeline.timelineBorders,
								useCSSTranslation : true,
								startPos : {
									left : dTimeline.currentPos
								},
								drag : function(ev, obj) {
									dTimeline.currentPos = $timenav_wrapper
											.position().left;
									dTimeline.timestamp = (dTimeline.currentPos / dTimeline.timeWidth)
											+ dTimeline.minLeft;
									dTimeline.currentTime = (dTimeline.currentPos / dTimeline.timeWidth)
											+ dTimeline.minLeft;
									console.log(dTimeline.currentPos);
								}
							}).css('top', '0');
		}
	};
})(jQuery);