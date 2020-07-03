<!-- FOOTER -->

@php
	$template = collect(\Request::segments())->implode('-');
@endphp

@if($template != "login")
	<footer>
		<!-- Col 2 -->

	<div>
		<div class="row">
		@include ('extranet::front.partials.menu_footer',
				["menu" => get_menu('footer')]
			)

			&nbsp;&nbsp;&nbsp;
			<div class="version" style="">
				Architect v1.18.0@dev v1.18.9@dev
			</div>
	</div>
		<!-- end Col 2 -->
	</footer><!-- END FOOTER -->
@endif
