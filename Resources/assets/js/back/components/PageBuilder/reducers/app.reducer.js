import {
  INIT_STATE,
  SAVE_LAYOUT,
  LOAD_LAYOUT,
  SAVE_ERROR,
  SAVE_SUCCESS,
  SAVING,
  FIELD_CHANGE,
  SETTINGS_CHANGE,
  STATUS_CHANGE,
  TRANSLATION_CHANGE,
  TAGS_CHANGE,
  CUSTOM_FIELD_CHANGE,
  UPDATE_IMAGE,
  UPDATE_SELECTED_CONTENT,

  INIT_PAGE_STATE,
  UPDATE_LAYOUT,
  UPDATE_ITEM,
  UPDATE_SETTINGS,
  UPDATE_PAGE_IMAGE,
  UPDATE_PAGE_CONTENT,
  UPDATE_PAGE_LAYOUT,
  LOAD_PARAMETERS,
  UPDATE_DEFAULT_PARAMETERS,
  EDIT_ITEM_UPDATE_ELEMENS,
  UPDATE_PARAMETERS

} from '../constants';

import update from 'immutability-helper';
import moment from 'moment';


var translations = {};
LANGUAGES.map(function(v,k){
    translations[v.iso] = true;
});

const initialState =  {
  status : 0,
  //template : '',
  errors : {},

  //typology : '',
  //content : '',
  //fields : '',

  tags : [],
  tagsList : [],

  //page : '',
  pages : '',
  layout : [],
  //parent_id : null,

  //category : null,
  categories : '',

  //created_at : '',
  languages: LANGUAGES,
  translations : '',
  settings : '',
  //saving : false,
  //saved : false,

  //route parameters
  //parameters : [],
  //parametersList : {},

  //loadParameters : false,
  //loadElements : false,
  loaded : false,
  layoutChange : 0
}

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

