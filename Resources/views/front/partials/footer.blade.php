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
				Architect v1.18.0@dev v1.18.7@dev
			</div>
	</div>
		<!-- end Col 2 -->
	</footer><!-- END FOOTER -->
@endif

<<<<<<< HEAD
		&nbsp;&nbsp;&nbsp;
		<div class="version" style="">
<<<<<<< HEAD
			Architect v1.18.0@dev v1.18.7@dev
=======
			Architect v1.17.0 v1.17.5
>>>>>>> master
		</div>
  </div>
	<!-- end Col 2 -->
</footer><!-- END FOOTER -->
=======
>>>>>>> d53eb060ef47ada4613a5b4df924733850c0d411
