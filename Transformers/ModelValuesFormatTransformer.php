<?php

namespace Modules\Extranet\Transformers;

use Illuminate\Http\Resources\Json\Resource;
use Carbon\Carbon;
use Modules\Architect\Entities\Content;

class ModelValuesFormatTransformer extends Resource
{
    protected $element;

    public function __construct($modelValues, $elementFields, $limit, $parameters = null, $table = false, $csv = false)
    {
        $this->modelValues = $modelValues;
        $this->elementFields = $elementFields;
        $this->limit = $limit;
        $this->routeParameters = $parameters;
        $this->isTable = $table;
        $this->isCsv = $csv;
        /*
          [id] => url
          $contentURls[1] = "http://www...."
        */
        $this->contentUrls = [];
    }

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     *
     * @return array
     */
    public function toArray($request = null)
    {
        return $this->getModelArray($this->modelValues, $this->elementFields, $this->limit);
    }

    public function toJson($request = null)
    {
        return json_encode($this->toArray($request));
    }

    private function getContentUrl($contentId) {
        if (!isset($this->contentUrls[$contentId])) {
            //get the url
            $content = Content::find($contentId);
            $this->contentUrls[$contentId] = $content->url;
            $url = $content->url;
        } else {
            $url = $this->contentUrls[$contentId];
        }
        return $url;
    }

    private function processContent($hasRoute, $modelValue, $value)
    {
        if (isset($hasRoute['id'])) {
            $url = $this->getContentUrl($hasRoute['id']);
            
            //process parameters
            if ($hasRoute['params'] != null && sizeof($hasRoute['params']) > 0) {
                $url .= '?';

                //process parameters with model model values
                $currentRouteParameters = $this->processParameters2Array(
                    $this->routeParameters,
                    $hasRoute['params'],
                    $modelValue
                );
                $url .= $this->arrayToUrl($currentRouteParameters);
            }
        }

        //add the route paramteres
        if ($this->isCsv) {
            return $value;
        } else {
            return '<a href="'.$url.'">'.$value.'</a>';
        }
    }

    private function processElement($hasModal, $modelValue, $value)
    {
        if (isset($hasModal['id'])) {
            $url = $hasModal['id'];
            //process parameters
            if ($hasModal['params'] != null && sizeof($hasModal['params']) > 0) {
                $url .= '?';

                //process parameters with model model values
                $currentRouteParameters = $this->processParameters2Array(
                    //$this->routeParameters,
                    [],
                    $hasModal['params'],
                    $modelValue
                );
                $url .= $this->arrayToUrl($currentRouteParameters);
            }
        }

        //add the route paramteres

        return $url;
    }

    /**
     *  InitArray is the array with already set parameters.
     *  Process page parameters with model values.
     */
    private function processParameters2Array($initArray, $pageParams, $modelValue)
    {
        //remove perPage if exist, normally added to selects
        unset($initArray['perPage']);
        unset($initArray['orderBy']);
        unset($initArray['orderType']);
        unset($initArray['page']);

        foreach ($pageParams as $param) {
            if ($param['value'] != '' && $modelValue->{$param['value']} != null) {
                $initArray[$param['identifier']] = $modelValue->{$param['value']};
            }
        }

        return $initArray;
    }

    /**
     *   Process array to URL. TODO do a library to all of this processments.
     */
    private function arrayToUrl($parameters)
    {
        $first = true;
        $url = '';
        foreach ($parameters as $key => $value) {
            if (!$first) {
                $url .= '&';
            }
            $url .= $key.'='.$value;
            $first = false;
        }

        return $url;
    }

