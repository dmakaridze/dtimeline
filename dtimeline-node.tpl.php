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
<div class="nav-prev" onclick = "timeLine.dTimeline('select',jQuery('#marker'+timeLine.data('dTimeline').nid).prev().get()[0]);">
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
<div class="nav-next" onclick = "timeLine.dTimeline('select',jQuery('#marker'+timeLine.data('dTimeline').nid).next().get()[0]);">
	<img src="<?php print $GLOBALS['base_url'].'/'.drupal_get_path('module', 'dtimeline');?>/next-btn.png">
</div>