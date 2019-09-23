@extends('architect::layouts.master')

@section('content')

{!!
    Form::open([
        'url' => isset($route_parameter)
            ? route('extranet.routes_parameters.update', $route_parameter)
            : route('extranet.routes_parameters.store'),
        'method' => 'POST'
    ])
!!}

{{ Form::hidden('id', isset($route_parameter) ? $route_parameter->id : null) }}
{{ Form::hidden('_method', isset($route_parameter) ? 'PUT' : 'POST') }}

<div class="page-bar">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <a href="{{route('extranet.routes_parameters.index')}}" class="btn btn-default">
                    <i class="fa fa-angle-left"></i>
                </a>

                <h1>
                    <i class="fa fa-reorder"></i> Parametre {{ isset($route_parameter) ? $route_parameter->name : null }}
                </h1>

                <div class="float-buttons pull-right">
                    {!!
                        Form::submit(Lang::get('architect::fields.save'), [
                            'class' => 'btn btn-primary'
                        ])
                    !!}
                </div>
            </div>
        </div>
    </div>
</div>


<div class="container rightbar-page">

    {{-- RIGHT COLUMN --}}

        <div class="col-md-8 page-content">
    		  <div class="form-group {{$errors->has("identifier") ? 'has-error' : ''}}">
      			 {!! Form::label('identifier', 'Identifier') !!}
               {!!
                   Form::text('identifier', isset($route_parameter) ? $route_parameter->identifier : null, [
                       'class' => 'form-control',
                       'id' => 'identifier',
                   ])
             !!}
          </div>
          <div class="form-group {{$errors->has("name") ? 'has-error' : ''}}">
      			 {!! Form::label('name', 'Nom') !!}
               {!!
                   Form::text('name', isset($route_parameter) ? $route_parameter->name : null, [
                       'class' => 'form-control',
                       'id' => 'name',
                   ])
             !!}
          </div>
      </div>

</div>

@endsection
