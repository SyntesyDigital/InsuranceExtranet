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
    $icon = $field['fields'][2]['value'][App::getLocale()];
    if(isset($field['fields'][0]['value']['content'])){
      //is internal
      $content = $field['fields'][0]['value']['content'];
      $link = get_page_link($content->url, $parameters);
    } else {
      //is external
      $target = "_blank";
      $link = isset($field['fields'][0]['value']['url'][App::getLocale()]) ? $field['fields'][0]['value']['url'][App::getLocale()] : '';
      $link = get_page_link($link, $parameters);
    }
    
    $allowed = allowed_link(['request_url' => substr($link, 1)]); //remove first /
  @endphp

@if($allowed)
  @if(isset($link) && $link != "")

    @if(isset($field['settings']['backgroundColor']))
      <style>
        .box-button-container-a .box-button-container > .wrap-box-button #identifier-{{$identifier}}{
          background-color: {{$field['settings']['backgroundColor']}}
        }
        .box-button-container-a .box-button-container:hover > .wrap-box-button #identifier-{{$identifier}}{
        background-color: {{$field['settings']['backgroundHoverColor']}}
      }
      </style>
    @endif

  <a target="{{$target}}" href="{{$link}}" class="box-button-container-a">
    @endif
  
    <div 
        id="{{$field['settings']['htmlId'] or ''}}" 
        class="box-button-root box-button-container {{$field['settings']['htmlClass'] or ''}} {{$field['settings']['buttonClass'] or ''}}"
    >
      <div class="wrap-box-button">
        <div class="image-container" id="identifier-{{$identifier}}">
            @if(isset($icon))
                <div class="wrap-icon"><i class="{{$icon}}"></i></div>
            @else
                <div class="wrap-image">
                    @include('extranet::front.partials.fields.image', [
                        "field" => $field['fields'][3],
                        "settings" => $field['settings'],
                    ])
                </div>
            @endif
        </div>
        <div class="label-container" id="identifier-{{$identifier}}">
          <div>
            <p>{{$title}}</p>
          </div>
        </div>
      </div>

    </div>



    @if(isset($link) && $link != "")
  </a>
  @endif
  @endif
@endif