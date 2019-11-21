
@extends('extranet::front.layouts.app',[
  'name' => isset($category) ? $category->getFieldValue('name') : '',
  'mainClass' => 'blog category',
  'routeAttributes' => ["slug" => $category->getFieldValue('slug')],
])

@section('content')

@if(isset($category))
<div class="single">
  <div class="grey no-margin">
       <div class="container">
        <div class="row">
          <div class="detalls-single">
      		  <div class="col-md-10  col-sm-9 col-xs-12">
      		  	<div class="ariadna">
                {!! breadcrumb_category($category) !!}
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
        <h1>{{$category->getFieldValue('name')}}</h1>
        <p>
            {!!$category->getFieldValue('description')!!}
        </p>
        </div>
      </div>
    </div>

  </div>

  <div id="blog" showTags="0"  showTags ="0" showFilter="0" categoryId="{{$category->id}}" ></div>

  <div id="blog" init="0" showTags="0" ></div>
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
