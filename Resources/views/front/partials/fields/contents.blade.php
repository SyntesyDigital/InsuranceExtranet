<div id="{{$field['settings']['htmlId'] or ''}}" class="contents {{$field['settings']['htmlClass'] or ''}}">
  <ul class="list-items ">

      @foreach($field['value'] as $item)
        <li class="col-md-4 col-sm-6 col-xs-12">

        @include('extranet::front.partials.typologies.'.strtolower($item['typology']['identifier']),
          [
            "field" => $item,
            "settings" => $field['settings']
          ]
        )

        </li>

      @endforeach
	</ul>
</div>
