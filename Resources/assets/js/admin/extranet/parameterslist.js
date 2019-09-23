$(function() {
   $('#table-routes-parameters').DataTable({
        language: {
            "url": "/modules/extranet/plugins/datatables/locales/french.json"
        },
        processing: true,
        serverSide: true,
        pageLength: 10,
        ajax: routes.data,
        columns: [
            {data: 'identifier', name: 'identifier'},
            {data: 'name', name: 'name'},
            {data: 'action', name: 'action', orderable: false, searchable: false}
        ],
        initComplete: function () {
			       DataTableTools.init(this);
        }
   });
});
