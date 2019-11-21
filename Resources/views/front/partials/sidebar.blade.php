
<div id="sidebar" class="sidebar initial">

	@if(isset(Auth::user()->id) && isset(Auth::user()->session_id))
		@include ('extranet::front.partials.menu_lateral',
			["menu" => get_menu('sidebar')]
		)
	@endif
</div>
