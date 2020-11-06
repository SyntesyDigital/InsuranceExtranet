@extends('extranet::front.layouts.auth')

@section('form')
  <form method="POST" action="{{ route('update-password') }}">
    <input type="hidden" name="token" value="{{$token}}" />
    <input type="hidden" name="uid" value="{{ request('uid') }}" />
    @csrf

    <h2>RÉINITIALISER MOT DE PASSE</h2>
    <div class="form-group row">
        <label for="password" class="col-sm-12 col-form-label text-md-right"><i class="fa fa-lock"></i>Nouveau mot de passe</label>

        <div class="col-md-12">
            <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" value="{{ old('password') }}" placeholder="" required autofocus>

            @if ($errors->has('password'))
                <div class="invalid-field">
                    <strong>{{ $errors->first('password') }}</strong>
                </div>
            @endif
        </div>
    </div>

    <div class="form-group row">
        <label for="password_confirmation" class="col-sm-12 col-form-label text-md-right"><i class="fa fa-lock"></i>Confirmation mot de passe</label>

        <div class="col-md-12">
            <input id="password_confirmation" type="password" class="form-control{{ $errors->has('password_confirmation') ? ' is-invalid' : '' }}" name="password_confirmation" value="{{ old('password_confirmation') }}" placeholder="" required autofocus>

            @if ($errors->has('password_confirmation'))
                <div class="invalid-field">
                    <strong>{{ $errors->first('password_confirmation') }}</strong>
                </div>
            @endif
        </div>
    </div>

    @if(isset($env))

        <hr/>

        <div class="form-group row">
            <label for="env" class="col-md-12 col-form-label text-md-right">Environnement</label>

            <div class="col-md-12">
                <select id="env" class="form-control" name="env" >
                    @foreach(\Modules\Extranet\Extensions\VeosWsUrl::getEnvironmentOptions() as $item)
                    <option name="{{$item}}" @if($env == $item) selected @endif>{{$item}}</option>
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
