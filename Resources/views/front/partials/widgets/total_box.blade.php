@php
    $link = "";
    $target = "";
    $title = $field['fields'][0]['value'][App::getLocale()];
    $allowed = true;

    if(isset($field['fields'][2]['value']['content'])){
        //is internal
        $content = $field['fields'][2]['value']['content'];
        $allowed = allowed_slug($content->url);
        $link = get_page_link($content->url, $parameters);
    }
    else {
        //is external
        $target = "_blank";
        $link = isset($field['fields'][2]['value']['url'][App::getLocale()]) ?
        $field['fields'][2]['value']['url'][App::getLocale()] : '';
    }

    $elementObject = null;
    
    if(isset($field['settings']['tableElements'])){
        $elementObject = \Modules\Extranet\Entities\Element::where('id',$field['settings']['tableElements'])->first()->load('fields');
    }

    $model = isset($elementObject) ? $elementObject->getModel($models) : null;
    $visible = check_visible($field['settings'],$parameters);

@endphp


@if ($allowed)
    @if ($visible)
        @if (isset($link) && $link != '')
            <a target="{{ $target }}" href="{{ $link }}" class="total-box-container-a">
        @endif
        <div id="{{ $field['settings']['htmlId'] or '' }}"
            class="total-box-container {{ $field['settings']['htmlClass'] or '' }}">
            <div class="col-md-8 col-sm-8 col-xs-8 container-parameters">
                <div id="totalBox" class="totalBox" elementObject="{{ base64_encode(json_encode($elementObject)) }}"
                    model="{{ base64_encode(json_encode($model)) }}" parameters="{{ $parameters }}">
                </div>
                <div class="title">{{ \Illuminate\Support\Str::limit($title, 45, $end = '...') }}</div>
            </div>
            <div class="col-md-4 col-sm-4 col-xs-4 container-icon">
                @include('extranet::front.partials.fields.icon',
                    [
                        "field" => $field['fields'][1],
                        "settings" => $field['settings'],
                        "div" => false,
                    ]
                )
            </div>
            <div class="total-box-container-body"></div>
        </div>
        @if (isset($link) && $link != '')
            </a>
        @endif
    @endif
@endif
