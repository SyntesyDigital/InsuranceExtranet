@php

  $url = isset($field['value']) && isset($field['value'][App::getLocale()]) && isset($field['value'][App::getLocale()]['urls']['files']) ?
    asset($field['value'][App::getLocale()]['urls']['files']) : null;
@endphp
@if(!isset($div))
<div>
@endif
@if(isset($url))
  <a
    id="{{$settings['htmlId'] or ''}}"
    class="{{$settings['htmlClass'] or ''}} {{$class or ''}}"
    target="_blank"
    href="{{$url}}"
  >
    Descarregar arxiu
  </a>
@endif
@if(!isset($div))
</div>
@endif
