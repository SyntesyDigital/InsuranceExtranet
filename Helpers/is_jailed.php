<?php

if (!function_exists('is_jailed')) {

    function is_jailed()
    {
      if(Auth::user() !== null && isset(Auth::user()->jailed) && Auth::user()->jailed){
        return true;
      }

      return false;
    }
}