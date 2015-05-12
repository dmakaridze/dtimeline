<?php
global $language;
$lang = $language->language;
$date = reset ( $node->field_date );
$date = format_date ( strtotime ( $date [0] ['value'] ), 'custom', 'F j, Y', $date [0] ['timezone'], $lang );
if (count ( $node->field_image ) > 0) {
 $image = reset ( $node->field_image );
 $image = image_style_url ( 'medium', $image [0] ['uri'] );
}
?>
<<<<<<< HEAD
<<<<<<< HEAD
<div class="nav-prev" onclick = "timeLine.dTimeline('select',jQuery('#marker'+timeLine.data('dTimeline').nid).prev().get()[0]);">
=======
<div class="nav-prev">
>>>>>>> 73c76901012f2b7b888bff8b449c6d3dd5838066
=======
<div class="nav-prev" onclick = "timeLine.dTimeline('select',jQuery('#marker'+timeLine.data('dTimeline').nid).prev().get()[0]);">
>>>>>>> 3622f4d5f04b3abe1b6b1590ac19d03efb915ad9
	<img src="<?php print $GLOBALS['base_url'].'/'.drupal_get_path('module', 'dtimeline');?>/prev-btn.png">
</div>
<div class="content">
	<div class="headline">
		<h2 class="date"><?php print $date;?></h2>
		<h3><?php print $node->title;?></h3>
	</div>
	<div class="">
		<div>
      <?php if (isset($image)):?>
      <div class="media" style="float: left;">

				<a href="" data-lightbox="FSdUXH" data-title=""> <img
					src="<?php print $image;?>" class="media-image">
				</a>
			</div>
      <?php endif;?>
      <?php if(isset($node->body[$lang])):?>
        <?php $node_body = $node->body[$lang][0]; ?>
      <?php else:?>
        <?php $node_body = $node->body['und'][0]; ?>
      <?php endif;?>
      <?php if ($node_body['safe_value'] ==""):?>
        <?php print $node_body['safe_value'];?>
      <?php else:?>
        <?php print $node_body['value'];?>
      <?php endif;?>
    </div>
	</div>
</div>
<<<<<<< HEAD
<<<<<<< HEAD
<div class="nav-next" onclick = "timeLine.dTimeline('select',jQuery('#marker'+timeLine.data('dTimeline').nid).next().get()[0]);">
=======
<div class="nav-next">
>>>>>>> 73c76901012f2b7b888bff8b449c6d3dd5838066
=======
<div class="nav-next" onclick = "timeLine.dTimeline('select',jQuery('#marker'+timeLine.data('dTimeline').nid).next().get()[0]);">
>>>>>>> 3622f4d5f04b3abe1b6b1590ac19d03efb915ad9
	<img src="<?php print $GLOBALS['base_url'].'/'.drupal_get_path('module', 'dtimeline');?>/next-btn.png">
</div>