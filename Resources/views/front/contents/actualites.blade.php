@php

    $idClass = isset($content) ? "id_".$content->id : '';
    $parameters = "";
    $first = true;
    $crop = "original";
    $title = $content->getFieldValue('title');
    $typologyName = isset($content->typology) ? $content->typology->name : null;
    $description = $content->getFieldValue('description');

    $htmlClass = isset($contentSettings) && isset($contentSettings['htmlClass']) 
        ? $contentSettings['htmlClass'] 
        : '';

    $pageType = isset($contentSettings) && isset($contentSettings['pageType']) 
        ? $contentSettings['pageType'] 
        : '';

    $date = isset($content->fields[4]) && isset($content->fields[4]->value) 
        ? $content->fields[4]->value 
        : null;

    $image = isset($fields['image']) && isset($fields['image']['value']) 
        ? $fields['image']['value'] 
        : null;

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
  <article class="page-builder">
    <div class="rightbar-page">
      <div class="col-md-9 tipology-container">
        <h4>{{$typologyName}}</h4>
        <h1>{{$title}}</h1>
        <h5>{{null !== $date ? date('d M Y', $date) : "" }}</h5>
        <div class="col-md-4 col-xs-12 no-padding-left">
          @if($image)
            <img src="{{ isset($image['urls']['original']) ? asset($image['urls']['original']) : null }}" style="width: 100%;"/>
          @endif
        </div>
        <div class="col-md-7 col-xs-12">
          <div>{!!$description!!}</div>
        </div>
      </div>
      <div class="sidebar-last-posts">
        <h3>Denières actualités</h3>
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
@endsection