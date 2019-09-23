<div class="row connected-lists">
		        	
	<div class="col-md-1">
	</div>
	
	<div class="connected-list left-list col-md-4">
    	<ul id="sortable1" class="connectedSortable">
    		
    		@foreach($others as $key => $value)
				<li class="ui-state-default" data-id="{{$key}}">{{$value}}</li>
			@endforeach
			
		</ul>
	</div>
	<div class="middle-list col-md-2">
		<div class="content">
			<a href="#" class="add-all">Ajouter tous > </a>
			
			<a href="" class="remove-all">< Retirer tous </a>
		</div>
		
	</div>
	
	<div class="connected-list right-list col-md-4 selected-items"> 
		
		<ul id="sortable2" class="connectedSortable">
		
			@foreach($selected as $key => $value)
				<input type="hidden" name="{{$array_name}}[]" value="{{$key}}" >
				<li class="ui-state-default" data-id="{{$key}}">{{$value}}</li>										
			@endforeach
			
		</ul>
	</div>
	
</div>

@push('javascripts')

<script>
	$(function() {
		
		$( "#sortable1, #sortable2" ).sortable({
	      connectWith: ".connectedSortable"
	    }).disableSelection();
	    
	    var updatePartnerHiddens = function(){
	    	
	    	$("#sortable2 input[type='hidden']").remove();
	    	
	    	$.each($("#sortable2 li"), function(){
	    		$("#sortable2").append('<input type="hidden" name="{{$array_name}}[]" value="'+$(this).data('id')+'" >')
	    	});
	    	
	    };
	    
	    $( "#sortable1, #sortable2" ).on('sortreceive',function(event, ui) {
	    	updatePartnerHiddens();
	    });
	    
	    $(".add-all").click(function(e){
	    	e.preventDefault();
	    	
	    	$("#sortable2").append($("#sortable1 li"));
	    	updatePartnerHiddens();
	    });
	    
	    $(".remove-all").click(function(e){
	    	e.preventDefault();
	    	
	    	$("#sortable1").append($("#sortable2 li"));
	    	updatePartnerHiddens();
	    });
		
	});
</script>
@endpush