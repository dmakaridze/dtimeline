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
<div class="content">
 <?php foreach ($events as $event):?>
 <div class="marker" id="marker<?php print $event->nid;?>" nid="<?php print $event->nid;?>" url="" time="<?php print strtotime($event->field_date_value);?>">
  <div class="flag" onmouseover="dTimeline.bring_to_front(this.parentNode)" onmouseout="dTimeline.send_to_back(this.parentNode)">
   <div class="flag-content">
    <div class="thumbnail" id="thumb<?php print $event->nid;?>">
     <?php if ($event->uri != ""):?>
     <img src="<?php print image_style_url("thumbnail",$event->uri);?>">
     <?php endif;?>
    </div>
    <h3 class="title"><?php print $event->title;?></h3>
   </div>
  </div>
  <div class="dot"></div>
  <div class="line"><div class="event-line"></div></div>
 </div>
 <?php endforeach;?>
</div>
<div class="time">
  <div class="time-interval-minor"></div>
  <div class="time-interval-major"></div>
  <div class="time-interval"></div>
</div>