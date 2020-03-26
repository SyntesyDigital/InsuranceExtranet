import {
  EDIT_ITEM_CANCEL,
  EDIT_ITEM_SELECT,
  UPDATE_EDIT_ITEM,
  INIT_EDIT_ITEM_MODAL,
  EDIT_ITEM_UPDATE_CATEGORIES,
  EDIT_ITEM_UPDATE_ELEMENS,
  LOAD_PARAMETERS

} from '../constants';

const initialState =  {
  //modal states
  displayModal: false,
  item : null,

  categories : [],
  originalCategories : [],

  originalElements : [],
  fileElements : [],
  formElements : [],
  formElementsV2 : [],
  tableElements : [],
  parameters : {},

  typologies : [],
  selectableTypologies : [],
  listableTypologies : [],

  //typologies id allowed FIXME from configuration or directly from typology
  selectableArray : [4,6,7,14],
  nonSelectableTypologies : [1]
}

function modalEditReducer(state = initialState, action) {

    //const {fields, translations} = state;

    switch(action.type) {
        case INIT_EDIT_ITEM_MODAL :

           var newSelectableTypologies = [{
             id:'',
             name:'----'
           }];

            for(var key in TYPOLOGIES){
              if(state.selectableArray.indexOf(parseInt(TYPOLOGIES[key].id)) != -1){
                newSelectableTypologies.push(TYPOLOGIES[key]);
              }
            }

            var newListableTypologies = [{
              id:'',
              name:'----'
            }];

            for(var key in TYPOLOGIES){
              if(state.nonSelectableTypologies.indexOf(parseInt(TYPOLOGIES[key].id)) == -1){
                newListableTypologies.push(TYPOLOGIES[key]);
              }
            }

            var typologies = [{
              id:'',
              name:'----'
            }];

            for(var key in TYPOLOGIES){
              typologies.push(TYPOLOGIES[key]);
            }

            return {
                ...state,
                selectableTypologies : newSelectableTypologies,
                listableTypologies : newListableTypologies,
                typologies : typologies
            }

        case EDIT_ITEM_UPDATE_CATEGORIES :
            return {
              ...state,
              originalCategories : action.payload.originalCategories,
              categories : action.payload.categories
            }
        case EDIT_ITEM_UPDATE_ELEMENS :
            return {
              ...state,
              originalElements : action.payload.originalElements,
              fileElements : action.payload.fileElements,
              tableElements : action.payload.tableElements,
              formElements : action.payload.formElements,
              formElementsV2 : action.payload.formElementsV2,
            }

        case EDIT_ITEM_SELECT :
            return {
                ...state,
                displayModal : true,
                item : action.payload
            }
        case EDIT_ITEM_CANCEL :
            return {
                ...state,
                displayModal : false,
                item : null
            }

        case UPDATE_EDIT_ITEM:
            return {
                ...state,
                displayModal : false,
                item : null
            }
        case LOAD_PARAMETERS :

            //console.log("LOAD_PARAMETERS,",action.payload)

            return {
              ...state,
              parameters : action.payload
            }

        default:
            return state;
    }
}

export default modalEditReducer;
