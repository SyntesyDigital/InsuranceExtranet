@php
  $htmlClass = 'blog '.(isset($contentSettings) && isset($contentSettings['htmlClass']) ? $contentSettings['htmlClass'] : '');
  $pageType = isset($content->typology->name) ? $content->typology->name : '';
  $idClass = isset($content) ? "id_".$content->id : '';
@endphp

@extends('extranet::front.layouts.app',[
  'title' => isset($content) ? $content->getFieldValue('title') : '',
  'mainClass' => $pageType.' blog '.$htmlClass.' '.$idClass
])

@section('content')

@if(isset($content))
<div class="single">
  <div class="breadcrumb">
       <div class="container">
        <div class="row">
          <div class="detalls-single">
      		  <div class="col-md-10  col-sm-9 col-xs-12">
      		  	<div class="ariadna">
                {!! breadcrumb($content) !!}
                </div>
      		  </div>
    	   </div>
  		 </div>
  	</div>
  </div>
</div>
@endif

<!-- ARTICLE -->
<article class="content">
   <!-- Col 12 -->
  <div class="grey-intro no-margin">
       <div class="container">
        <div class="row">
        <div class="claim">

        <h1>{{$content->getFieldValue('title')}}</h1>
        <p>
            {!!$content->getFieldValue('descripcio')!!}
        </p>
        </div>
      </div>
    </div>

  </div>

  <!-- POt ser vairies coses -->

   <div class="white">
      <div class="container">
        <div class="row">
            <div class="col-md-9 col-sm-10 col-xs-12 centered">
            @php $any_media = false;   @endphp
            @if ($fields['rotatorio']['value'] && count($fields['rotatorio']['value']) > 0)
              @include('extranet::front.partials.fields.carousel_single',  [
               "field" => $fields['rotatorio'],
              ])
              @php $any_media = true; @endphp
            @endif

            @if (isset($fields['video']['value']['url'][App::getLocale()]))
              @include('extranet::front.partials.fields.video',  [
                 "field" => $fields['video'],
                ])
                @php $any_media = true; @endphp
            @endif

            @if(!$any_media && $fields['imatge']['value'])
              <img
                src="{{ isset($fields['imatge']['value']['urls']['large']) ? asset($fields['imatge']['value']['urls']['large']) : null }}"
                alt="{{$fields['imatge']['value']->metadata['fields']['alt'][App::getLocale()]['value'] or ''}}"
                title="{{$fields['imatge']['value']->metadata['fields']['title'][App::getLocale()]['value'] or ''}}"
              />
            @endif

            </div>
        </div>
      </div>
    </div>
  </div>

    <div class="white">
      <div class="row">
        <div class="container">
          <div class="col-md-9 col-sm-10 col-xs-12 centered">
            @php  $categories = $content->categories->all(); $first_cat = true; @endphp
            <p class="details">
              {{null !== $content->getFieldValue('data')? date('d-m-Y',$content->getFieldValue('data')):""}}
              @foreach($categories as $cat)
                @if($first_cat)
                  |
                  @php $first_cat = false; @endphp
                @else
                   ·
                @endif
                <a href="{{route('blog.category.index' , $cat->getFieldValue('slug'))}}">{{$cat->getFieldValue('name')}}</a>
              @endforeach

               | <span>{{$content->author->firstname.' '.$content->author->lastname }}</span>
              </p>

              {!! $content->getFieldValue('contingut') !!}

              @include('extranet::front.partials.fields.file',["field" =>$fields['pdf']])

              <br/>
              <br/>

              <img src="{{asset('modules/architect/images/comments.jpg')}}" />


          <ul class="tags_blog">
            @php  $tags = $content->tags->all(); @endphp
              @foreach($tags as $tag)
                <li  href="{{$tag->getFieldValue('slug')}}"><a href="{{route('blog.tag.index' ,$tag->getFieldValue('slug'))}}" >{{$tag->getFieldValue('name')}}</a></li>
              @endforeach
          </ul>

        </div>
      </div>
    </div>

    <div id="related-news" content="{{$content->id}}" tags="{{isset($content->tags)?$content->tags->pluck('id'):null}}" category="{{null !== $content->categories->first()?$content->categories()->first()->id:null }}" ></div>


    <div id="blog" init="0" showTags="0" ></div>

  </div>



</div>
</article>
<!-- END ARTICLE -->

@endsection

@push('javascripts')
<script>
    routes = {"categoryNews" : "{{route('blog.category.index' ,['slug' => ':slug'])}}",
              "tagNews"      : "{{route('blog.tag.index' ,['slug' => ':slug'])}}" };
    $(function(){

    });

</script>
@endpush
