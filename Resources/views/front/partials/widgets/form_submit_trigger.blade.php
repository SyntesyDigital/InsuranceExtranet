@php
    $element = \Modules\Extranet\Entities\Element::find($formId);

    if($element) {
        $element->load('fields');
    }
@endphp

<div 
    id="element-form-trigger" 
    class="element-form-trigger"
    elementObject="{{base64_encode(json_encode($element))}}"
    parameters="{{$parameters}}"
></div>
