<?php

if (!function_exists('get_session_parameter')) {
    /**
     * Most WS need SES= into the URL but if the user came from Link no session defined, 
     * so SES not needed
     */
    function get_session_parameter()
    {
        if(isset(Auth::user()->session_id)){
            return 'SES='.Auth::user()->session_id;
        }
        return '';
    }
}
