
@php
	$storedStylesFront = \Cache::get('frontStyles');
@endphp
<div id="sidebar" class="sidebar initial">
	@if(isset(Auth::user()->id) && isset(Auth::user()->session_id))
		@include ('extranet::front.partials.menu_lateral',
			["menu" => get_menu('sidebar')]
		)
	@endif
	@if(isset($storedStylesFront['footerPosition']) && $storedStylesFront['footerPosition']->value == true)
		<div class="footer-menu-sidebar">
			@include ('extranet::front.partials.menu_footer',
				["menu" => get_menu('footer')]
			)
		</div>
	@endif
</div>
