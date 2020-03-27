import {
  INIT_STATE,
  DUPLICATE,
  SAVE_LAYOUT,
  LOAD_LAYOUT,
  SUBMIT_FORM,
  SAVE_CONTENT,
  UPDATE_CONTENT,
  SAVE_ERROR,
  SAVE_SUCCESS,
  SAVING,
  CUSTOM_FIELD_CHANGE,
  UPDATE_DEFAULT_PARAMETERS

} from "../constants/";

export function initState(payload) {
  return { type: INIT_STATE, payload }
};

export function duplicate(contentId) {

  return (dispatch) => {

      dispatch(saving(true));

      axios.post('/architect/contents/' + contentId + '/duplicate', {})
          .then((response) => {
              if(response.data.content) {
                  window.location.href = "/architect/contents/" + response.data.content.id;
              }
          })
          .catch((error) => {
              ////console.log(error.config);
              dispatch(saving(false));
          });
  }
}

export function submitForm(data) {

    if(data.content_id == null){
        return createContent(data);
    }
    else {
        return updateContent(data);
    }
}

export function saving(boolean) {
  return { type: SAVING, payload:boolean };
}

export function createContent(data) {

  return (dispatch) => {

    dispatch(saving(true));

    axios.post('/architect/contents', data)
       .then((response) => {
           if(response.data.success) {
               dispatch(onSaveSuccess(response.data));
               setTimeout(function(){
                   window.location.href = routes.showContent.replace(':id',response.data.content.id);
               },1500);
           }
       })
       .catch((error) => {

            dispatch(saving(false));

           if (error.response) {
               dispatch(onSaveError(error.response.data));
           } else if (error.message) {
               toastr.error(error.message);
           } else {
               //console.log('Error', error.message);
           }
       });
    }
}

export function updateContent(data) {

    return (dispatch) => {

      dispatch(saving(true));

      axios.put('/architect/contents/' + data.content_id + '/update', data)
          .then((response) => {
              if(response.data.success) {
                  dispatch(onSaveSuccess(response.data));
              }
          })
          .catch((error) => {

              dispatch(saving(false));

              if (error.response) {
                  dispatch(onSaveError(error.response.data));
              } else if (error.message) {
                  toastr.error(error.message);
              } else {
                  //console.log('Error', error.message);
              }
          });
    }
}

export function deleteContent(contentId, formData) {

  var _this = this;

  return (dispatch) => {
    axios.delete('/architect/contents/' + contentId + '/delete', formData)
        .then((response) => {
            if(response.data.success) {

                toastr.success(Lang.get('fields.delete')+'! '+Lang.get('fields.redirect')+' ...');
                setTimeout(function(){
                  window.location.href= "/architect/contents/";
                },1000);

            }
        })
        .catch((error) => {
            if (error.response) {
                dispatch(onSaveError(error.response.data));
            } else if (error.message) {
                toastr.error(error.message);
            } else {
                //console.log('Error', error.message);
            }
            ////console.log(error.config);
        });
    }
}

export function onSaveError(response) {

  var errors = response.errors ? response.errors : null;
  var stateErrors = {};

  if(errors) {

      var fields = errors.fields ? errors.fields : null;

      if(fields) {
          fields.map(function(field){
             Object.keys(field).map(function(identifier){
                 stateErrors[identifier] = field[identifier];
             })
          });
      }
  }

  if(response.message) {
      toastr.error(response.message);
  }

  return {type : SAVE_ERROR, payload : stateErrors};

}

export function onSaveSuccess(response) {
    if(response.content) {

        toastr.success(Lang.get('models.content_saved'));

        return {type : SAVE_SUCCESS, payload : response.content};
    }
}

export function customFieldChange(field) {
    return {type : CUSTOM_FIELD_CHANGE, payload : field};
}

export function saveLayout(name,layout,settings) {

  return (dispatch) => {
    axios.post('/architect/page-layouts', {
        name : name,
        definition : layout,
        settings : settings
    })
    .then((response) => {
        toastr.success(Lang.get('modals.template_saved'));
    })
    .catch((error) => {
        toastr.error(Lang.get('fields.error')+'!');
    });
  }
}

export function updateDefaultParameters(parameters) {
  return { type: UPDATE_DEFAULT_PARAMETERS, payload:parameters }
};
