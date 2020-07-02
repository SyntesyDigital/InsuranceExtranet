@php
  $htmlClass = isset($contentSettings) && isset($contentSettings['htmlClass']) ? $contentSettings['htmlClass'] : '';
  $pageType = isset($contentSettings) && isset($contentSettings['pageType']) ? $contentSettings['pageType'] : '';
  $idClass = isset($content) ? "id_".$content->id : '';
  $parameters = "";
  $first = true;
  foreach(Request::all() as $key => $value) {
    $parameters.= (!$first?"&":"").$key."=".$value;

    $first = false;
  }
@endphp

@extends('extranet::front.layouts.app',[
  'title' => isset($content) ? $content->getFieldValue('title') : '',
  'mainClass' => $pageType.' actualites '.$htmlClass.' '.$idClass
])

@section('content')
  @if(isset($content) && $content->parent_id != null)
  <div class="single">
    <div class="breadcrumb">
    <div class="container">
      <div class="row">
        {!! breadcrumb($content,$parameters) !!}
      </div>
    </div>
    </div>
  </div>
  @endif

  <!-- ARTICLE -->
  <article class="page-builder">
    <div class="rightbar-page">
      <div class="col-md-9 tipology-container">
        <h5>{{$content->typology->name}}</h5>
        <h1>{{$content->getFieldValue('title')}}</h1>
        {{$content->getFieldValue('date')}}
        <p>{{null !== $content->fields[4]->value ? date('d-m-Y', $content->fields[4]->value) : "" }}</p>
        <div class="col-md-4 col-xs-12 no-padding-left">
          @if (isset($fields['image']['value']))
            <img src="{{ isset($fields['image']['value']['urls']['original']) ? asset($fields['image']['value']['urls']['original']) : null }}" style="width: 100%;"/>
          @endif
        </div>
        <div class="col-md-7 col-xs-12">
          <div>{!!$content->getFieldValue('description')!!}</div>
        </div>
      </div>
      <div class="sidebar-last-posts">
        <h4>Denières actualités</h4>
        <div 
          id="typology-last" 
          class="typology-last" 
          typology_id="{{ $content->typology_id }}"
          size="4"
        >
        </div>
      </div>
    </div>
    
  </article>
  <!-- END ARTICLE --> 
@endsection