@extends('extranet::front.layouts.auth')

@php
    //if env is local or contains dev
    $testEnv = strpos(env('APP_ENV'), 'dev') !== false || strpos(env('APP_ENV'), 'local') !== false;
    $testEnv = $testEnv || env('APP_DEBUG');
    $test = Request::has('debug') || old('env') != null || $testEnv ? true : false;

    if(!isset($storedStylesFront)){
        $seconds = 24*3600;
        $style = \Modules\Architect\Entities\Style::where('identifier','front')->first();
        $storedStylesFront = (new \Modules\Architect\Transformers\StyleFormTransformer($style))->toArray();
        \Cache::put('frontStyles', $storedStylesFront, $seconds);
    }
@endphp

@if (isset($storedStylesFront['loginBackgroundImage']) && isset($storedStylesFront['loginBackgroundImage']->value))
    @if($test)
        <style>
            body.template-reset-password  .login-container:after{
                top: 0;
                height: 151%;
            }
            body.template-reset-password  .login-container{
                height: 100%;
            }
            body.template-reset-password .title-background{
                bottom: 170px;
            }
            body.template-reset-password .login-box-container:after{
                top: 300px;
            }
        </style>
    @else
        <style>
            body.template-reset-password .login-container:after{
                top: -100px;
            }
            body.template-reset-password .login-box-container:after{
                top: 380px;
            }
        </style> 
    @endif
@endif

@section('form')
  <form method="POST" action="{{ route('send-reset-password') }}">
    @csrf

    @if(Request::has('login_attempt')) 
        <div class="alert alert-warning">
            Vous avez atteint la limite maximale de tentative de connexion. Merci de configurer un nouveau votre mot de passe pour vous connecter. 
        </div>
    @else 
        <h2>MOT DE PASSE OUBLIÉ</h2>
    @endif 

    
    <div class="form-group row">
        <label for="email" class="col-sm-12 col-form-label text-md-right"><i class="fa fa-user"></i>Utilisateur</label>

        <div class="col-md-12">
            <input id="email" type="text" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ \Request::has('user') ? \Request::get('user') : old('email') }}" placeholder="" required autofocus>

            @if ($errors->has('email'))
                <div class="invalid-field">
                    <strong>{{ $errors->first('email') }}</strong>
                </div>
            @endif
        </div>
    </div>

    @if(Request::has('debug') || old('env') != null)

        <hr/>

        <div class="form-group row">
            <label for="env" class="col-md-12 col-form-label text-md-right">Environnement</label>

            <div class="col-md-12">
                <select id="env" class="form-control" name="env" >
                    @foreach(\Modules\Extranet\Extensions\VeosWsUrl::getEnvironmentOptions() as $env)
                    <option name="{{$env}}">{{$env}}</option>
                    @endforeach
                </select>
            </div>
        </div>
    @endif

    <div class="form-group row mb-0">
      <div class="col-md-12 buttons-group">
          <button type="submit" class="btn btn-primary">
            <i class="fas fa-paper-plane"></i> Envoyer
          </button>
      </div>
    </div>

    @if(session()->has('message'))
        <div class="text-success text-center">
            {{ session()->get('message') }}
        </div>
    @endif
    
    @if ($errors->has('server'))
        <div class="invalid-feedback">
            {{ $errors->first('server') }}
        </div>
    @endif

</form>
@endsection
