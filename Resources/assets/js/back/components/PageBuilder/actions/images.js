import {
  IMAGE_OPEN_MODAL,
  IMAGE_CLOSE_MODAL,
  IMAGE_CANCEL,
  IMAGE_SELECT,
  UPDATE_IMAGE

} from "../constants/";

import {
  saving
} from "./";

export function selectImage(field, language) {

  ////console.log("Images : selectImage ",identifier,language);
  var listItemIndex = -1;
  //FIXME try to find a more elegant way
  if(field.type !== undefined && field.type == "list-item"){
    //if the event came from the list item, then save the array of the fields
    listItemIndex = field.index;
  }

  return { type: IMAGE_SELECT, payload : {
      identifier : field,
      language : language !== undefined ? language : null,
      listItemIndex : listItemIndex !== undefined ? listItemIndex : null
  }}
};

export function cancelImage() {

  return { type: IMAGE_CANCEL };
};

export function updateImage(field, media, fields, language) {

  //console.log("Image :: updateImages ",field,media,fields,language);

  switch (field.type) {
      case FIELDS.IMAGES.type:
          fields[field.identifier].value.push(media);
          break;

      case FIELDS.FILE.type:
      case FIELDS.IMAGE.type:
          fields[field.identifier].value = media;
          break;

      case FIELDS.TRANSLATED_FILE.type:

          if(fields[field.identifier].value === undefined || fields[field.identifier].value == null ){
            fields[field.identifier].value = {};
          }

          fields[field.identifier].value[language] = media;
          break;

  }

  return {
    type : UPDATE_IMAGE,
    payload : fields
  }

}
