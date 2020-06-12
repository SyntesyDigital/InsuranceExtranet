@php
  $identifier = str_replace(",","",$field['identifier']);
  $identifier = str_replace("[","",$identifier);
  $identifier = str_replace("]","",$identifier).'_'.$iterator;
  $visible = check_visible($field['settings'],$parameters);
@endphp

@if($visible)
    @php
        $link = "";
        $target = "";
        $title = $field['fields'][1]['value'][App::getLocale()];
        $icon = $field['fields'][2]['value'];
        if(isset($field['fields'][0]['value']['content'])){
            $content = $field['fields'][0]['value']['content'];
            $link = $content->url;
        }else {
            $target = "_blank";
            $link = isset($field['fields'][0]['value']['url'][App::getLocale()]) ? $field['fields'][0]['value']['url'][App::getLocale()] : '';
        }
    @endphp
  
    @if(isset($link) && $link != "")
        <a target="{{$target}}" href="{{$link}}" style="display: block; text-decoration: none;">
    @endif
        <div id="{{$field['settings']['htmlId'] or ''}}" class="action-button-container row {{$field['settings']['htmlClass'] or ''}} identifier-{{$identifier}}">
            <div class="col-md-3 col-sm-3 col-xs-3 container-icon" >
                @if(isset($icon))
                    <i class="{{$icon}}"></i>
                @endif
            </div>
            <div class="col-md-7 col-sm-7 col-xs-7 container-title">
                @if(isset($title))
                    <p>{{$title}}</p>
                @endif   
            </div>
            {{--
                <div class="col-md-2 col-sm-2 col-xs-2 container-number">
                    <span>{{$field['settings']['number'] or ''}}</span>
                </div>
            --}}  
        </div>
        @if(isset($link) && $link != "")
            </a>
        @endif
@endif