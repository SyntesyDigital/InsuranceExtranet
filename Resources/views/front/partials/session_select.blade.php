

@if(Auth::user()->supervue)

	@php
		$sessions = Auth::user()->sessions;
		$options = [];
		foreach($sessions as $session) {
			$options[$session->session] = $session->lib;
		}
        $current = isset(Auth::user()->session_info->{'USEREXT.id_per'}) 
            ? Auth::user()->session_info->{'USEREXT.id_per'} 
            : null;
	@endphp

	{!!
		Form::select(
			'sessions',
			$options,
			$current,
			[
				'class' => 'form-control session-changer hidden',
				'id' => 'session-changer',
			]
		)
	!!}

@else
	Bonjour, {{Auth::user()->firstname}}
@endif


@push('javascripts')
<script>

	$(document).ready(function() {
		$('.user-name').find('select[name="sessions"]').select2({
			width: '200px',
		});		
	});

	$(function(){
		
		if($('#session-changer').length > 0){
			$('#session-changer').change(function(e) {

				var sessionId = e.target.value;
				
				$('#session-changer').prop( "disabled", true );

				//post sessions
				$.ajax({
					method: "POST",
					url: '{{ route('session.update') }}',
					data: {
								session_id : sessionId,
								_token: $('meta[name="csrf-token"]').attr('content')
							},
					dataType: 'json'
				}).done(function(response) {
					window.location.href = '/';

				}).fail(function(jqXHR, textStatus) {
					window.location.href = '/';
				});


			});
		}
	});

</script>
@endpush
