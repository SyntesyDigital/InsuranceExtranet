var dialog = {

    confirm: function(msg, _callback) {
        bootbox.confirm({
            message: msg,
            buttons: {
                confirm: {
                    label: 'Oui',
                    className: 'btn-primary'
                },
                cancel: {
                    label: 'Non',
                    className: 'btn-default'
                }
            },
            callback: function (result) {
                _callback(result);
            }
        });
    }

};
