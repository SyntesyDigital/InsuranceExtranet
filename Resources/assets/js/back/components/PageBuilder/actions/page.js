import {
  INIT_PAGE_STATE,
  UPDATE_LAYOUT,
  UPDATE_ITEM,
  UPDATE_SETTINGS,
  ITEM_POSITION_AFTER,
  ITEM_POSITION_BEFORE,
  UPDATE_PAGE_IMAGE,
  UPDATE_PAGE_CONTENT

} from "../constants/";

function exploteToObject(fields) {

  if(fields == null){
    return null;
  }

  var result = {};

  for(var i=0;i<fields.length;i++){
    result[fields[i]] = null;
  }

  return result;
}


export function initPageState(content) {
  return { type: INIT_PAGE_STATE, payload : content }
};

export function addRow(layout) {

  if(layout == undefined || layout == null){
    layout = [];
  }

  layout.push({
      type : 'row',
      settings : exploteToObject(ROW_SETTINGS),
      children : [
        {
          type : 'col',
          settings : exploteToObject(COL_SETTINGS),
          colClass : 'col-xs-12',
          children : []
        }
      ]
    }
  );

  ////console.log("handleAddRow : layout : ",layout);

  return { type: UPDATE_LAYOUT, payload : layout }
};



export function itemSelected(item,pathToIndex,position,layout) {

  console.log("page.js :: itemSelected ((item,pathToIndex,position,layout)",item,pathToIndex,position,layout);

  if(position != null && position == ITEM_POSITION_BEFORE){
    //put object to the begining
    layout = changeRow(layout,-1,pathToIndex,item,true);
  }
  else {
    //start array with this object
    layout = changeRow(layout,-1,pathToIndex,item);
  }

  return { type: UPDATE_ITEM, payload:layout };
};



export function deleteRow(pathToIndex,layout) {

  layout = removeItem(layout,-1,pathToIndex);

  return { type: UPDATE_LAYOUT, payload : layout }
}

export function pullUpItem(pathToIndex,layout) {

  layout = changeItemChildren(layout,-1,pathToIndex,function(children,index){

    if(children.length > 1 && index > 0 ){
      var temp = children[index-1];
      children[index-1] = children[index];
      children[index] = temp;
    }

    return children;
  });

  return { type: UPDATE_LAYOUT, payload : layout }
}

export function pullDownItem(pathToIndex, layout) {

  layout = changeItemChildren(layout,-1,pathToIndex,function(children,index){

    if(children.length > 1 && index < children.length-1 ){
      var temp = children[index+1];
      children[index+1] = children[index];
      children[index] = temp;
    }

    return children;
  });

  return { type: UPDATE_LAYOUT, payload : layout }
}

export function changeFieldSettings(field,layout){

  layout = changeRowColWithCallback(layout,-1,field.pathToIndex,field.data,
    function(field,data){

        ////console.log("changeRowColWithCallback :: ",field,data);

       field.settings = data.settings;
       return field;
    }
  );

  return { type: UPDATE_SETTINGS, payload : layout }

}

export function changeColumns(pathToIndex,data,layout) {

  layout = changeCols(layout,-1,pathToIndex,data);

  return { type: UPDATE_LAYOUT, payload : layout }

}

export function copyItem(pathToIndex,layout) {

  layout = changeItemChildren(layout,-1,pathToIndex,function(children,index){

    var copy = jQuery.extend(true, {}, children[index]);

    if(index == children.length-1){
      children.push(copy);
    }
    else {
      children.splice(index+1,0,copy);
    }

    return children;
  });

  return { type: UPDATE_LAYOUT, payload : layout }

}


export function changePageField(field,pathToIndex,layout) {

  var data = field;

  ////console.log("changeField => ",field,pathToIndex);

  layout = changeItemWithCallback(layout,-1,pathToIndex,data,
    function(field,newField){
       return newField;
    }
  );

  return { type: UPDATE_LAYOUT, payload : layout }

}

export function deletePageItem(pathToIndex,layout) {

  layout = removeItem(layout,-1,pathToIndex);

  return { type: UPDATE_LAYOUT, payload : layout }

}




