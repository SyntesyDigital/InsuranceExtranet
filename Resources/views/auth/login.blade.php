@extends('extranet::front.layouts.auth')

@php
    $test = Request::has('debug') || old('env') != null ? true : false;
@endphp

@section('form')
  <form method="POST" action="{{ route('login') }}">
    @csrf

    <h2>Connectez-vous</h2>
    <div class="form-group row">
        <label for="email" class="col-sm-12 col-form-label text-md-right"><i class="fa fa-user"></i>Utilisateur</label>

        <div class="col-md-12">
            <input id="uid" type="text" class="form-control{{ $errors->has('uid') ? ' is-invalid' : '' }}" name="uid" value="{{ old('uid') }}" placeholder="" required autofocus>

            @if ($errors->has('uid'))
                <div class="invalid-field">
                    <strong>{{ $errors->first('uid') }}</strong>
                </div>
            @endif
        </div>
    </div>

    <div class="form-group row">
        <label for="passwd" class="col-md-12 col-form-label text-md-right"><i class="fa fa-lock"></i>Mot de passe</label>

        <div class="col-md-12">
            <input id="passwd" type="password" class="form-control{{ $errors->has('passwd') ? ' is-invalid' : '' }}" name="passwd"  placeholder="" required>

            @if ($errors->has('passwd'))
                <div class="invalid-field">
                    <strong>{{ $errors->first('passwd') }}</strong>
                </div>
            @endif
        </div>
    </div>

    @if($test)

      <hr/>

      <div class="form-group row">
          <label for="passwd" class="col-md-12 col-form-label text-md-right">Environnement</label>

          <div class="col-md-12">
              <select id="env" class="form-control" name="env" >
                @foreach(\Modules\Extranet\Extensions\VeosWsUrl::getEnvironmentOptions() as $env)
                  <option name="{{$env}}">{{$env}}</option>
                @endforeach
              </select>
          </div>
      </div>

      <div class="form-group row">
          <label for="test_passwd" class="col-md-12 col-form-label text-md-right">Mot de passe du test</label>

          <div class="col-md-12">
              <input id="test_passwd" type="password" class="form-control{{ $errors->has('test_passwd') ? ' is-invalid' : '' }}" name="test_passwd"  placeholder="" required>

              @if ($errors->has('test_passwd'))
                  <div class="invalid-field">
                      <strong>{{ $errors->first('test_passwd') }}</strong>
                  </div>
              @endif
          </div>
      </div>
    @endif



    <div class="form-group row mb-0">
      <div class="col-md-12 buttons-group">
          <button type="submit" class="btn btn-primary">
              <i class="fas fa-sign-in-alt"></i> Connexion
          </button>
          <p class="forgot">
            <a href="{{route('reset-password')}}@if($test)?debug=1 @endif">Mot de passe oublié ?</a>
          </p>
      </div>
    </div>

    @if(session()->has('message'))
        <div class="text-success text-center">
            <i class="fa fa-check"></i>&nbsp;
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
