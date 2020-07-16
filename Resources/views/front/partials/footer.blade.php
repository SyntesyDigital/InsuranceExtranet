<!-- FOOTER -->

@php
	$template = collect(\Request::segments())->implode('-');
	$storedStylesFront = \Cache::get('frontStyles');
@endphp

@if( $template != 'login' )
	@if( $template != 'reset-password')
		<footer>
			<!-- Col 2 -->

		<div>
			<div class="row">
				@if(isset($storedStylesFront['footerPosition']) && $storedStylesFront['footerPosition']->value == true)
					@else
					@include ('extranet::front.partials.menu_footer',
						["menu" => get_menu('footer')]
					)
				@endif
				&nbsp;&nbsp;&nbsp;
				<div class="version" style="">
					Architect v1.19.0@dev v1.19.21@dev
					
				</div>
		</div>
			<!-- end Col 2 -->
		</footer><!-- END FOOTER -->
	@endif
@endif