export function updatePageImage(media,field,pathToIndex,layout,language, editItem, listItemInfo) {

  //console.log("updatePageImage : editItem => ",editItem.type);

  var fields = null;

  switch (editItem.type) {
      case FIELDS.IMAGES.type:
          layout = addItem(layout,-1,pathToIndex,media);
          break;

      case FIELDS.FILE.type:
      case FIELDS.IMAGE.type:
          layout = changeItem(layout,-1,pathToIndex,media);
          break;

      case FIELDS.TRANSLATED_FILE.type:
          layout = changeItemWithCallback(
            layout,-1,pathToIndex,media, function (field, media){

              if(field.value === undefined || field.value == null ){
                field.value = {};
              }

              field.value[language] = media;
              return field;

            }
          );
          break;

      //case "widget":
      case "widget-list":

          fields = editItem.value[listItemInfo.index].fields;
          var index = getFieldArrayIndex(fields,field.identifier);
          var fieldType = field.type;

          if(index == -1){
              console.error("ModalEditItem :: id not found : "+identifier);
              return;
          }

          //console.log("updatePageImage :: widget-list => ",field,pathToIndex,language,listItemInfo,index);

          layout = changeItemWithCallback(
            layout,-1,pathToIndex,media,function (field, media){

              if(language !== undefined && language != null){

                if(field.value[listItemInfo.index].fields[index].value === undefined ||
                  field.value[listItemInfo.index].fields[index].value == null) {

                  field.value[listItemInfo.index].fields[index].value = {};
                }

                field.value[listItemInfo.index].fields[index].value[language] = media;
              }
              else if(fieldType == FIELDS.IMAGES.type){

                if(field.value[listItemInfo.index].fields[index].value === undefined ||
                  field.value[listItemInfo.index].fields[index].value == null ){

                  field.value[listItemInfo.index].fields[index].value = [];
                }

                field.value[listItemInfo.index].fields[index].value.push(media);

              }
              else {
                field.value[listItemInfo.index].fields[index].value = media;
              }

              return field;

            }
          );

          break;
      case "widget":

          fields = editItem.fields;
          var index = getFieldArrayIndex(fields,field.identifier);

          if(index == -1){
              console.error("Page actions :: id not found : "+field.identifier);
              return;
          }
          ////console.log("updatePageImage :: image widget index => ",field,pathToIndex,language,index);

          var fieldType = field.type;

          layout = changeItemWithCallback(
            layout,-1,pathToIndex,media,
            function (field, media){

              if(language !== undefined && language != null){
                if(field.fields[index].value === undefined || field.fields[index].value == null ||
                  Array.isArray(field.fields[index].value) ){
                  field.fields[index].value = {};
                }

                field.fields[index].value[language] = media;
                ////console.log("updatePageImage :: field.fields[index] => ",field.fields[index]);
              }
              else if(fieldType == FIELDS.IMAGES.type){
                if(field.fields[index].value === undefined || field.fields[index].value == null){
                  field.fields[index].value = [];
                }
                field.fields[index].value.push(media);
              }
              else {
                field.fields[index].value = media;
              }

              return field;
            }
          );

          break;
    }


    return { type: UPDATE_PAGE_IMAGE, payload : layout }
}

export function updatePageContent(content,identifier,pathToIndex,layout,editItem, listItemInfo){

  let fields = null, index = null;

  switch (editItem.type) {

      case FIELDS.CONTENTS.type:
          layout = addItem(layout,-1,pathToIndex,content);
          break;

      case FIELDS.LINK.type:
          layout = changeItemWithCallback(layout,-1,pathToIndex,content,
              function(field,data){

                  if(field.value == null){
                    field.value = {};
                  }
                  else if(field.value.url !== undefined){
                    delete field.value['url'];
                  }
                  field.value.content = content;

                  return field;
              }
          );
          break;

      case "widget":

          fields = editItem.fields;
          index = getFieldArrayIndex(fields,identifier);

          if(index == -1){
              console.error("Page actions :: id not found : "+field.identifier);
              return;
          }

          layout = changeItemWithCallback(layout,
            -1,pathToIndex,content,
            function (field, content){

              field.fields[index] = processContentField(field.fields[index],content);

              return field;

            }
          );
          break;

      case "widget-list":

          fields = editItem.value[listItemInfo.index].fields;
          index = getFieldArrayIndex(fields,identifier);

          if(index == -1){
              console.error("ModalEditItem :: id not found : "+identifier);
              return;
          }

          layout = changeItemWithCallback(layout,
            -1,pathToIndex,content,
            function (field, content){

              field.value[listItemInfo.index].fields[index] = processContentField(
                field.value[listItemInfo.index].fields[index],
                content
              );

              return field;

            }
          );
          break;

  }


  return { type: UPDATE_PAGE_CONTENT, payload : layout }

}


export function addListField(field,pathToIndex,layout) {

  var data = field;


  layout = changeItemWithCallback(layout,-1,pathToIndex,data,
    function(field,data) {
       if(field.value === undefined || field.value == null){
         field.value = [];
       }
       field.value.push(data);
       return field;
     }
  );

  return { type: UPDATE_LAYOUT, payload : layout }
}

export function removeListField(index,pathToIndex,layout) {

  var data = null;

  layout = changeItemWithCallback(layout,-1,pathToIndex,data,
    function(field,data) {

       field.value.splice(index,1);
       return field;
     }
  );

  return { type: UPDATE_LAYOUT, payload : layout }
}

/********************************************************
*     HELPERS to update layout recursively
********************************************************/

function processContentField(field,content) {

  switch (field.type) {

    case FIELDS.LINK.type:
      if(field.value == null || field.value == ""){
        field.value = {};
      }
      else if(field.value.url !== undefined){
        delete field.value['url'];
      }
      field.value.content = content;

      return field;

    case FIELDS.URL.type:
      if(field.value == null || field.value == ""){
        field.value = {};
      }
      else if(field.value.url !== undefined){
        delete field.value['url'];
      }
      field.value.content = content;

      return field;

    case FIELDS.CONTENTS.type:

      if(field.value === undefined || field.value == null){
        field.value = [];
      }

      field.value.push(content);

      return field;
  }

}

