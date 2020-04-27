@extends('extranet::front.layouts.auth')

@section('form')
  <form method="POST" action="{{ route('send-reset-password') }}">
    @csrf

    <h2>MOT DE PASSE OUBLIÉ</h2>
    <div class="form-group row">
        <label for="email" class="col-sm-12 col-form-label text-md-right"><i class="fa fa-envelope"></i>Indiquer votre adresse E-mail</label>

        <div class="col-md-12">
            <input id="email" type="text" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" placeholder="" required autofocus>

            @if ($errors->has('email'))
                <div class="invalid-field">
                    <strong>{{ $errors->first('email') }}</strong>
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
