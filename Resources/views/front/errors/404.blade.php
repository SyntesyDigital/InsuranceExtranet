@extends('extranet::front.layouts.app',[
  "title" => null
])

@section('content')
  <div class="container">
      <div class="row">
        <div class="col-md-8">
          <h1>{{Lang::get('extranet::messages.page_not_found_title')}}</h1>
          <p>
            {{sprintf(Lang::get('extranet::messages.page_not_found'),Request::url())}}
          </p>
        </div>
      </div>
    </div>
@endsection