function getFieldArrayIndex(fields, identifier) {

  for(var i=0;i<fields.length;i++){
    if(fields[i].identifier == identifier){
      return i;
    }
  }

  return -1;
}

function changeRow(layout,currentIndex,pathToIndex,data,before){
  currentIndex++;

  if(currentIndex == pathToIndex.length -1){

    if(layout[pathToIndex[currentIndex]].children === undefined
      || layout[pathToIndex[currentIndex]].children == null){
        layout[pathToIndex[currentIndex]].children = [];
      }

      if(before !== undefined && before){
          layout[pathToIndex[currentIndex]].children.unshift(data);
      }
      else {
          layout[pathToIndex[currentIndex]].children.push(data);
      }

      return layout;
  }
  else {

    layout[pathToIndex[currentIndex]].children = changeRow(
      layout[pathToIndex[currentIndex]].children,
      currentIndex,
      pathToIndex,
      data,
      before
    );

    return layout;
  }
}

/**
*   Method to add a new element to a field value array. Use for images and contents.
*/
function addItem(layout,currentIndex,pathToIndex,data){

  currentIndex++;

  if(currentIndex == pathToIndex.length -1){

    if(layout[pathToIndex[currentIndex]].field.value === undefined ||
      layout[pathToIndex[currentIndex]].field.value == null){
        layout[pathToIndex[currentIndex]].field.value = [];
      }

    layout[pathToIndex[currentIndex]].field.value.push(data);
    return layout;
  }
  else {

    layout[pathToIndex[currentIndex]].children = addItem(
      layout[pathToIndex[currentIndex]].children,
      currentIndex,
      pathToIndex,
      data
    );

    return layout;
  }
}

function removeItem(layout,currentIndex,pathToIndex){
  currentIndex++;

  if(currentIndex == pathToIndex.length -1){
    layout.splice([pathToIndex[currentIndex]],1);
    return layout;
  }
  else {

    layout[pathToIndex[currentIndex]].children = removeItem(
      layout[pathToIndex[currentIndex]].children,
      currentIndex,
      pathToIndex
    );

    return layout;
  }
}


function changeItemChildren(layout,currentIndex,pathToIndex,callback){
  currentIndex++;

  if(currentIndex == pathToIndex.length -1){
    layout = callback(layout,pathToIndex[currentIndex]);
    return layout;
  }
  else {

    layout[pathToIndex[currentIndex]].children = changeItemChildren(
      layout[pathToIndex[currentIndex]].children,
      currentIndex,
      pathToIndex,
      callback
    );

    return layout;
  }
}

function changeRowColWithCallback(layout,currentIndex,pathToIndex,data,callback){
  currentIndex++;

  if(currentIndex == pathToIndex.length -1){

    ////console.log("changeRowColWithCallback : row col found :: => ", layout[pathToIndex[currentIndex]]);

    layout[pathToIndex[currentIndex]] = callback(
      layout[pathToIndex[currentIndex]],data
    );
    return layout;
  }
  else {

    layout[pathToIndex[currentIndex]].children = changeRowColWithCallback(
      layout[pathToIndex[currentIndex]].children,
      currentIndex,
      pathToIndex,
      data,
      callback
    );

    return layout;
  }
}

function changeCols(layout,currentIndex,pathToIndex,data){
  currentIndex++;

  if(currentIndex == pathToIndex.length -1){
    layout[pathToIndex[currentIndex]].children = data;
    return layout;
  }
  else {

    layout[pathToIndex[currentIndex]].children = changeCols(
      layout[pathToIndex[currentIndex]].children,
      currentIndex,
      pathToIndex,
      data
    );

    return layout;
  }
}

/**
*   Method to change the value of a vield by its path to Index.
*/
function changeItem(layout,currentIndex,pathToIndex,data){
  currentIndex++;

  if(currentIndex == pathToIndex.length -1){
    layout[pathToIndex[currentIndex]].field.value = data;
    return layout;
  }
  else {

    layout[pathToIndex[currentIndex]].children = changeItem(
      layout[pathToIndex[currentIndex]].children,
      currentIndex,
      pathToIndex,
      data
    );

    return layout;
  }
}

/**
*   Method to change the content value of the link
*/
function changeItemWithCallback(layout,currentIndex,pathToIndex,data,callback){
  currentIndex++;

  if(currentIndex == pathToIndex.length -1){

    layout[pathToIndex[currentIndex]].field = callback(
      layout[pathToIndex[currentIndex]].field,data
    );
    return layout;
  }
  else {

    layout[pathToIndex[currentIndex]].children = changeItemWithCallback(
      layout[pathToIndex[currentIndex]].children,
      currentIndex,
      pathToIndex,
      data,
      callback
    );

    return layout;
  }
}
