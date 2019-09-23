import {
  MODAL_CONTENT_OPEN,
  MODAL_CONTENT_CLOSE,
  MODAL_CONTENT_SELECT,
  MODAL_CONTENT_UNSELECT,
  MODAL_CONTENT_CLEAR,
  MODAL_CONTENT_INIT,
  MODAL_CONTENT_UPDATED,

  PARAMETERS_INIT,
  PARAMETERS_OPEN_MODAL,
  PARAMETERS_CLOSE_MODAL,
  PARAMETERS_UPDATE,
  PARAMETERS_CLEAR,

} from '../constants';

/*
content = {
  id : 1,
  title : "Home",
  params : [{
      name: "",
      value : ""
    },
    {
      name: "",
      value : ""
    },
  ]
}
*/

const initialState =  {
  content : null,
  display : false,
  needUpdate : true,  //update the main field

  //parameters
  parameters : [],  //page parameters to define
  displayParameters : false
}

function getContentParamsValue(contentParams,id) {
    for(var key in contentParams){
      if(contentParams[key].id == id){
        return contentParams[key].value;
      }
    }
    return '';
}

function mergeContentInfo(content,data,params) {

  var newContent = {
    id : data.id,
    title : data.title,
    params : params
  };

  if(content == null)
    return newContent;

  if(content.params !== undefined && content.params != null){
    for(var key in newContent.params){
      newContent.params[key].value = getContentParamsValue(
        content.params,newContent.params[key].id
      );
    }
  }

  return newContent;

}

function getParameters(data) {

  var params = [];

  if(data.routes_parameters !== undefined && data.routes_parameters != null){
    for(var key in data.routes_parameters){
      params.push({
        id: data.routes_parameters[key].id,
        identifier: data.routes_parameters[key].identifier,
        name: data.routes_parameters[key].name,
        value : ''
      })
    }
  }

  return params;
}

function contentsReducer(state = initialState, action) {

    console.log("LinkSettingsField :: REDUCER :: => ",action.type,action.payload);
    const {content} = state;

    switch(action.type) {
        case MODAL_CONTENT_OPEN:

            return {
              ...state,
              display : true,
              content : null,
            };

        case MODAL_CONTENT_CLOSE:

            return {
              ...state,
              display : false
            };
        case MODAL_CONTENT_SELECT :

            return {
              ...state,
              display: false,
              content: action.payload,
              needUpdate : true
            }
        case MODAL_CONTENT_UNSELECT :

            return {
              ...state,
              content: null,
              needUpdate : true
            }
        case MODAL_CONTENT_CLEAR :

            return {
              ...state,
              content: null,
              needUpdate : false
            }
        case MODAL_CONTENT_INIT :

            return {
              ...state,
              content: action.payload,
              needUpdate : false
            }
        case MODAL_CONTENT_UPDATED :
            return {
              ...state,
              needUpdate : false
            }

        case PARAMETERS_INIT :

            //update content with values
            var parameters = getParameters(action.payload);
            console.log("ContentsReducer :: parameters => ",parameters);
            var newContent = mergeContentInfo(content, action.payload, parameters);

            console.log("ContentsReducer => newContent => ",newContent);

            return {
              ...state,
              parameters : parameters,
              content : newContent
            }

        case PARAMETERS_OPEN_MODAL :
            return {
              ...state,
              displayParameters : true
            }
        case PARAMETERS_CLOSE_MODAL :
            return {
              ...state,
              displayParameters : false
            }
        case PARAMETERS_UPDATE :

            for(var key in content.params){
              if(content.params[key].id == action.payload.id){
                content.params[key] = action.payload;
              }
            }

            return {
              ...state,
              content : content,
              needUpdate : true
            }

        default:
            return state;
    }
}

export default contentsReducer;
