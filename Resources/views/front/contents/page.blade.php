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
  'mainClass' => $pageType.' '.$htmlClass.' '.$idClass,
  'routeAttributes' => $content->getFullSlug()
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
        <!--h2>{{$content->title}}</h2-->

        @if($page)
        @foreach($page as $index => $node)
            @include('extranet::front.partials.node', [
                'node' => $node,
                'iterator' => $index
            ])
        @endforeach
        @endif
    </article>
    <!-- END ARTICLE -->

@endsection

@push('javascripts')
<script>
    routes = {
        "categoryNews" : "{{route('blog.category.index' ,['slug' => ':slug'])}}",
        "tagNews"      : "{{route('blog.tag.index' ,['slug' => ':slug'])}}" 
    };
</script>
@endpush
