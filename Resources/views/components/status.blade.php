<button class="btn btn-status dropdown-toggle" data-toggle="dropdown">
	@foreach($statusOptions as $key => $value)
		<span class="status-option status-{{$key}}" style="@if($key != $item->status) display:none; @endif">
    		<i class="fa fa-circle @if($key == 'PUBLISHED') text-success @else text-warning @endif"></i>
    		{{$value}}
    		<span class="caret"></span>
		</span>
	@endforeach
</button>
<ul class="dropdown-menu">
	@foreach($statusOptions as $key => $value)
		<li><a href="#" class="btn-status-option status-{{$key}}" data-id="{{$item->id}}" data-status="{{$key}}">@if($item->status == $key)<i class="fa fa-check"></i>@endif {{$value}}</a></li>
	@endforeach
</ul>
