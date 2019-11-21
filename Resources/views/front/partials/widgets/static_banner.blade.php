@php
  $storedStylesFront = \Cache::get('frontStyles');
  $visible = check_visible($field['settings'],$parameters);
@endphp

@if($visible)
  @if(!$storedStylesFront)
    @php
      $seconds = 24*3600;
      $style = \Modules\Architect\Entities\Style::where('identifier','front')->first();
      $storedStylesFront = (new \Modules\Architect\Transformers\StyleFormTransformer($style))->toArray();
      \Cache::put('frontStyles', $storedStylesFront, $seconds);
    @endphp
  @endif

  @php

    //BANNER
      $bannerImage= isset($storedStylesFront['bannerImage']) ? $storedStylesFront['bannerImage']->value->urls['original']  :'';
      $bannerText= isset($storedStylesFront['bannerText']) ? $storedStylesFront['bannerText']->value  :'';

  @endphp

    <div id="{{$field['settings']['htmlId'] or ''}}" class="static-banner {{$field['settings']['htmlClass'] or ''}}">
      <div class="col-md-4 image-static-banner" style="background-image:url('/{{$bannerImage}}')">
      </div>
      <div class="col-md-8 text-static-banner">
        {!! $bannerText !!}
      </div>
    </div>
@endif
