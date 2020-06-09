@php
  $storedStylesFront = \Cache::get('frontStyles');
  $visible = check_visible($field['settings'],$parameters);
@endphp

@if($visible)
  @php
    $crop = "medium";
    $link = "";
    $target = "";
    $title = $field['fields'][1]['value'][App::getLocale()];
    $subtitle = $field['fields'][2]['value'][App::getLocale()];
    if(isset($field['fields'][3]['value']['content'])){
      $content = $field['fields'][3]['value']['content'];
      $link = $content->url;
    }
    else {
      $target = "_blank";
      $link = isset($field['fields'][3]['value']['url'][App::getLocale()]) ? $field['fields'][3]['value']['url'][App::getLocale()] : '';
    }
    if(isset($settings) && isset($settings['cropsAllowed']) && $settings['cropsAllowed'] != null){
      $crop = $settings['cropsAllowed'];
    }
    $image = isset($field['fields'][0]['value']) && $field['fields'][0]['value']->getUrlsAttribute()[$crop] != null ? $field['fields'][0]['value']->getUrlsAttribute()[$crop] : null;
  @endphp


  @if(isset($link) && $link != "")
  <a target="{{$target}}" href="{{$link}}" style="display: block;">
  @endif
    <div id="{{$field['settings']['htmlId'] or ''}}" class="static-banner horizontal-banner {{$field['settings']['htmlClass'] or ''}}">
      <div class="col-sm-4 image-static-banner">
        @if(isset($image))
          <img src="/{{$image}}" />
        @endif
      </div>
      <div class="col-sm-8 text-static-banner">
          <p>{{$subtitle}}</p>
          <h4>{{$title}}</h4>
          <object type="image/svg+xml" data="{{asset('modules/architect/images/next.svg')}}" class="logo">
          </object>
      </div>
    </div>
    @if(isset($link) && $link != "")
</a>
@endif
@endif
