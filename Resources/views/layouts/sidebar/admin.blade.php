<div id="accordion">

	<li class="{{ Request::is('admin/dashboard*') ? 'active' : '' }}">
		<a href="{{ action('Admin\HomeController@index') }}">
			<i class="fa fa-home"></i>
			<span class="text">
				Accueil
			</span>
		</a>
	</li>

	<li class="{{ Request::is('admin/users*') ? 'active' : '' }}">
	    <a href="#" data-target="#item1" data-parent="#accordion"  data-toggle="collapse" data-parent="#stacked-menu">
	        <i class="fa fa-users"></i>
	        <span class="text">
	            Utilisateurs
	            <span class="caret"></span>
	        </span>
	    </a>

	    <ul class="nav nav-stacked collapse left-submenu {{ Request::is('admin/users*') || Request::is('admin/experts*') || Request::is('admin/partners*') || Request::is('admin/admins*') ? 'in' : '' }}" id="item1">
	        <li class="{{ Request::is('admin/users/pending*') ? 'active' : '' }}">
	        	<a href="#">
	        		<i class="fa fa-user-times"></i>
	        		<span class="text">
	        			En attente
	        		</span>
	        	</a>
	        </li>

	      </ul>

	</li>

</div>

@push('javascripts')
<script>
	$(function(){

		//close other tabs
		var $myGroup = $('#accordion');
		$myGroup.on('show.bs.collapse','.collapse', function() {
			$myGroup.find('.collapse.in').collapse('hide');
		});
	});
</script>


@endpush