    public function getModelArray($modelValues, $elementFields, $limit)
    {
        $result = [];
        $i = 0;

        try {
            foreach ($modelValues as $modelValue) {
                if (!$limit || $i < $limit) {
                    foreach ($elementFields as $elementField) {
                        $originalValue = $modelValue->{$elementField->identifier};

                        switch ($elementField->type) {
                            case 'number':

                                if (!$this->isTable) {
                                    if ($elementField->settings['format'] == 'price') {
                                        $result[$i][$elementField->identifier] = number_format($originalValue, 0, ',', '.').' €';
                                    } elseif ($elementField->settings['format'] == 'price_with_decimals') {
                                        $result[$i][$elementField->identifier] = number_format($originalValue, 2, ',', '.').' €';
                                    } else {
                                        $result[$i][$elementField->identifier] = $originalValue !== null ? $originalValue : '';
                                    }
                                } else {
                                    $result[$i][$elementField->identifier] = $originalValue != '' ? intval($originalValue) : 0;
                                }

                                break;
                            case 'text':
                                if ($elementField->settings['format'] == 'email') {
                                    $result[$i][$elementField->identifier] = $originalValue ? $originalValue : '';
                                } elseif ($elementField->settings['format'] == 'telephone') {
                                    $result[$i][$elementField->identifier] = $originalValue ? $originalValue : '';
                                } else {
                                    $result[$i][$elementField->identifier] = $originalValue ? $originalValue : '';
                                }
                                break;
                            case 'date':

                                if (isset($originalValue)) {
                                    $originalValue = intval($originalValue) / 1000;
                                    $result[$i][$elementField->identifier] = $originalValue ? $originalValue : '';

                                    //only process date when is not table. At tables date is processed in react to sort properly
                                    if (!$this->isTable) {
                                        if ($elementField->settings['format'] == 'day_month_year') {
                                            $result[$i][$elementField->identifier] = Carbon::createFromTimestamp($originalValue)->format('d-m-Y');
                                        } elseif ($elementField->settings['format'] == 'day_month') {
                                            $result[$i][$elementField->identifier] = Carbon::createFromTimestamp($originalValue)->format('d-m');
                                        } elseif ($elementField->settings['format'] == 'month_year') {
                                            $result[$i][$elementField->identifier] = Carbon::createFromTimestamp($originalValue)->format('m-Y');
                                        } elseif ($elementField->settings['format'] == 'year') {
                                            $result[$i][$elementField->identifier] = Carbon::createFromTimestamp($originalValue)->format('Y');
                                        }
                                    }
                                } else {
                                    //if oringal value is null leave null
                                    $result[$i][$elementField->identifier] = $originalValue;
                                }

                                break;
                            case 'file':
                                $fileLink = '';
                                if ($originalValue != null && $originalValue != '') {
                                    if (isset($elementField->settings['preview']) && $elementField->settings['preview']) {
                                        $fileLink = '<a href="'.route('document.show', $originalValue).'" target="_blank" class="file-link image-link" style="background-image:url('.route('document.show.preview', $originalValue).')"></a>';
                                    } else {
                                        $fileLink = '<a href="'.route('document.show', $originalValue).'" target="_blank" class="file-link"><i class="fas fa-file-download"></i></a>';
                                    }
                                }
                                $result[$i][$elementField->identifier] = $fileLink;

                            break;

                            default:
                                $result[$i][$elementField->identifier] = $originalValue ? $originalValue : '';
                            break;
                        }

                        if (isset($elementField->settings) &&
                            isset($elementField->settings['hasRoute']) && $elementField->settings['hasRoute'] != null
                            && isset($elementField->settings['hasRoute']['id'])
                        ) {

                            $link = $this->processContent(
                                $elementField->settings['hasRoute'],
                                $modelValue,
                                $result[$i][$elementField->identifier]
                            );

                            //to allow order when table, need to process separately link and value
                            if ($this->isTable) {
                                $result[$i][$elementField->identifier] =
                                $result[$i][$elementField->identifier].';'.$link;
                            } else {
                                $result[$i][$elementField->identifier] = $link;
                            }

                        } elseif (isset($elementField->settings) &&
                            isset($elementField->settings['hasModal']) && $elementField->settings['hasModal'] != null
                            && isset($elementField->settings['hasModal']['id'])) {

                                $link = $this->processElement(
                                    $elementField->settings['hasModal'],
                                    $modelValue,
                                    $result[$i][$elementField->identifier]
                                );

                                $redirect = "";
                                if(isset($elementField->settings['hasModal']['redirect'])){
                                    $redirect = $this->getContentUrl(
                                        $elementField->settings['hasModal']['redirect']['id']
                                    );
                                }
                                
                                //get link with format [value];[id]?[params]:[redirect_url]
                                $result[$i][$elementField->identifier] =
                                    $result[$i][$elementField->identifier].';'.$link.':'.$redirect;
                        }
                    }
                }
                ++$i;
            }
        } catch (Exception $e) {
            dd($e->getMessage());
        }

        return $result;
    }
}
