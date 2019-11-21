@php
  $crop = "large";

  $settings = isset($settings) ? $settings : $field['settings'];
  $settings = json_decode(json_encode($settings), true);

  if(isset($settings) && isset($settings['cropsAllowed']) && $settings['cropsAllowed'] != null){
    $crop = $settings['cropsAllowed'];
  }
  $url = isset($field['value']) && isset($field['value']->getUrlsAttribute()[$crop]) ? asset($field['value']->getUrlsAttribute()[$crop]) : null;
@endphp
@if(!isset($div))
<p class="{{$settings['htmlClass'] or ''}}">
@endif

@if(isset($url))
  <img
    id="{{$settings['htmlId'] or ''}}"
    class="{{$settings['htmlClass'] or ''}}"
    src="{{ isset($field['value']->getUrlsAttribute()[$crop]) ? asset($field['value']->getUrlsAttribute()[$crop]) : null }}"
    alt="{{$field['value']->metadata['fields']['alt'][App::getLocale()]['value'] or ''}}"
    title="{{$field['value']->metadata['fields']['title'][App::getLocale()]['value'] or ''}}"
    width="{{$width or ''}}"
    height="{{$height or ''}}"
  />
@endif

@if(!isset($div))
</p>
@endif
