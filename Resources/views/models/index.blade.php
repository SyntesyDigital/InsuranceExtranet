@extends('architect::layouts.master')


@section('content')
  <div class="container grid-page">
    <div class="row">
      <div class="col-md-offset-2 col-md-8">

        <div class="page-title">
          <h1>{{Lang::get('extranet::models.models')}}</h1> <a href="#" class="btn btn-primary"><i class="fa fa-plus-circle"></i> &nbsp; {{Lang::get('extranet::models.add')}}</a>
        </div>

        <div class="grid-items">
          <div class="row">
              @foreach($models as $model)
                <div class="col-xs-3">
                    <a href="{{ route('extranet.models.show', $model) }}">
                      <div class="grid-item">
                          <i class="fa {{$model->icon}}"></i>
                          <p class="grid-item-name">
                              {{$model->title}}
                          </p>
                      </div>
                    </a>
                </div>
              @endforeach()

          </div>
        </div>

      </div>
    </div>
  </div>
  @include('extranet::models.modal-new')

@stop

@push('javascripts')

<script>
$(function(){

  $(".btn-primary").click(function(e){
    e.preventDefault();
    TweenMax.to($("#new-model-modal"),0.5,{opacity:1,display:"block",ease:Power2.easeInOut});
  });

  $(document).on('click',"#new-model-modal .close-btn",function(e){
    e.preventDefault();
    TweenMax.to($("#new-model-modal"),0.5,{opacity:0,display:"none",ease:Power2.easeInOut});
  });

});
</script>

@endpush
