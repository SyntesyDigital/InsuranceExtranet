@extends('extranet::front.layouts.auth')

@section('form')
  <form method="POST" action="{{ route('send-reset-password') }}">
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
        <label for="confirm-password" class="col-sm-12 col-form-label text-md-right"><i class="fa fa-lock"></i>Confirmation mot de passe</label>

        <div class="col-md-12">
            <input id="confirm-password" type="password" class="form-control{{ $errors->has('confirm-password') ? ' is-invalid' : '' }}" name="confirm-password" value="{{ old('confirm-password') }}" placeholder="" required autofocus>

            @if ($errors->has('confirm-password'))
                <div class="invalid-field">
                    <strong>{{ $errors->first('confirm-password') }}</strong>
                </div>
            @endif
        </div>
    </div>

    <div class="form-group row mb-0">
      <div class="col-md-12 buttons-group">
          <button type="submit" class="btn btn-primary">
            <i class="fas fa-paper-plane"></i> Envoyer
          </button>
      </div>
    </div>

    @if ($errors->has('server'))
        <div class="invalid-feedback">
            {{ $errors->first('server') }}
        </div>
    @endif

</form>
@endsection
