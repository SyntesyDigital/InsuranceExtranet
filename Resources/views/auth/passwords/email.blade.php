@extends('layouts.frontend', [
        'pageTitle' => 'Réinitialiser le mot de passe',
        'htmlTitle' => 'Réinitialiser le mot de passe'
     ])

@section('content')

<div class="container" style="min-height:220px;">
    <div class="row">
        <div class="col-md-8 col-md-offset-2"  style="margin-top: 40px;">

            @if (session('status'))
                <div class="alert alert-success">
                    {{ session('status') }}
                </div>
            @endif

            <form role="form" method="POST" action="{{ route('password.email') }}">
                {{ csrf_field() }}

                <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">


                    <div class="col-md-12">
                        <label for="email" class="control-label">Veuillez indiquer votre adresse e-mail : </label>
                        <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required>

                        @if ($errors->has('email'))
                            <span class="help-block">
                                <strong>{{ $errors->first('email') }}</strong>
                            </span>
                        @endif
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-md-12">
                        <button type="submit" class="btn btn-primary" style="margin-top: 20px;">
                            Envoyer
                        </button>
                    </div>
                </div>
            </form>
            <br clear="all">
            <br clear="all">

        </div>
    </div>
</div>

@endsection
