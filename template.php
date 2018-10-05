<?php
/**
 * @file
 * The primary PHP file for this theme.
 */


// use a custom template for the Homepage (themes/volstate/templates/page--homepage.tpl.php)
function volstate_preprocess_page(&$variables) {
  
  // set custom template for homepage
  if ($variables['node']->nid == 5) {
    $variables['theme_hook_suggestions'][] = 'page__homepage';
  } else {
    $variables['theme_hook_suggestions'][] = 'page';
  }
  
  // emergency alerts ticker
  drupal_add_js('//web.volstate.edu/_files/js/jquery/plugins/jquery.marquee.min.js', 'external');
  drupal_add_js('//web.volstate.edu/_files/js/vsccAlerts.min.js', 'external');
  drupal_add_css('//web.volstate.edu/_files/css/vsccAlerts.min.css', 'external');

}