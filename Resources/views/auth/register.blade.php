@extends('layouts.auth')

@section('content')
<div class="container login">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Register</div>
                <div class="panel-body">
                    <form class="form-horizontal" role="form" method="POST" action="{{ route('register') }}">
                        {{ csrf_field() }}

                        <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                        	
                        	@if ($errors->has('name'))
                        		<label class="control-label">{{ $errors->first('name') }}</label>
                        	@endif
                        	 
                        	<div class="input-group">
								<span class="input-group-addon">
									<i class="fa fa-user-circle-o"></i>
								</span>
								<input id="name" type="text" class="form-control" placeholder="Name" name="name" value="{{ old('name') }}" required autofocus>
							</div>
                        	
                        </div>

                        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                        	
                        	
                        	@if ($errors->has('email'))
                        		<label class="control-label">{{ $errors->first('email') }}</label>
                        	@endif
                        	
                        	<div class="input-group">
								<span class="input-group-addon">
									<i class="fa fa-envelope"></i>
								</span>
								<input id="email" type="email" class="form-control" placeholder="E-Mail Address" name="email" value="{{ old('email') }}" required>
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
								<input id="password" type="password" class="form-control" placeholder="Password" name="password" required>
							</div>
                        	
                        </div>

                        <div class="form-group">
                        	
                        	@if ($errors->has('password_confirmation'))
                        		<label class="control-label">{{ $errors->first('password_confirmation') }}</label>
                        	@endif
                        	
                        	<div class="input-group">
								<span class="input-group-addon">
									<i class="fa fa-lock"></i>
								</span>
								<input id="password-confirm" type="password" class="form-control" placeholder="Confirm Password"  name="password_confirmation" required>
							</div>
                        	
                        </div>

                        <div class="form-group actions">
                            <button type="submit" class="btn btn-primary">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
