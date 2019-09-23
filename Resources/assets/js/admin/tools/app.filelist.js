app.filelist = {

    list_json: {},
    source: '',
    myDropzone : '',

    init: function() {
        //DropZone Init
        myDropzone = new Dropzone('.medias-dropfiles', {
                        url : 'tools/filelist/store',
                        uploadMultiple: false,
                        parallelUploads: 1,
                        addRemoveLinks : false,
                        maxFilesize: 2, // MB
                        paramName : 'file',
                        thumbnail: function(file, dataUrl) {
                            return false;
                        },
                        sending: function(file, xhr, formData) {
                            formData.append("_token", token);
                        },
                        init: function() {
                            this.on("error", function(file, response) {
                                toastr.error(response);
                            });
                        }
                    });

        myDropzone.on("totaluploadprogress", function(progress) {
            $(".progress-bar").parent().addClass("progress-striped active");
            $(".progress-bar").width(progress + "%");
            $(".progress-bar").html(progress + "%");
        });

        myDropzone.on("maxfilesreached", function() {
            alert('Too many files added !');
        });

        myDropzone.on("dragenter", function() {
            $('.medias-dropfiles').addClass("active");
        });

        myDropzone.on("dragleave dragend dragover", function() {
            $('.medias-dropfiles').removeClass("active");
        });

        myDropzone.on("maxfilesexceeded", function(file) {
            alert('File ' + file.name + ' is too big !');
        });

        myDropzone.on("queuecomplete", function(file, response) {
            setTimeout(function(){
                $(".progress-bar").parent().removeClass("progress-striped active");
                $(".progress-bar").width("0%");
                $(".progress-bar").html("");
            }, 1000);

        });

        myDropzone.on("success", function(file, response) {
            toastr.success('Votre fichier vient d\'être enregistré');
            myDropzone.removeAllFiles(true);
            $('#fileurl').val(response.path);
            $('#filedate').val(response.date);
            $('#filename-p').html("<i class='fa fa-file'> "+response.path+"</i>");
        });
        //END DropZone Init

        //LISTENERS
        $(".content-field-dropper").on('click', '.remove-action',  function() {

            var num =this.getAttribute("num");
            bootbox.confirm({
                message: "Êtes-vous sur de vouloir supprimer cette document?",
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
                    if(result) {
                        app.filelist.removeContent(num);
                    }
                }
            });

        });

        $(".content-field-dropper").on('click', '.edit-action',  function() {
            app.filelist.editContent(this.getAttribute("num"));
        });

        //List Init
        list_json = [];
        if($('input[name="value"]').val() != ''){
            list_json = JSON.parse($('input[name="value"]').val());
        }
        this.parseJson();

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': token
            }
        });
    },

    //List functions
    resetFields: function(){
        $('.fichier-field').val('');
        $('#filetype').val($("#filetype option:first").val());
        $("input[name=visible][value='1']").prop("checked", true);
        $('#filename-p').html("");
        $('#filename-p').hide();
        $('.dz-div').show();
    },

    addEditFile: function(){
        var filename = $('#filename').val(),
            filetype = $('#filetype').val(),
            visible =  $('input[name="visible"]:checked').val(),
            fileurl = $('#fileurl').val(),
            filedate = $('#filedate').val();
            filenum = $('#filenum').val();

        if(filename == ''){
            toastr.error('Le champ nom du document est obligatoire');

            return false;
        }
        if(fileurl == ''){
            toastr.error('Le fichier est obligatoire');
            return false;
        }

        if(filenum == ''){
         list_json.push({filename: filename, filetype: filetype, visible: visible, fileurl: fileurl, filedate: filedate});
        }else{
        list_json[filenum].filename = filename;
        list_json[filenum].filetype = filetype;
        list_json[filenum].visible = visible;
        list_json[filenum].fileurl = fileurl;
        list_json[filenum].filedate = filedate;
        }

        this.resetFields();
        this.parseJson();
        $('#form-filelist').submit();
    },

    removeContent: function(i){
        filename = list_json[i].fileurl;
        list_json.splice(i,1);
        this.parseJson();

        $.ajax( {
            type: "POST",
            url: "/architect/tools/filelist/delete",
            data: {
                "filename" : filename
                },
            success: function (data) {
                if(data =='deleted'){
                    toastr.success('Fichier supprimé correctement');
                }else{
                    toastr.error('Il y avait une erreur');
                }
            },
            error: function () {
                toastr.error('Il y avait une erreur');
            }
        });

        this.saveChanges();
    },

    saveChanges: function() {
        value = $('input[name="value"]').val();
        $.ajax( {
            type: "POST",
            url: "/architect/tools/filelist/sort",
            data: {
                "value" : value
                },
            success: function (data) {
                if(data =='saved'){
                    return true;
                }else{
                    return false;
                }
            },
            error: function () {
                return false;
            }
        });
    },

    editContent: function(i){
        $('#title').html('Edition du fichier');
        $('#filename').val(list_json[i].filename);
        $('#filetype').val(list_json[i].filetype);
        if(list_json[i].visible == 0){
            $("input[name=visible][value='0']").prop("checked", true);
        }else{
            $("input[name=visible][value='1']").prop("checked", true);

        }
        $('#fileurl').val(list_json[i].fileurl);
        $('#filedate').val(list_json[i].filedate);
        $('#filenum').val(i);
        $('#filename-p').html("<i class='fa fa-file'><a href='/storage/filelist/"+list_json[i].fileurl+"' target='_blank'>"+list_json[i].fileurl+"</a></i>");
        $('.dz-div').hide();
        $('#filename-p').show();
    },

    parseJson: function(){
        var node = "<div class='row' id='options-ele'>";
        for (var i = 0; i < list_json.length; i++) {
            var ele = list_json[i];
            var visible = 'Oui';
            if(list_json[i].visible == 0){
                visible = 'Non';
            }
            node += "<div class='col-md-12 dragable-option' draggable='true' ondragstart='app.filelist.dragstart(event)'  ondragenter='app.filelist.dragenter(event)' >"
                +"<div class='content-add content-add-list'>"
                    +"<div class='tool-box'>"
                        +"<a class='edit-action' num='"+i+"'><i class='fa fa-pencil-alt'></i></a>"
                        +"<a class='remove-action text-danger'  num='"+i+"' ><i class='fa fa-trash'></i></a>"
                    +"</div>"
                    +"<h4 class='filename-list'><i class='fa fa-file'></i> <b><span class='fname'>"+list_json[i].filename+"</span></b></h4>"
                    //+"<p class='filefields-list'><b>Fichier: </b><span class='furl'>"+list_json[i].fileurl+"</span></p>"
                    //+"<p class='filefields-list'><b>Envoyé: </b><span class='fdate'>"+ app.filelist.getFrenchMonth(list_json[i].filedate)+"</span></p>"
                    +"<p class='filefields-list'><b>Type: </b><span class='ftype'>"+list_json[i].filetype+"</span> </p>"
                    +"<p class='filefields-list'><b>Visible: </b><span class='fvisible'>"+visible+"</span></p>"
                +"</div>"
            +"</div>";
        }
        node += "</div>"
        $('.content-field-dropper').html( node );
        $('input[name="value"]').val( JSON.stringify( list_json ) );
        $('#title').html('Ajouter un fichier');
        this.resetFields();
    },
    //END List functions

    //Drag and Drop function
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
        if(source.nodeName == 'H4' || source.nodeName == 'P' || source.nodeName == 'B' || source.nodeName == 'SPAN'){
            return false
        }else{
            if (targetelem.nodeName == "H4" || targetelem.nodeName == "P" ) {
                targetelem = targetelem.parentNode.parentNode;
            } else {
                if (targetelem.nodeName == "B" || targetelem.nodeName == "SPAN") {
                        return false
                }else{
                  if(targetelem.getAttribute('class') == 'content-add') {
                    targetelem = targetelem.parentNode;
                    }
                }
            }
           // console.log('SOURCE:'+source.nodeName+'SOURCE CLASS:'+source.getAttribute('class')+' TARGET:'+targetelem.nodeName+'TARGET CLASS:'+targetelem.getAttribute('class') );
            if ( this.isbefore(source, targetelem)) {
                targetelem.parentNode.insertBefore(source, targetelem);
            } else {
                targetelem.parentNode.insertBefore(source, targetelem.nextSibling);
            }
        }
    },

    drop: function(e){
        var options = document.getElementsByClassName("dragable-option");
        list_json = [];
        for (var i = 0; i < options.length; i++) {
            list_json.push({filename: options[i].getElementsByClassName('fname')[0].innerHTML, filetype: options[i].getElementsByClassName('ftype')[0].innerHTML, visible: options[i].getElementsByClassName('fvisible')[0].innerHTML, fileurl: options[i].getElementsByClassName('furl')[0].innerHTML, filedate: options[i].getElementsByClassName('fdate')[0].innerHTML});
        }
        this.parseJson();
         this.saveChanges();
    },

    getFrenchMonth: function(date){
        date = date.split('-');
        switch(date[1]) {
            case "01":
                return date[2]+" Janvier " + date[0];
                break;
            case "02":
                return date[2]+" Février " + date[0];
                break;
            case "03":
                return date[2]+" Mars " + date[0];
                break;
            case "04":
                return date[2]+" Avril " + date[0];
                break;
            case "05":
                return date[2]+" Mai " + date[0];
                break;
            case "06":
                return date[2]+" Juin " + date[0];
                break;
            case "07":
                return date[2]+" Juillet " + date[0];
                break;
            case "08":
                return date[2]+" Août " + date[0];
                break;
            case "09":
                return date[2]+" Septembre " + date[0];
                break;
            case "10":
                return date[2]+" Octobre " + date[0];
                break;
            case "11":
                return date[2]+" Novembre " + date[0];
                break;
            case "12":
                return date[2]+" Décembre " + date[0];
                break;
            default:
                return "";
        }
    }
}
