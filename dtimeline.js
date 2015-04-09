var mouseOverFlagZ = 0;
var rightPoint = [ 0, 0, 0 ];
var timelineBorders = [ 0, 0, 0, 0 ];
function bringToFront(flag) {
	mouseOverFlagZ = flag.style.zIndex;
	flag.style.zIndex = 1000;
	flag.getElementsByClassName('title')[0].style.color = '#444';
	flag.getElementsByClassName('line')[0].style.background = '#777';
}
function sendToBack(flag) {
	flag.style.zIndex = mouseOverFlagZ;
	flag.getElementsByClassName('title')[0].style.color = '#999';
	flag.getElementsByClassName('line')[0].style.background = '#ccc';
}
function redrawTimeline(currentTime, zoomLevel, delta, id) {
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	var dTimeline = document.getElementById(id);
	dTimeline.style.width = windowWidth;
	dTimeline.style.height = windowHeight
			- document.getElementById('header').clientHeight + "px";
	var startTime = currentTime - delta;
	var navBarContentHeight = dTimeline.getElementsByClassName('timenav')[0].clientHeight
	var navBarContent = dTimeline.getElementsByClassName('content')[0];
	navBarContent.style.height = navBarContentHeight - 50 + "px";
	var rowHeight = (navBarContentHeight - 50) / 3;
	var timeMarkers = dTimeline.getElementsByClassName('marker');

	var leftPos = 0;
	for (i = 0; i < timeMarkers.length; ++i) {
		leftPos = timeMarkers[i].getAttribute('time');
		if (i == 0) {
			var minLeft = leftPos;
			var maxLeft = leftPos;
		} else {
			if (minLeft > leftPos) {
				minLeft = leftPos;
			}
			if (maxLeft < leftPos) {
				maxLeft = leftPos;
			}
		}
	}
	var timeWidth = 2 * (windowWidth - 255) / (maxLeft - minLeft);
	for (i = 0; i < timeMarkers.length; ++i) {
		leftPos = (timeMarkers[i].getAttribute('time') - minLeft) * timeWidth;
		timeMarkers[i].style.left = leftPos + 'px';
		minPoint = 0;
		for (r = 1; r < 3; ++r) {
			if (rightPoint[r] < rightPoint[minPoint]) {
				minPoint = r;
			}
		}
		rightPoint[i % 3] = leftPos + 255;
		timeMarkers[i].getElementsByClassName('flag')[0].style.top = rowHeight
				* (minPoint) + 1 + "px";
		timeMarkers[i].getElementsByClassName('flag')[0].style.height = rowHeight
				- 3 + "px";
	}
	timenavContent = dTimeline.getElementsByClassName('timenav-content')[0];
	timenavContent.style.height = navBarContentHeight - 50 + "px";
	timelineWidth = (maxLeft - minLeft) * timeWidth + 250;
	timenavContent.style.width = timelineWidth + "px";
	navBarContent.style.width = timelineWidth + "px";
	timeBar = timenavContent.getElementsByClassName('time')[0];
	timeBar.style.width = timelineWidth + "px";
	var br = dTimeline.getElementsByClassName('timenav')[0]
			.getBoundingClientRect();
	timelineBorders = [ br.top, 50, br.bottom, br.width - timelineWidth - 50 ];
	// timeBar.style.left = minLeft + "px";
	// navBarContent.style.left = minLeft + "px";
	// timenavContent.style.left = minLeft + "px";
	// timenavContent.getElementsByClassName('content')[0].style.left = minLeft
	// + "px";
}
(function($) {
	Drupal.behaviors.pathFieldsetSummaries = {
		attach : function(context) {
			redrawTimeline(Drupal.settings.dTimeline.timestamp,
					Drupal.settings.dTimeline.zoom,
					Drupal.settings.dTimeline.delta,
					Drupal.settings.dTimeline.id);
			$('#' + Drupal.settings.dTimeline.id + ' .timenav-wrapper').pep({
				axis : 'x',
				constrainTo : timelineBorders,
				useCSSTranslation : true
			}).css('top', '0');
		}
	};
})(jQuery);
