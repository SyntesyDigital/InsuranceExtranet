@extends('layouts.frontend')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-6 col-md-offset-3" style="margin-top: 80px;">
            <form class="form-horizontal" role="form" method="POST" action="{{ route('login') }}">
                {{ csrf_field() }}

                <div class="form-group {{ $errors->has('email') ? ' has-error' : '' }}">

                    @if ($errors->has('email'))
                        <label class="control-label">{{ $errors->first('email') }}</label>
                    @endif

                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="fa fa-envelope"></i>
                        </span>
                        <input type="text" class="form-control" name="email" placeholder="E-Mail Address" required>
                    </div>

                </div>

                <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">

                    @if ($errors->has('password'))
                        <label class="control-label">{{ $errors->first('password') }}</label>
                    @endif

                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="fa fa-lock"></i>
                        </span>
                        <input id="password" type="password" class="form-control" name="password" placeholder="Password" required>
                    </div>

                </div>

                <div class="form-group centered">

                    <div class="checkbox">
                        <label>
                            <input type="checkbox" name="remember" @if(old('remember')) checked="" @endif ><span class="checkbox-material"><span class="check"></span></span>
                            Se rappeler de moi sur cet ordinateur
                        </label>
                    </div>

                </div>



                <div class="form-group actions">

                    <button type="submit" class="btn btn-primary">Se connecter</button>

                    <a class="" href="{{ route('password.request') }}">
                        Mot de passe perdu ?
                    </a>

                </div>
            </form>
        </div>
    </div>
</div>
@endsection
