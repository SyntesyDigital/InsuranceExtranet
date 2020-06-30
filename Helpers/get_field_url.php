<?php

if (!function_exists('get_field_url')) {

    function get_field_url($field,$parameters = null)
    {
      $url = null;
      if(isset($field['value']['content'])){
        //is internal
        $content = $field['value']['content'];
        $url = $content->url;
      }
      else if(isset($field['value']['url'])){
        //is external
        $url = isset($field['value']['url'][App::getLocale()]) ? $field['value']['url'][App::getLocale()] : null;
      }

      if(isset($parameters) && isset($url)){
        $url .= "?".$parameters;
      }

      return $url;
    }
}