$(function() {
	$('#table').DataTable({
	    language: {
	        "url": "/modules/extranet/plugins/datatables/locales/french.json"
	    },
		processing: true,
      	serverSide: true,
	    pageLength: 10,
		order: [ 1, "desc" ],
	    ajax: $('#table').data('url'),
	    columns: [
	        {data: 'id', name: 'id', width: "40"},
	        {data: 'title', name: 'title'},
            {data: 'created_at', name: 'created_at', searchable: false},
            {data: 'applied', name: 'applied', searchable: false},
            {data: 'recipient', name: 'recipient'},
	        {data: 'action', name: 'action', orderable: false, searchable: false}
	    ],
	    initComplete: function () {
			var _this = this;
			DataTableTools.init(this);
			$('#actions-th').css('min-width', '50px');
	    }
    });
});
