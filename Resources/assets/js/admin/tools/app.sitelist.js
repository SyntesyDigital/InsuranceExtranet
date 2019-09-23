app.sitelist = {

    list_json: {},
    source: '',

    init: function() {
        list_json = [];
        if ($('input[name="value"]').val() != '') {
            list_json = JSON.parse($('input[name="value"]').val());
        }
        this.parseJson();

        //FIXME there is an error than only occurs first initialisation
        var self = this;
        setTimeout(function(){
          self.parseJson();
        },1000);
    },

    addNewElement: function() {
        list_json.push({
            name: "",
            value: ""
        });
        this.parseJson();
    },

    parseJson: function() {

        var node = "<div class='row' id='options-ele'>";
        for (var i = 0; i < list_json.length; i++) {
            var ele = list_json[i];
            node += "<div class=\"col-md-12 dragable-option\" draggable=\"true\" ondragstart=\"app.sitelist.dragstart(event)\"  ondragenter=\"app.sitelist.dragenter(event)\" >" +
                "<div class=\"content-add\">" +
                "<div class=\"tool-box\">" +
                "<a class=\"remove-action\" onclick=\"app.sitelist.removeContent(" + i + ")\"><i class=\"fa fa-trash\"></i> &nbsp; Supprimier </a>" +
                "</div>" +
                "<input type=\"text\" name=\"name_json\" oninput=\"list_json[" + i + "].name = this.value;app.sitelist.updatePreview();\" class=\"form-control input-lg input-name-option\" placeholder=\"name\" value=\"" + ele.name + "\"  />" +
                "<input type=\"text\" name=\"value_json\" oninput=\"list_json[" + i + "].value = this.value;app.sitelist.updatePreview();\" class=\"form-control input-sm input-value-option\" placeholder=\"value\" value=\"" + ele.value + "\"  />" +
                "</div>" +
                "</div>";
        }
        node += "</div>"
        $('.content-field-dropper').html(node);
        this.updatePreview();

    },

    dragstart: function(e) {
        source = e.target;
        e.dataTransfer.effectAllowed = 'move';
    },

    dragover: function(e) {
        e.preventDefault();
    },


    isbefore: function(a, b) {
        if (a.parentNode == b.parentNode) {
            for (var cur = a; cur; cur = cur.previousSibling) {
                if (cur === b) {
                    return true;
                }
            }
        }
        return false;
    },


    dragenter: function(e) {
        var targetelem = e.target;
        if (source.nodeName == 'INPUT') {
            return false
        } else {
            if (targetelem.nodeName == "INPUT") {
                targetelem = targetelem.parentNode.parentNode;
            } else {
                if (targetelem.getAttribute('class') == 'content-add') {
                    targetelem = targetelem.parentNode;
                }
            }
            if (this.isbefore(source, targetelem)) {
                targetelem.parentNode.insertBefore(source, targetelem);
            } else {
                targetelem.parentNode.insertBefore(source, targetelem.nextSibling);
            }
        }

    },

    drop: function(e) {
        var options = document.getElementsByClassName("dragable-option");
        list_json = [];
        for (var i = 0; i < options.length; i++) {
            list_json.push({
                name: options[i].getElementsByClassName("input-name-option")[0].value,
                value: options[i].getElementsByClassName("input-value-option")[0].value
            });
        }
        this.parseJson();
    },
    removeContent: function(i) {
        list_json.splice(i, 1);
        this.parseJson();
    },
    updatePreview: function() {
        var type = $('#type').val(),
            name = $('#name').val();

        if (name == '') {
            name = 'Titre';
        }
        preview_html = "<div class='form-group'>" +
            "<label for='preview'>" + name + "</label>";

        switch (type) {
            case 'select':
                preview_html += "<select name='' class='form-control'>";
                for (var i = 0; i < list_json.length; i++) {
                    preview_html += "<option value='" + list_json[i].value + "'>" + list_json[i].name + "</option>";
                }
                preview_html += "</select>";
                break;
            case 'checkbox':
                for (var i = 0; i < list_json.length; i++) {
                    preview_html += "<div class='checkbox'>" +
                        "<label style='font-size: .8em'>" +
                        "<input type='checkbox' name='' value='" + list_json[i].value + "'>" +
                        "<span class='checkbox-material'><span class='check'></span></span>" +
                        list_json[i].name +
                        "</label>" +
                        "</div>";
                }
                break;
            case 'radios':
                for (var i = 0; i < list_json.length; i++) {
                    preview_html += "<div class='radio'>" +
                        "<label style='font-size: .8em'>" +
                        "<input type='radio' name='' value='" + list_json[i].value + "'>" +
                        "<span class='circle'></span><span class='check'></span>" +
                        list_json[i].name +
                        "</label>" +
                        "</div>";
                }
                break;
            default:
                break;
        }

        preview_html += "</div>"

        $('#preview').html(preview_html);
        $('input[name="value"]').val(JSON.stringify(list_json));
    },


}

$('#general-delete-btn').on('click', function(e) {
    e.preventDefault();

    var route = $(e.target).closest('#general-delete-btn').data('ajax');
    var redirection = $(e.target).closest('#general-delete-btn').data('redirection');

    bootbox.confirm({
        message: 'Etes-vous sur de vouloir supprimer cette List ?',
        buttons: {
            confirm: {
                label: 'Oui',
                className: 'btn-success'
            },
            cancel: {
                label: 'Non',
                className: 'btn-danger'
            }
        },
        callback: function(result) {
            if (result) {
              $.ajax({
                type:'DELETE',
                url:route
              })
              .done(function(response) {

                  if(response.success) {
                      toastr.success('Suppression effectué avec succès', {timeOut: 10000});

                      setTimeout(function(){
                          window.location.href = redirection;
                      },1500);

                  } else {
                      toastr.error( 'Error', {timeOut: 10000});
                  }

              }).fail(function(response){
                  toastr.error('Error', {timeOut: 10000});
              });
            }
        }
    });
});

$('.sitelist .add-item').on('click',function(e) {

  e.preventDefault();

  app.sitelist.addNewElement();
});
