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

  $testEnv = strpos(env('APP_ENV'), 'dev') !== false || strpos(env('APP_ENV'), 'local') !== false;
  $testEnv = $testEnv || env('APP_DEBUG');
  $test = Request::has('debug') || old('env') != null || $testEnv ? true : false;
  $textBackgroundImage= isset($storedStylesFront['loginBackgroundImageText']) ? $storedStylesFront['loginBackgroundImageText']->value  : '' ;
@endphp

@if (isset($storedStylesFront['loginImageBorderTopRightContainer']) && isset($storedStylesFront['loginImageBorderTopRightContainer']->value))
  <style>
    .login-box-container:before{
      content: " ";
      position: absolute;
      right: -110px;
      top: -45px;
      width: 50%;
      height: 132px;
      background-image: url('{{$storedStylesFront['loginImageBorderTopRightContainer']->value->urls['original']}}');
      background-repeat: no-repeat;
      background-size: contain;
    }
  </style>
@endif

@if (isset($storedStylesFront['loginImageBorderBottomLeftContainer']) && isset($storedStylesFront['loginImageBorderBottomLeftContainer']->value))
  <style>
  .login-box-container:after{
      content: " ";
      position: absolute;
      right: 110px;
      top: 335px;
      width: 395px;
      height: 260px;
      background-image: url('{{$storedStylesFront['loginImageBorderBottomLeftContainer']->value->urls['original']}}');
      background-repeat: no-repeat;
      background-size: contain;
      z-index: -1;
    }
  </style>
@endif

@if (isset($storedStylesFront['loginBackgroundImage']) && isset($storedStylesFront['loginBackgroundImage']->value))
  <style>
    .login-box-container{
      transform: translate(70%, 5%);
      max-width: 430px;
      margin: 0 auto;
    }
    .login-container{
      background-image: url('{{$storedStylesFront['loginBackgroundImage']->value->urls['original']}}');

    }
    @media (max-width: 930px) {
      .login-container{
        background-image: unset;
      }
      .login-container .title-background{
        display: none;
      }
      .login-box-container {
        transform: translate(0%, 5%)
      }
    }
  </style>
@endif

@if (isset($storedStylesFront['alignMotDePasseLogin']) && $storedStylesFront['alignMotDePasseLogin']->value == 'top')
  <style>
    .login-container .login-box form .buttons-group button.btn.btn-primary{
      order: 2;
    }
  </style>
@endif

@if (isset($storedStylesFront['alignMotDePasseLogin']) && $storedStylesFront['alignMotDePasseLogin']->value == 'bottom')
  <style>
    .login-container .login-box form .buttons-group button.btn.btn-primary{
      order: unset !important;
    }
  </style>
@endif

@if (isset($storedStylesFront['alignHorizontalMotDePasseLogin']) && $storedStylesFront['alignHorizontalMotDePasseLogin']->value == 'center')
  <style>
    .login-container .login-box form .buttons-group button.btn.btn-primary{
      order: 1;
    }
  </style>
@endif

@if (isset($storedStylesFront['alignHorizontalMotDePasseLogin']) && $storedStylesFront['alignHorizontalMotDePasseLogin']->value == 'right')
  <style>
    body .login-container .login-box-container .login-box form .buttons-group {
      text-align: right !important;
    }
  </style>
@endif

@if (isset($storedStylesFront['alignHorizontalMotDePasseLogin']) && $storedStylesFront['alignHorizontalMotDePasseLogin']->value == 'center')
  <style>
    body .login-container .login-box form .buttons-group {
      text-align: center !important;
    }
  </style>
@endif

@section('content')
<div class="login-container">
    @if(isset($storedStylesFront['loginBackgroundImage']) && isset($storedStylesFront['loginBackgroundImageText']))
      <div class="title-background"> {!! $textBackgroundImage !!}</div>
    @endif
    <div class="row justify-content-center">
        <div class="login-box-container">
          <div class="logo-container">
              @if(isset($storedStylesFront['loginLogo']) && isset($storedStylesFront['loginLogo']->value))
                <img style="max-height: 75px;" src="/{{$storedStylesFront['loginLogo']->value->urls['original']}}" alt="Logo" />
              @elseif(isset($storedStylesFront['frontLogo']) && isset($storedStylesFront['frontLogo']->value))
                <img style="max-height: 75px;" src="/{{$storedStylesFront['frontLogo']->value->urls['original']}}" alt="Logo" />
              @else
                <img style="max-height: 75px;" src="{{asset('modules/architect/images/logo.png')}}" alt=""/>
              @endif
          </div>
          <div class="login-box">
            @yield('form')
          </div>
          <div class="footer-auth">
            <div class="row">
              @include ('extranet::front.partials.menu_footer',
                ["menu" => get_menu('footer')]
              )
              <div class="version">Architect v1.18.0@dev v1.18.14@dev</div>
            </div>
            <div class="row">
              
            </div>
          </div>
        </div>
    </div>
</div>
@endsection