function appReducer(state = initialState, action) {

    const {fields, translations, parameters,layoutChange} = state;

    //console.log("AppReducer => ",action);

    switch(action.type) {
        case INIT_STATE:

            // Build translations state from content languages fields
            var newTranslations = {};
            LANGUAGES.map(function(language){
                if(action.payload.content) {
                    var exist = false;
                   action.payload.content.languages.map(function(contentLanguage){
                       if(contentLanguage.iso == language.iso) {
                           exist = true;
                       }
                   });
                   newTranslations[language.iso] = exist;
                } else {
                    newTranslations[language.iso] = false;
                }
            });
            newTranslations[DEFAULT_LOCALE] = true;

            var isPage = action.payload.typology ? false : true;

            return {
                ...state,

                page : isPage ? action.payload.page : '',
                pages : action.payload.pages,
                layout : action.payload.page ? action.payload.page : [],

                //status: action.payload.content ? action.payload.content.status : 0,
                //category: action.payload.content && action.payload.content.categories &&
                //  action.payload.content.categories.length > 0 ? action.payload.content.categories[0].id : null,
                errors : {},
                //tags : action.payload.content.tags ? action.payload.content.tags : [],   // Los tags del contenido que hay que guardar
                //tagsList : action.payload.tags ? action.payload.tags : [], // La lista de los tags
                translations: newTranslations,
                //content: action.payload.content,
                //typology: action.payload.typology,
                //categories: action.payload.categories,
                languages: LANGUAGES,
                //fields: isPage ? null : (
                //  action.payload.fields ? action.payload.fields : action.payload.typology.fields
                //),
                //created_at: action.payload.content ? moment(action.payload.content.created_at).format('DD/MM/YYYY') : null,
                //parent_id : action.payload.content ? action.payload.content.parent_id : null,
                //settings : action.payload.settings ? action.payload.settings : (
                //  isPage ? exploteToObject(PAGE_SETTINGS) : exploteToObject(CONTENT_SETTINGS)
                //),
                saving : false,
                saved : action.payload.saved,
            }

        case INIT_PAGE_STATE :

            var pageFields = {};
            var content = action.payload;

            pageFields.title = {
                id:0,
                identifier:"title",
                value:{},
                name:"Titre",
                type:'text',
                icon:'fa-font',
                settings:{
                  entryTitle:true
                }
            };

            pageFields.slug = {
              id:1,
              identifier:"slug",
              value:{},
              name:"Lien permanent",
              type:'slug',
              icon:'fa-link'
            };

            pageFields.description = {
                id:0,
                identifier:"description",
                value:{},
                name:"Description",
                type:'richtext',
                icon:'fa-align-left'
            };


            //console.log("Content => ",content);

            //update the state with content values
            if(content){
                LANGUAGES.map(function(language,k){
                    content.fields.map(function(field){
                        if(field.name == "title") {
                            if(language.id == field.language_id) {
                                pageFields.title.value[language.iso] = field.value;
                            }
                        }

                        if(field.name == "slug") {
                            if(language.id == field.language_id) {
                                pageFields.slug.value[language.iso] = field.value;
                            }
                        }

                        if(field.name == "description") {
                            if(language.id == field.language_id) {
                                pageFields.description.value[language.iso] = field.value;
                            }
                        }
                    });
                });
            }

            var newParameters = [];

            if(content.routes_parameters !== undefined){
              for(var key in content.routes_parameters){
                var parameter = content.routes_parameters[key];

                console.log("parameter => ",parameter);

                newParameters.push({
                  id : parameter.id,
                  identifier : parameter.identifier,
                  name : parameter.name,
                  default : parameter.pivot.preview_default_value,
                  settings : JSON.parse(parameter.pivot.settings),
                });
              }
            }

            return {
              ...state,
              fields : pageFields,
              parameters : newParameters
            }

        case SAVING:
            return {
                ...state,
                saving : action.payload
            }
        case SAVE_ERROR:
            return {
                ...state,
                errors : action.payload,
                saving : false
            }
        case SAVE_SUCCESS:
            return {
                ...state,
                errors : {},
                saving : false,
                saved : true
            }


        case FIELD_CHANGE:

            state[action.payload.name] = action.payload.value;

            return {
              ...state
            }

        case SETTINGS_CHANGE :
            return {
              ...state,
              settings : action.payload
            }

        case STATUS_CHANGE :
            return {
              ...state,
              status : action.payload,
              saving : false
            }

        case TRANSLATION_CHANGE :

            translations[action.payload.name] = action.payload.value;

            return {
              ...state,
              translations
            }
        case TAGS_CHANGE :
            return {
              ...state,
              tags : action.payload
            }

        case CUSTOM_FIELD_CHANGE :

          fields[action.payload.identifier].value = action.payload.value;

          return {
            ...state,
            fields : fields
          }
        case UPDATE_IMAGE :

          return {
            ...state,
            fields : action.payload
          }
        case UPDATE_SELECTED_CONTENT :

          return {
            ...state,
            fields : action.payload
          }

        case UPDATE_PAGE_CONTENT :
        case UPDATE_PAGE_IMAGE :
        case UPDATE_SETTINGS :
        case UPDATE_ITEM :
        case UPDATE_LAYOUT :

          return {
            ...state,
            layout : action.payload,
            layoutChange : layoutChange+1
          }

        case UPDATE_PAGE_LAYOUT :
          return {
            ...state,
            layout : action.payload.layout,
            layoutChange : layoutChange+1,
            settings : action.payload.settings
          }

        case LOAD_PARAMETERS :

            //console.log("LOAD_PARAMETERS,",action.payload)

            return {
              ...state,
              parametersList : action.payload,
              loadParameters : true,
              loaded : state.loadedElements //need to be boeath loadParameters && loadedElements
            }

        case UPDATE_PARAMETERS :
        case UPDATE_DEFAULT_PARAMETERS :

            return {
              ...state,
              parameters : action.payload
            }

        case EDIT_ITEM_UPDATE_ELEMENS :
            //when elements info are loaded, update parameters
            return {
              ...state,
              loadedElements : true,
              loaded : state.loadParameters //need to be boeath loadParameters && loadedElements
            }

        default:
            return state;
    }
}

export default appReducer;
