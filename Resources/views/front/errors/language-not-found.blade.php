@extends('extranet::front.layouts.app',[
  "title" => null
])

@section('content')
  <div class="container">
      <div class="row">
        <div class="col-md-offset-1 col-md-10">
          <h1>Idioma no disponible</h1>
          <p>
            {{sprintf(Lang::get('extranet::messages.page_not_found'),Request::url())}}
          </p>
        </div>
      </div>
    </div>
@endsection
