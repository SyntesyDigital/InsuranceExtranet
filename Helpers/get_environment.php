<?php

if (!function_exists('get_environment')) {

    function get_environment()
    {
      if(Auth::user() !== null){
        return Auth::user()->env;
      }
      return \App\Extensions\VeosWsUrl::PROD;
    }
}

if (!function_exists('is_test_environment')) {

    function is_test_environment()
    {
      if(Auth::user() !== null){
        return Auth::user()->test;
      }
      return false;
    }
}
