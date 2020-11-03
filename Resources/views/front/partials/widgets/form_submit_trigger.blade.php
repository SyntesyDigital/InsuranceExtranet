@php
    $element = \Modules\Extranet\Entities\Element::find($formId);
    $user = \Session::has('user') ? json_decode(\Session::get('user')) : null;

    $canBeTriggered = $user && isset($user->triggered_forms) && is_array($user->triggered_forms) 
        ? !in_array($formId, $user->triggered_forms)
        : true;

    if($element) {
        $element->load('fields');
    }
@endphp

@if($user && $canBeTriggered)
<div 
    id="element-form-trigger" 
    class="element-form-trigger"
    elementObject="{{base64_encode(json_encode($element))}}"
    parameters="{{$parameters}}"
></div>
@endif
