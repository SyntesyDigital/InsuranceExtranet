var app = {
    
   dev : true,
   
   debug : function(message){
   
   		//only in dev	
   		if(app.dev && window.console){
	 		console.log(message);
	 	}
   },
   
   error : function(message){
   	
   		if(window.console){
	 		console.error(message);
	 	}
   },
   
   
    /*************************************************/
    
    
    alert: function (msg) {

        var html = '<div class="alert alert-error">';
        html += '<button type="button" class="close" data-dismiss="alert">&times;</button>';
        html += msg;
        html += '</div>';

        $(body).append('<div class="alert_wrapper"></div>');
        $(html).appendTo(".alert_wrapper");
    },

    isJSON: function(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    },

    slugify: function(s){
        var r = s.toString().toLowerCase();
        //r = r.replace(new RegExp("\\s", 'g'),"");
        r = r.replace(new RegExp("[àáâãäå]", 'g'),"a");
        r = r.replace(new RegExp("æ", 'g'),"ae");
        r = r.replace(new RegExp("ç", 'g'),"c");
        r = r.replace(new RegExp("[èéêë]", 'g'),"e");
        r = r.replace(new RegExp("[ìíîï]", 'g'),"i");
        r = r.replace(new RegExp("ñ", 'g'),"n");
        r = r.replace(new RegExp("[òóôõö]", 'g'),"o");
        r = r.replace(new RegExp("œ", 'g'),"oe");
        r = r.replace(new RegExp("[ùúûü]", 'g'),"u");
        r = r.replace(new RegExp("[ýÿ]", 'g'),"y");
        r = r.replace(new RegExp("\\W", 'g'),"-");
        r = r.replace(/^-+/, '');
        r = r.replace(/-+$/, '');

        return r;

        // return text.toString().toLowerCase()
        //     .replace(/\s+/g, '-')           // Replace spaces with -
        //     .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        //     .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        //     .replace(/^-+/, '')             // Trim - from start of text
        //     .replace(/-+$/, '');            // Trim - from end of text

    },

    confirm: function(e) {

        var el = $(e.currentTarget);

        e.preventDefault();

        var msg = el.data('confirm-msg') ? el.data('confirm-msg') : 'Etes-vous sur de vouloir faire cette action ?';

        var html = '<div style="padding-top: 50px">';
        html += '<p align="center"><strong>' + msg + '</strong></p>';
        html += '<p align="center">';
        html += '<a href="#" class="btn btn-danger si" id="modal_confirm_yes">Oui</a>';
        html += ' <a href="#" class="btn btn-default" id="modal_confirm_no">Non</a>';
        html += '</p>';
        html += '</div>';

        app.modal.init(html, {
            css: {
                "width": "400",
                "height": "150",
                "top": "50%",
                "left": "50%",
                "margin-top": -75,
                "margin-left": -200
            },
            onComplete: function() {
                $("#modal_confirm_yes").click(function(e){
                    e.preventDefault();
                    app.modal.close();
                    $(e.currentTarget).trigger(e.type);
                });

                $("#modal_confirm_no").click(function(e){
                    e.preventDefault();
                    app.modal.close();
                });
            }
        });

    },

};
