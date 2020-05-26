@if(isset($menu))

	<div class="menu-container">
		<div id="sidebar-button" class="menu btn-ham open">
			<div class="icon"></div>
		</div>
	</div>

	<div class="logo-container">
		<a href="{{route('home')}}">
			@if(isset($storedStylesFront['frontLogo']) && isset($storedStylesFront['frontLogo']->value))
				<img src="/{{$storedStylesFront['frontLogo']->value->urls['original']}}" alt="Logo" />
			@else
				<img src="{{asset('modules/architect/images/logo.png')}}" alt=""/>
			@endif
		</a>
	</div>

	<ul class="container-menu">

		@if(Auth::user()->supervue)
			@php
			
				$current = isset(Auth::user()->session_info->{'USEREXT.nom2_per'}) 
					? Auth::user()->session_info->{'USEREXT.nom2_per'} 
				: null;

			@endphp

			<li class="user-item">
				<span class="sidebar-text">{{$current}}</span>
				<a href="" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
					<i class="fas fa-power-off"></i>
				</a>
				<form id="logout-form" action="{{route('logout')}}" method="POST" style="display: none;">
					{{csrf_field()}}
				</form>
			</li>
			
		@endif
		
		@foreach($menu as $index => $menuElement)

		@php
			$link = format_link($menuElement);
			$hasChildren = sizeof($menuElement["children"]) > 0 ? 1 : 0;

			if(!allowed_link($link)){
         		continue;
      		}
		@endphp

		@if(isset($link))
			<li class="menu-item {{ Request::is($link['request_url']) ? 'active' : '' }}" data-toggle="tooltip" data-placement="top" title="">
					
					<a href="{{$link["url"]}}" id="{{$link["id"]}}" class="{{$link["class"]}}" >
						@if(isset($link["icon"]))
							<i class="{{$link['icon']}}"></i>
						@endif
						<span class="sidebar-text"> {{$link["name"]}}</span>
					</a>
					<span class="tooltiptext">{{$link["name"]}}</span>

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
