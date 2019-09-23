@extends('architect::layouts.master')

@php

$element_type_array = \Modules\Extranet\Entities\Element::TYPES[$element_type];
@endphp

@section('content')
  <div class="container grid-page">
  <div class="row">
    <div class="col-md-offset-2 col-md-8">

      <div class="page-title">
        <h1>
          <i class="{{$element_type_array['icon']}}"></i> {{$element_type_array['name']}}
          <a href="#" class="btn btn-primary add-element"><i class="fa fa-plus-circle"></i> &nbsp; Ajouter {{$element_type_array['name']}}</a>
        </h1>
      </div>

      <div class="grid-items">
        <div class="row">
          <div class="col-xs-3 dashed">
              <a href="#" class="add-element">
                <div class="grid-item">
                    <i class="fa fa-plus"></i>
                    <p class="grid-item-name">
                        Ajouter {{$element_type_array['name']}}
                    </p>
                </div>
              </a>
          </div>
          @foreach($elements as $element)
            <div class="col-xs-3">
                <a href="{{ route('extranet.elements.show', $element["id"]) }}">
                  <div class="grid-item">
                      <i class="fa {{ $element["icon"] }}"></i>
                      <p class="grid-item-name">
                          {{ $element["name"] }}
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

@include('extranet::elements.modal-models')

@endsection


@push('javascripts')
  <script>
    $(function(){

      $(".add-element").click(function(e){
        e.preventDefault();
        TweenMax.to($("#modal-models"),0.5,{opacity:1,display:"block",ease:Power2.easeInOut});
      });

      $(document).on('click',"#modal-models .close-btn",function(e){
        e.preventDefault();
        TweenMax.to($("#modal-models"),0.5,{opacity:0,display:"none",ease:Power2.easeInOut});
      });

    });
  </script>
@endpush
