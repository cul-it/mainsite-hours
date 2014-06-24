<?php

/**
 * Implements hook_views_data().
 */
function cul_hours_views_data() {
  // Build an array named after each DB table you're describing. In our case,
  // just cul_hours_table.
  $data['cul_hours_table'] = array(
    // First give some general information about the table as a data source.
    'table' => array(
      // The grouping for this field/filter/sort in the Views UI.
      'group' => t('Example Views Stuff'),
      'base' => array(
        'field' => 'naid', // This is the identifier field for the view.
        'title' => t('Example Views API Data'),
        'help' => t('Names provided by the cul_hours module.'),
      ),
    ),
    // Now we describe each field that Views needs to know about, starting
    // with the identifier field.
    'naid' => array(
      'title' => t('Name ID'),
      'help' => t("The unique Name ID."),
      'field' => array(
        'handler' => 'views_handler_field_numeric',
        'click sortable' => TRUE,
      ),
      'sort' => array(
        'handler' => 'views_handler_sort',
      ),
      'filter' => array(
        'handler' => 'views_handler_filter_numeric',
      ),
    ),
    // Now the name field.
    'name' => array(
      'title' => t('Name'),
      'help' => t("The Name."),
      'field' => array(
        'handler' => 'views_handler_field',
        'click sortable' => TRUE,
      ),
      'sort' => array(
        'handler' => 'views_handler_sort',
      ),
      'filter' => array(
        'handler' => 'views_handler_filter_string',
      ),
    ),
  );
  return $data;
}
