<?php

namespace Modules\Extranet\Services\Autosave\Codecs;

use Auth;
use Modules\Extranet\Services\Autosave\Codecs\CodecInterface;

class FormCodec implements CodecInterface
{    
    /**
     * encode
     *
     * @param  mixed $payload
     * @return void
     */
    public static function encode($payload) 
    {        
        $chunks = str_split(json_encode($payload['values']), 4000);

        $params = [
            "CLE_PARAM" => strval($payload['key']),
            "NOM_PARAM" => 'BASKET',
            "VALEUR01" => strval(Auth::user()->id), // IDPER
            "VALEUR02" => date('Y-d-d H:i:s'), // Date
            "VALEUR03" => $payload['url'], // URL
            "VALEUR04" => isset($payload['status']) ? $payload['status'] : 'IN_PROGRESS', // Status
            "VALEUR05" => strval($payload['stage']), // Stage
            "VALEUR06" => 'DATA', // Start data
            "VALEUR07" => null, // values
            "VALEUR08" => null,
            "VALEUR09" => null,
            "VALEUR10" => null,
            "VALEUR11" => null,
            "VALEUR12" => null,
            "VALEUR13" => null,
            "VALEUR14" => null,
            "VALEUR15" => null,
            "VALEUR16" => null,
            "VALEUR17" => null,
            "VALEUR18" => null,
            "VALEUR19" => null,
            "VALEUR20" => null,
        ];

        $write = false;
        $index = 0;
        foreach($params as $k => $v) {
            if($v == 'DATA') {
                $write = true;
                continue;
            }

            if($write) {
                $params[$k] = isset($chunks[$index]) ? $chunks[$index] : null;
                ++$index;
            }
        }

        return $params;
    }
    
    /**
     * decode
     *
     * @param  mixed $payload
     * @return void
     */
    public static function decode($payload)
    {
        $values = null;
        $chunk = false;

        foreach($payload as $k => $v) {
            if($v == 'DATA') {
                $chunk = true;
            } else {
                if($chunk) {
                    $values .= $v;
                }
            }
        }

        return [
            'key' => $payload['CLE_PARAM'],
            'url' => $payload['VALEUR03'],
            'status' => $payload['VALEUR04'],
            'stage' => $payload['VALEUR05'],
            'values' => json_decode($values)
        ];
    }
}
