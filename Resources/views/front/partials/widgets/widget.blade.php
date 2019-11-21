<div id="{{$field['settings']['htmlId'] or ''}}" class="{{$field['settings']['htmlClass'] or ''}}">

  @include('extranet::front.fields.text',$fields["title"])
  @include('extranet::front.fields.richtext',$fields["richtext"])
  @include('extranet::front.fields.image',$fields["image"])
  @include('extranet::front.fields.link',$fields["link"])

</div>
