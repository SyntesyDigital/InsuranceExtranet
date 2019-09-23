import {
  INIT_STATE,
  INPUT_CHANGE,
  DELETE_ELEMENT,
  SAVE_SUCCESS,
  SAVE_ERROR,
  SUBMIT_FORM,
  CREATE_ELEMENT,
  UPDATE_ELEMENT,

  FIELD_ADD,
  FIELD_MOVE,
  FIELD_REMOVE,
  FIELD_CHANGE,

  SETTINGS_OPEN,
  SETTINGS_CHANGE,
  SETTINGS_CLOSE,
  SETTINGS_CLOSED,

  ADD_PARAMETER,
  REMOVE_PARAMETER

} from "../constants/";

export function initState(payload) {
  return { type: INIT_STATE, payload }
};


export function inputChange(field){

  return {type: INPUT_CHANGE, field};

}

export function submitForm(data) {

  console.log("submitForm :: ",data);

  if(data.elementId == null){
      return createElement(data);
  }
  else {
      return updateElement(data);
  }

}

export function createElement(data) {

  var _this = this;
  console.log('CREATE::',data);

  return (dispatch) => {

    axios.post('/architect/elements/store', data)
       .then((response) => {

           if(response.data.success) {
               dispatch(onSaveSuccess(response.data))
               setTimeout(function(){
                   window.location.href = routes.showElement.replace(':element',response.data.element.id);
               },1500);
           }
       })
       .catch((error) => {
           if (error.response) {
               dispatch(onSaveError(error.response.data));
           } else if (error.message) {
               toastr.error(error.message);
           } else {
               console.log(Lang.get('fields.error'), error.message);
           }
       });

  };
}

export function updateElement(data) {

    var _this = this;
    console.log('UPDATE::',data);
    return (dispatch) => {

      axios.put('/architect/elements/' + data.elementId + '/update', data)
           .then((response) => {
               if(response.data.success) {
                   dispatch(onSaveSuccess(response.data));
               }
           })
           .catch((error) => {
               if (error.response) {
                   dispatch(onSaveError(error.response.data));
               } else if (error.message) {
                   toastr.error(error.message);
               } else {
                   console.log('Error', error.message);
               }
               //console.log(error.config);
           });
      }

}

export function deleteElement(elementId) {

  var _this = this;

  return (dispatch) => {

      axios.delete('/architect/elements/' + elementId + '/delete')
          .then((response) => {
              if(response.data.success) {

                  dispatch(onSaveSuccess(response.data))

                  window.location.href = routes['elements'];
              }
          })
          .catch((error) => {
              if (error.response) {
                  dispatch(onSaveError(error.response.data));
              } else if (error.message) {
                  toastr.error(error.message);
              } else {
                  console.log('Error', error.message);
              }
          });
    }

}

//TODO needs test
export function onSaveSuccess(response) {
  //set all fields to saved

  toastr.success(Lang.get('fields.success'));

  return {type : SAVE_SUCCESS, payload : response.element};

}

export function onSaveError(response) {

  var errors = response.errors ? response.errors : null;

  if(response.message) {
      toastr.error(response.message);
  }

  return {type : SAVE_ERROR, payload : errors};

}


export function addField(payload) {

  return {type : FIELD_ADD, payload : payload};

}

export function moveField(dragIndex, hoverIndex) {

  return {type : FIELD_MOVE, payload : {
    dragIndex : dragIndex,
    hoverIndex : hoverIndex
  }};

}

export function changeField(payload) {

  return {type : FIELD_CHANGE, payload : payload};

}

export function removeField(fieldId) {

  return {type : FIELD_REMOVE, payload : fieldId};

}

export function openModalSettings(fieldId) {

  return {type : SETTINGS_OPEN, payload : fieldId};

}

export function changeFieldSettings(field) {

  return {type : SETTINGS_CHANGE, payload : field};

}

export function closeModalSettings() {

  return {type : SETTINGS_CLOSE};

}

export function onModalSettingsClosed() {

  return {type : SETTINGS_CLOSED};

}


export function addParameter(payload) {

  return {type : ADD_PARAMETER, payload : payload};

}

export function removeParameter(payload) {

  return {type : REMOVE_PARAMETER, payload : payload};

}
