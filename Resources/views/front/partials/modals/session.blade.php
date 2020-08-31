@push('javascripts')
<script>
	
	$(function(){
		var sessions = {!!json_encode(Auth::user()->sessions)!!};
		var options = [{
				text: 'Sélectionner...',
				value: '',
		}];

		for(var i=0;i<sessions.length;i++){
			options.push({
					text: sessions[i]['lib'],
					value: sessions[i]['session'],
			})
		}

		bootbox.prompt({
		    title: "Sélectionnez une session",
		    inputType: 'select',
				closeButton : false,
				buttons: {
		        confirm: {
		            label: 'Envoyer',
		            className: 'btn-primary'
		        },
						cancel : {
								label: 'Retour',
								className: 'btn-default'
						}
		    },
		    inputOptions: options,
		    callback: function (result) {
	        	if(result != null && result != ''){
						//post sessions
						$.ajax({
							method: "POST",
							url: '{{ route('session.update') }}',
							data: {
										session_id : result,
										_token: $('meta[name="csrf-token"]').attr('content')
									},
							dataType: 'json'
						}).done(function(response) {

							window.location.href = '/';		

						}).fail(function(jqXHR, textStatus) {
								window.location.href = '/';
						});
				}
				else {
					//logout
					document.getElementById('logout-form').submit();
				}
		    }
		});

		$(document).ready(function() {
			$('.bootbox-body').find('.bootbox-input-select').select2({
				width: '100%',
				minimumInputLength : options.length > 500 ? 3 : 0,
                language: 'fr'
			});
		});
		
	});

	
	
</script>

@endpush
