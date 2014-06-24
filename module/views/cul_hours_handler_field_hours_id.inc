<?php

/**
 * @file
 * Definition of cul_hours_handler_field_hours_id.
 */

/**
 * Provide the open times for the given library id.
 *
 * @ingroup views_filter_handlers
 */
class cul_hours_handler_field_hours_id extends views_handler_field {
  /**
  * Render the Hours ID field.
  */
  public function render($values) {
    $value = $this->get_value($values);
    $return = explode(' ', $value);
    return 'First name: ' . $return['0'];
  }
}
