@php
	$storedStylesFront = \Cache::get('frontStyles');
	$textContact = isset($storedStylesFront['footerContactText']) ? $storedStylesFront['footerContactText']->value : '';
	$phone = isset($storedStylesFront['footerContactPhone']) ? $storedStylesFront['footerContactPhone']->value : '';
	$footerContactRolesExcluded = isset($storedStylesFront['footerContactRolesExcluded']) && $storedStylesFront['footerContactRolesExcluded'] != ''?  explode(",",str_replace ( ' ','',$storedStylesFront['footerContactRolesExcluded']->value)) : [];
	$hideFooterByRole = in_array(Auth::user()->veos_role,$footerContactRolesExcluded);
@endphp
<div id="sidebar" class="sidebar initial">
	@if(isset(Auth::user()->id) && isset(Auth::user()->session_id))
		@include ('extranet::front.partials.menu_lateral',
			["menu" => get_menu('sidebar')]
		)
	@endif
    @if(isset($storedStylesFront['footerPosition']) && $storedStylesFront['footerPosition']->value == true && !$hideFooterByRole)
        <style>
            body .wrapper-menu{
                margin-bottom: unset;
            }
        </style>
		<div class="contact-sidebar">
			<div class="icon"></div>
			<div class="wrapper-content">
				<div class="text">{!! $textContact !!}</div>
				<div class="number">{!! $phone !!}</div>
			</div>
		</div>
		<div class="footer-menu-sidebar">
			@include ('extranet::front.partials.menu_footer',
				["menu" => get_menu('footer')]
			)
		</div>
	@endif
</div>
