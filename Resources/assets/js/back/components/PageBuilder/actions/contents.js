import {
  CONTENT_CANCEL,
  CONTENT_SELECT,
  UPDATE_SELECTED_CONTENT

} from "../constants/";


export function selectContent(identifier, listItemIndex) {

  var listItemIndex = -1;
  //FIXME try to find a more elegant way
  if(identifier.type !== undefined && identifier.type == "list-item"){
    //if the event came from the list item, then save the array of the fields
    listItemIndex = identifier.index;
  }

  return { type: CONTENT_SELECT, payload : {
      identifier : identifier,
      listItemIndex : listItemIndex
  }}
};

export function cancelContent() {

  return { type: CONTENT_CANCEL };
};


export function updateSelectedContent(identifier, content, fields) {

  Object.keys(fields).map(function(k){
      if(fields[k].identifier == identifier){
          switch(fields[k].type) {
              case FIELDS.URL.type:
              case FIELDS.LINK.type:

                  if(fields[identifier].value == null){
                    fields[identifier].value = {};
                  }
                  else if(fields[identifier].value.url !== undefined){
                    delete fields[identifier].value['url'];
                  }
                  fields[identifier].value.content = content;
                  break;
              case FIELDS.CONTENTS.type:
                  if(fields[identifier].value == null) {
                      fields[identifier].value = [];
                  }
                  fields[identifier].value.push(content);
                  break;
          }
      }
  })

  return {
    type : UPDATE_SELECTED_CONTENT,
    payload : fields
  }

}
