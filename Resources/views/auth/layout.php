@extends('extranet::front.layouts.app',[
  "isLogin" => true
])

@php
  $storedStylesFront = \Cache::get('frontStyles');
  if(!isset($storedStylesFront)){
    $seconds = 24*3600;
    $style = \Modules\Architect\Entities\Style::where('identifier','front')->first();
    $storedStylesFront = (new \Modules\Architect\Transformers\StyleFormTransformer($style))->toArray();
    \Cache::put('frontStyles', $storedStylesFront, $seconds);
  }
@endphp

@section('content')
<div class="container login-container">
    <div class="row justify-content-center">
        <div class="login-box-container">
          <div class="login-box">
            <div class="logo-container">
              @if(isset($storedStylesFront['loginLogo']) && isset($storedStylesFront['loginLogo']->value))
                <img style="max-height: 75px;" src="/{{$storedStylesFront['loginLogo']->value->urls['original']}}" alt="Logo" />
              @elseif(isset($storedStylesFront['frontLogo']) && isset($storedStylesFront['frontLogo']->value))
                <img style="max-height: 75px;" src="/{{$storedStylesFront['frontLogo']->value->urls['original']}}" alt="Logo" />
              @else
                <img style="max-height: 75px;" src="{{asset('modules/architect/images/logo.png')}}" alt=""/>
              @endif
            </div>
            @section('form')
          </div>
        </div>
    </div>
</div>
@endsection
