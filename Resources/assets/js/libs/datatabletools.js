var DataTableTools = {

    init: function(instance)
    {
        var self = this;
        var instanceId = "#"+instance.attr('id');

        $(instance).find('[data-filter="select"]').each(function(k,v){
            self._select(instance, $(this));
        });

        /*$(instance).find('[data-toogle="delete"]').each(function(k,v){
            self._delete(instance, $(this));
        });*/

        $(document).on('click',instanceId+' [data-toogle="delete"]',function(e){
         e.preventDefault();
         var button = $(e.target).closest('[data-toogle="delete"]');
         self._delete(instance, button);
       });


        $(instance).find('[data-toogle="save-onchange"]').each(function(k,v){
            self._saveOnChange(instance, $(this));
        });
    },

    /*
     *  Set select filter
     *
     *  Toogle :
     *     data-filter="select"
     *  Params :
     *      (optional) data-ajax="http://.../"
     *      (optional) data-values="{...json object...}"
     *
     */
    _select: function(instance, el)
    {
        instance.api().columns(el).every( function () {
            var column = this;

            var select = $('<select><option value=""></option></select>')
                .appendTo($(column.footer()).empty())
                .on('change', function () {
                    column
	                    .search($(this).val(), false, false, true)
	                    .draw();
                });

            if(el.data('values')) {
                $.each(JSON.parse(atob(el.data('values'))), function(k, v) {
                    select.append('<option value="' + k +'">'+ v +'</option>')
                });
                return;
            }

            if(el.data('ajax')) {
                $.ajax(el.data('ajax'), {
                    method: "GET",
                    data: {},
                    success: function (response) {
                        $.each(response, function(k, v) {
                            select.append('<option value="' + k +'">'+ v +'</option>')
                        });
                    },
                    error: function () {}
                });
                return;
            }

            column.data().unique().sort().each(function(d, j) {
                select.append('<option value="' + d +'">'+ d +'</option>')
            });
        });
    },

    /*
     *  Set select filter
     *
     *  Toogle :
     *     data-filter="save-onchange"
     *  Params :
     *      data-url="http://.../" => URL of ajax query
     *      data-id="" => ID of the item
     *
     *  Note : Use on input or select form item,
     *  method will send form data
     */
    _saveOnChange: function(instance, el)
    {
        el.off('change')
            .on('change', function(e){
                $.ajax($(this).data('url'), {
                    method: "POST",
                    data: {
                        _token: $('meta[name="csrf-token"]').attr('content'),
                        id: el.data('id'),
                        value: el.val()
                    },
                    success: function () {
                        toastr.success('Changement enregistré.');
                    },
                    error: function () {
                        toastr.error('Une erreur s\'est produite.');
                    }
                });
            });
    },

    /*
     *  Delete toogle on button or link (<a href="">...</a>)
     *
     *  Toogle :
     *     data-toogle="delete"
     *  Params :
     *      data-confirm-message="Message we want to display for confirm"
     *      (optional) data-ajax="http://..."
     *      (optional) data-redirect="http://..."
     *
     */
    _delete: function(instance, el)
    {
        var ajax = el.data('ajax');
        var redirect = el.data('redirect');
        var confirmMessage = el.data('confirm-message');

        dialog.confirm(confirmMessage, function(result){
            if(result) {

                if(redirect) {
                    window.location = redirect;
                    return;
                }

                if(ajax) {
                    $.ajax({
                        method: 'DELETE',
                        url: ajax,
                        data: {
                            _token: $('meta[name="csrf-token"]').attr('content'),
                        }
                    })
                    .done(function(response) {
                        if(response.success) {
                            $(instance).DataTable().ajax.reload();
                            toastr.success(response.message, 'Succès !', {timeOut: 3000});
                        } else {
                            toastr.error(response.message, 'Erreur !', {timeOut: 3000});
                        }
                    }).fail(function(response){
                        toastr.error(response.message, 'Erreur !', {timeOut: 3000});
                    });
                    return;
                }

            }
        });
    }

}
