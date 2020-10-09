@php
    $identifier = str_replace(",","",$field['identifier']);
    $identifier = str_replace("[","",$identifier);
    $identifier = str_replace("]","",$identifier).'_'.$iterator;
    $visible = check_visible($field['settings'],$parameters);
    
    $elementObject = null;
    if(isset($field['settings']['fileElements'])){
        $elementObject = \Modules\Extranet\Entities\Element::where('id',$field['settings']['fileElements'])->first()->load('fields');
    }

    $model = isset($elementObject) ? $elementObject->getModel($models) : null;
    
@endphp

@if($visible)
    @php
        $link = "";
        $target = "";
        $title = $field['fields'][1]['value'][App::getLocale()];
        $icon = $field['fields'][2]['value'];
        if(isset($field['fields'][0]['value']['content'])){
            $content = $field['fields'][0]['value']['content'];
            $link = get_page_link($content->url, $parameters);
        }else {
            $target = "_blank";
            $link = isset($field['fields'][0]['value']['url'][App::getLocale()]) ? $field['fields'][0]['value']['url'][App::getLocale()] : '';
        }

        $allowed = allowed_link(['request_url' => substr($link, 1)]); //remove first /

    @endphp
  
    @if($allowed)
        @if(isset($link) && $link != "")
            <a target="{{$target}}" href="{{$link}}" style="display: block; text-decoration: none;">
        @endif
            <div 
                id="{{$field['settings']['htmlId'] or ''}}" 
                class="row {{$field['settings']['htmlClass'] or ''}} identifier-{{$identifier}}">
                <div id="actionButton" class="actionButton"
                    elementObject="{{base64_encode(json_encode($elementObject))}}"
                    model="{{base64_encode(json_encode($model))}}"
                    parameters="{{$parameters}}"
                    icon="{{$field['fields'][2]['value']}}"
                    title="{{$field['fields'][1]['value'][App::getLocale()]}}"
                 >
                </div>
            </div>
            @if(isset($link) && $link != "")
                </a>
            @endif
    @endif
@endif