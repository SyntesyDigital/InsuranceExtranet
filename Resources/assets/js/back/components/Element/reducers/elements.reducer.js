import {
  HAS_MODAL_ELEMENTS_OPEN_MODAL,
  HAS_MODAL_ELEMENTS_CLOSE_MODAL,
  HAS_MODAL_ELEMENTS_UPDATE,
  HAS_MODAL_ELEMENTS_CLEAR,
  HAS_MODAL_ELEMENTS_SELECT,
  HAS_MODAL_ELEMENTS_UNSELECT,
  HAS_MODAL_ELEMENTS_INIT,
  HAS_MODAL_ELEMENTS_UPDATED,

  HAS_MODAL_ELEMENTS_PARAMETERS_INIT,
  HAS_MODAL_ELEMENTS_PARAMETERS_OPEN_MODAL,
  HAS_MODAL_ELEMENTS_PARAMETERS_CLOSE_MODAL,
  HAS_MODAL_ELEMENTS_PARAMETERS_UPDATE,
  HAS_MODAL_ELEMENTS_PARAMETERS_CLEAR,

  HAS_MODAL_CONTENTS_OPEN_MODAL,
  HAS_MODAL_CONTENTS_CLOSE_MODAL,
  HAS_MODAL_CONTENTS_SELECT

} from '../constants';

/*
element = {
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
  element : null,
  display : false,
  needUpdate : true,  //update the main field

  //parameters
  //parameters : [],  //page parameters to define
  displayParameters : false,

  displayContents : false,
  content : null
}

/*
*  Take the same values from old parameters.
*/
function getElementParamsValue(elementParams,id) {
    for(var key in elementParams){
      if(elementParams[key].id == id){
        return elementParams[key].value;
      }
    }
    return '';
}

function mergeElementInfo(element,data) {

  //console.log("elements.reduces : mergeElementInfo : (element,data)",element,data);

  //get the new element with new information and parameters

  //set value to default
  for(var i=0; i<data.parameters.length;i++){
    data.parameters[i].value = '';
    delete data.parameters[i].created_at;
    delete data.parameters[i].updated_at;
  }

  var newElement = {
    id : data.id,
    title : data.name,
    icon : data.icon,
    params : data.parameters,
    type : data.type
  };

  //if not yet element set, get this new element
  if(element == null)
    return newElement;

  //check if parameters already setup, and take the same values
  if(element.params !== undefined && element.params != null){
    for(var key in newElement.params){
      newElement.params[key].value = getElementParamsValue(
        element.params,newElement.params[key].id
      );
    }
  }

  return newElement;

}

function elementsReducer(state = initialState, action) {

    console.log("LinkSettingsField :: REDUCER :: => ",action.type,action.payload);
    const {element} = state;

    switch(action.type) {

        case HAS_MODAL_CONTENTS_OPEN_MODAL:
            return {
              ...state,
              displayContents : true
            }
        
        case HAS_MODAL_CONTENTS_CLOSE_MODAL:
            return {
              ...state,
              displayContents : false
            }

        case HAS_MODAL_CONTENTS_SELECT : 
            return {
              ...state,
              content : action.payload,
              displayContents : false
            }

        case HAS_MODAL_ELEMENTS_OPEN_MODAL:

            return {
              ...state,
              display : true,
              element : null,
            };

        case HAS_MODAL_ELEMENTS_CLOSE_MODAL:

            return {
              ...state,
              display : false
            };
        case HAS_MODAL_ELEMENTS_SELECT :

            return {
              ...state,
              display: false,
              element: action.payload,
              needUpdate : true
            }
        case HAS_MODAL_ELEMENTS_UNSELECT :

            return {
              ...state,
              element: null,
              content : null,
              needUpdate : true
            }
        case HAS_MODAL_ELEMENTS_CLEAR :

            return {
              ...state,
              element: null,
              contents : null,
              needUpdate : false
            }

        case HAS_MODAL_ELEMENTS_INIT :

            return {
              ...state,
              element: action.payload,
              needUpdate : false
            }

        case HAS_MODAL_ELEMENTS_UPDATED :
            return {
              ...state,
              needUpdate : false
            }

        case HAS_MODAL_ELEMENTS_PARAMETERS_INIT :

            //update element with values
            console.log("ElementsReducer :: parameters => ",element,action.payload);

            var newElement = mergeElementInfo(element, action.payload);
            console.log("ElementsReducer => newElement => ",newElement);

            return {
              ...state,
              //parameters : parameters,
              element : newElement
            }


        case HAS_MODAL_ELEMENTS_PARAMETERS_OPEN_MODAL :
            return {
              ...state,
              displayParameters : true
            }
        case HAS_MODAL_ELEMENTS_PARAMETERS_CLOSE_MODAL :
            return {
              ...state,
              displayParameters : false
            }
        case HAS_MODAL_ELEMENTS_PARAMETERS_UPDATE :

            for(var key in element.params){
              if(element.params[key].id == action.payload.id){
                element.params[key] = action.payload;
              }
            }

            return {
              ...state,
              element : element,
              needUpdate : true
            }

        default:
            return state;
    }
}

export default elementsReducer;
