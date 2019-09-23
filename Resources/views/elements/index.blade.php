@extends('architect::layouts.master')

@php

$element_types = \Modules\Extranet\Entities\Element::TYPES;
@endphp

@section('content')
  <div class="container grid-page">
  <div class="row">
    <div class="col-md-offset-2 col-md-8">

      <div class="page-title">
        <h1>Éléments</h1>
      </div>

      <div class="grid-items">
        <div class="row">
          @foreach($element_types as $element_type)
            <div class="col-xs-3">
                <a href="{{ route('extranet.elements.typeIndex', $element_type["identifier"]) }}">
                  <div class="grid-item">
                      <i class="fa {{ $element_type["icon"] }}"></i>
                      <p class="grid-item-name">
                          {{ $element_type["name"] }}
                      </p>
                  </div>
                </a>
            </div>
          @endforeach


        </div>
      </div>

    </div>
  </div>
</div>
@endsection


@push('javascripts')

@endpush
