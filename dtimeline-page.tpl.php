<?php
/**
 * @file
 * Template for DTimeline module
 *
 * Version: 1.x
 * Drupal Core: 7.x
 *
 */
?>
<div id="dtimeline">
 <div class="features"></div>
 <div class="timenav">
  <div class="timenav-wrapper">
   <div class="timenav-content">
    <?php print $timeline_content;?>
    <div class="time">
     <div class="time-interval-minor"></div>
     <div class="time-interval-major"></div>
     <div class="time-interval"></div>
    </div>
   </div>
  </div>
  <div class="timenav-background">
   <div class="timenav-line"></div>
   <div class="timenav-indicator"></div>
   <div class="timenav-interval-background">
    <div class="top-highlight"></div>
   </div>
  </div>
  <div class="toolbar-pan">
   <div class="zoom-in" onClick="dTimeline.zoom_in()"></div>
   <div class="zoom-out" onClick="dTimeline.zoom_out()"></div>
  </div>
 </div>
</div>