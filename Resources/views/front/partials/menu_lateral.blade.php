@if(isset($menu))

	@php
		$storedStylesFront = \Cache::get('frontStyles');
	@endphp

	@if(!$storedStylesFront)
		@php
			$seconds = 24*3600;
			$style = \Modules\Architect\Entities\Style::where('identifier','front')->first();
			$storedStylesFront = (new \Modules\Architect\Transformers\StyleFormTransformer($style))->toArray();
			\Cache::put('frontStyles', $storedStylesFront, $seconds);
		@endphp
	@endif

    @php
        $filteredMenu = [];
		foreach($menu as $index => $menuElement){
            $link = format_link($menuElement);
            
            if(allowed_link($menu[$index])){
                $filteredMenu[] = $link;
            }
        }
    @endphp
    

	<div class="menu-sidebar-container">
		<div id="menuSidebar" class="menuSidebar"
			logo="{{ isset($storedStylesFront['frontLogo']) && isset($storedStylesFront['frontLogo']->value) ? $storedStylesFront['frontLogo']->value->urls['original'] : asset('modules/architect/images/logo.png') }}"
			routeHome="{{route('home')}}"
			currentUser="{{ isset(Auth::user()->session_info->{'USEREXT.nom2_per'}) ? Auth::user()->session_info->{'USEREXT.nom2_per'} : null }}"
			menu="{{ base64_encode(json_encode($filteredMenu)) }}"
			routeLogout="{{route('logout')}}"
		>
		</div>
	</div>
	
@endif	


		
		