import {
  FIELD_CHANGE,
  SETTINGS_CHANGE,
  STATUS_CHANGE,
  TRANSLATION_CHANGE,
  TAGS_CHANGE

} from "../constants/";

import {
  saving
} from "./";

export function changeField(field) {

  return { type: FIELD_CHANGE, payload : field }
};

export function changeSettings(settings) {

  return { type: SETTINGS_CHANGE, payload : settings }
};

export function publishToogle(contentId,newStatus) {

  return (dispatch) => {

      dispatch(saving(true));

      axios.put('/architect/contents/' + contentId + '/publish', {
          status : newStatus
      })
      .then((response) => {
          if(response.data.success) {
              toastr.success('ok');
          }

          dispatch({ type: STATUS_CHANGE, payload : newStatus })

      })
      .catch((error) => {
          toastr.error(Lang.get('fields.error'));

          dispatch(saving(false));
      });

  }
}

export function changeTranslation(field) {

    return { type: TRANSLATION_CHANGE, payload : field }
};


export function addTag(tag,tags) {

  return (dispatch) => {

      var found = false;
      for(var i=0;i<tags.length;i++){
        if(tags[i].id == tag.id){
          found = true;
          break;
        }
      }

      if(!found){
        tags.push(tag);

        dispatch({type:TAGS_CHANGE,payload:tags});
      }
      else {
        console.error("Tag already added");
      }
  }

}

export function removeTag(index,tags) {
  return (dispatch) => {
    for(var i=0;i<tags.length;i++){
      if(tags[i].id == index){
        tags.splice(i,1);
        break;
      }
    }

    dispatch({type:TAGS_CHANGE,payload:tags});

  }
}
