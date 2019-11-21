@if(isset($menu))
	<ul class="menu">
		@foreach($menu as $index => $menuElement)

		@php
			$link = format_link($menuElement);
			$hasChildren = sizeof($menuElement["children"]) > 0 ? 1 : 0;

			if(!allowed_link($link)){
         continue;
      }
		@endphp

		@if(isset($link))
			<li class="menu-item {{ Request::is($link['request_url'].'*') ? 'active' : '' }}">

					<a href="{{$link["url"]}}" id="{{$link["id"]}}" class="{{$link["class"]}}" >
						@if(isset($link["icon"]))
							<i class="{{$link['icon']}}"></i>
						@endif
						<span class="sidebar-text"> {{$link["name"]}}</span>
					</a>

					@if(sizeof($menuElement["children"]) > 0 )
						<ul class="menu-children">
							@foreach($menuElement["children"] as $child)
								@php
									$childLink = format_link($child)
								@endphp
								@if(isset($childLink))
									<li class"menu-child">
										<a href="{{$childLink["url"]}}" id="{{$childLink["id"]}}" class="{{$childLink["class"]}}" @if(isset($childLink["target"])) target="_blank" @endif >
											@if(isset($childLink["icon"]))
												<i class="{{$childLink['icon']}}"></i>
											@endif
											{{$childLink["name"]}}
										</a>
									</li>
								@endif
							@endforeach
						</ul>
					@endif

			</li>
		@endif
		@endforeach
	</ul>
@endif
