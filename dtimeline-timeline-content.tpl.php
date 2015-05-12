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
<script>
var minTime = <?php print strtotime($min_time);?>;
var maxTime = <?php print strtotime ($max_time);?>;
</script>
<div class="content">
 <?php foreach ($events as $event):?>
 <div class="marker" id="marker<?php print $event->nid;?>"
		nid="<?php print $event->nid;?>" url=""
		time="<?php print strtotime($event->field_date_value);?>">
		<div class="flag"
			onclick="timeLine.dTimeline('select',this.parentNode)"
			onmouseover="timeLine.dTimeline('bring_to_front',this.parentNode)"
			onmouseout="timeLine.dTimeline('send_to_back',this.parentNode)">
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
		<div class="line">
			<div class="event-line"></div>
		</div>
	</div>
 <?php endforeach;?>
</div>
<?php $min_t = strtotime($min_time);?>
<?php $max_t = strtotime($max_time);?>
<?php $min_date = getdate($min_t);?>
<?php $max_date = getdate($max_t);?>
<div class="time">
	<div class="time-interval-minor"></div>
	<div class="time-interval-major">
	<?php for ($y = $min_date['year']; $y<=$max_date['year']; $y++):?>
	 <?php if ($y>$min_date['year']):?>
	 <div time="<?php print mktime(0, 0, 0, 1, 1, $y);?>"><?php print $y;?></div>
	 <?php endif;?>
	 <?php for ($m=2; $m<13; $m++):?>
	   <?php if (
	       ($y>$min_date['year'] AND $y<$max_date['year']) OR
	       ($y == $min_date['year'] AND $m >=$min_date['mon']) OR
	       ($y == $max_date['year'] AND $m <=$max_date['mon'])
	       ):?>
	   <div time="<?php print mktime(0, 0, 0, $m, 1, $y);?>"><?php print t(date('M',mktime(0, 0, 0, $m, 1, $y)));?></div>
	   <?php endif;?>
	 <?php endfor;?>
	<?php endfor;?>
	</div>
	<div class="time-interval">
  <?php for ($t = $min_t; $t<$max_t; $t+=86400):?>
    <div time="<?php print $t;?>" class="tlab"><?php print t(date('M',$t));?> <?php print date('j',$t);?></div>
  <?php endfor;?>
  </div>
</div>