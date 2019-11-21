
@extends('extranet::front.layouts.app',[
  'name' => isset($tag) ? $tag->getFieldValue('name') : '',
  'mainClass' => 'blog tag'
])

@section('content')


<!-- ARTICLE -->
<article class="content">
   <!-- Col 12 -->
  <div class="grey-intro no-margin">
       <div class="container">
        <div class="row">
        <div class="claim">
        <h1>{{$tag->getFieldValue('name')}}</h1>
        <p>
            {!!$tag->getFieldValue('description')!!}
        </p>
        </div>
      </div>
    </div>

  </div>


  <div id="blog" showTags="0"  showTags ="0" showFilter="0" tagId="{{$tag->id}}" ></div>
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
