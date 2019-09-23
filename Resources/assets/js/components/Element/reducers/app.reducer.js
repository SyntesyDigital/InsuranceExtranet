import {
  INIT_STATE,
  INPUT_CHANGE,
  DELETE_ELEMENT,
  SAVE_ERROR,
  SAVE_SUCCESS,

  FIELD_ADD,
  FIELD_MOVE,
  FIELD_REMOVE,
  FIELD_CHANGE,

  SETTINGS_OPEN,
  SETTINGS_CHANGE,
  SETTINGS_CLOSE,
  SETTINGS_CLOSED,

  ADD_PARAMETER,
  REMOVE_PARAMETER,

} from '../constants';

import update from 'immutability-helper';


var translations = {};
LANGUAGES.map(function(v,k){
    translations[v.iso] = true;
});

const initialState =  {
  translations : translations,
  fields : [],
  inputs: {
      name: "",
      identifier: "",
      icon: ""
  },
  errors: {
      name: null,
      identifier: null,
      fields: null,
  },
  settingsField: null,
  fieldsList : [],
  model : null,
  element : null,
  settingsField : null,
  modelParameters : null,
  modalSettingsDisplay : false
}

function checkIfFieldAdded(field,fields) {
  for(var key in fields){
    if(fields[key].identifier == field.identifier){
      return true;
    }
  }
  return false;
}

function mergeFieldSettings(field,modelField) {
  //console.log("Merge => ,",field," => ",modelField);
  if(modelField.rules !== undefined){
    for(var key in modelField.rules){
      if(field.rules[modelField.rules[key]] === undefined){
        field.rules[modelField.rules[key]] = null;
      }
    }
  }

  if(modelField.settings !== undefined){
    for(var key in modelField.settings){
      if(field.settings[modelField.settings[key]] === undefined){
        field.settings[modelField.settings[key]] = null;
      }
    }
  }

  return field;
}

function checkIfFilterExist(filterIdentifier, parameters) {

}

function getParamerter(identifier, parametersList){

  for(var key in parametersList) {
    if(parametersList[key].identifier == identifier){
      return parametersList[key];
    }
  }

  return null;
}

function getModelParameters(model) {

  var modelFilters = model.FILTRES;

  var filters = [];

  if(modelFilters != "" && modelFilters != null ){
    var modelFiltersArray = modelFilters.split(",");
    for(var key in modelFiltersArray){
      var modelFiltersValues = modelFiltersArray[key].split("=");
      filters.push(modelFiltersValues[0]);
    }
  }

  return filters;
}

function updateParamertsFromModel(model,parameters, parametersList) {

    var filters = getModelParameters(model);

    for(var key in filters) {
      if(getParamerter(filters[key], parameters) == null) {
        //dont exist yet add parameter
        var newParameter = getParamerter(filters[key], parametersList);
        if(newParameter != null){
          parameters.push(newParameter);
        }
        else {
          console.error("Parameter need to be created with key => ",filters[key]);
        }
      }
    }

    return parameters;
}


function appReducer(state = initialState, action) {

    const {fields, fieldsList, settingsField, parameters, parametersList} = state;

    switch(action.type) {
        case INIT_STATE:

            var elementInputs = {
              name: "",
              identifier: "",
              icon: {
                label: '',
                value: ''
              }
            };

            if(action.payload.element == null || action.payload.element == '') {
              elementInputs = {
                name: action.payload.model.TITRE,
                identifier: action.payload.model.ID,
                icon: {
                  label: action.payload.model.ICONE,
                  value: action.payload.model.ICONE
                }
              };
            }
            else {
              //element already defined
              elementInputs = {
                name: action.payload.element.name,
                identifier: action.payload.element.identifier,
                icon: {
                  label: action.payload.element.icon,
                  value: action.payload.element.icon
                }
              };

              //check if field already added
              for(var key in action.payload.fieldsList){
                action.payload.fieldsList[key].added = checkIfFieldAdded(
                  action.payload.fieldsList[key],action.payload.element.fields
                );
              }

            }

            var modelParameters = getModelParameters(action.payload.model);

            //check from model if paramerts correctly set
            var parametersMerged = updateParamertsFromModel(
              action.payload.model,
              action.payload.parameters,
              action.payload.parametersList
            );

            return {
                ...state,
                element : action.payload.element,
                model : action.payload.model,
                fieldsList : action.payload.fieldsList,
                inputs : elementInputs,
                wsModelIdentifier : action.payload.wsModelIdentifier,
                wsModel : action.payload.wsModel,
                wsModelFormat : action.payload.wsModelFormat,
                wsModelExemple : action.payload.wsModelExemple,
                elementType :  action.payload.elementType,
                parameters: parametersMerged,
                parametersList : action.payload.parametersList,
                modelParameters : modelParameters,
                fields : action.payload.element != null ?
                  action.payload.element.fields : []
            }
        case INPUT_CHANGE :

            const {inputs} = state;
            inputs[action.field.name] = action.field.value;

            return {
                ...state,
                inputs
            }
        case SAVE_ERROR :

          var stateErrors = state.errors;
          var errors = action.payload;

          if(errors != null) {
              Object.keys(stateErrors).map(function(k){
                  stateErrors[k] = errors[k] ? true : false;
              });
          }

          return {
              ...state,
              errors : stateErrors
          };

        case SAVE_SUCCESS :

          for(var i=0;i<fields.length;i++){
            fields[i].saved = true;
          }

          return {
            ...state,
            element : action.payload,
            fields : fields
          };

        case DELETE_ELEMENT:
            return {
              ...state
            }

        case FIELD_ADD :

            fields.push(action.payload);

            for(var key in fieldsList){
              if(fieldsList[key].identifier == action.payload.identifier){
                fieldsList[key].added = true;
              }
            }

            return {
              ...state,
              fields,
              fieldsList
            }
        case FIELD_MOVE :

            const dragField = fields[action.payload.dragIndex];

            return update(state, {
                    fields: {
                        $splice: [
                            [action.payload.dragIndex, 1],
                            [action.payload.hoverIndex, 0, dragField]
                        ],
                    },
                });

        case FIELD_REMOVE :

            var currentIdentifier = "";

            for (var i = 0; i < fields.length; i++) {
                if (action.payload == fields[i].id) {
                    currentIdentifier = fields[i].identifier;
                    fields.splice(i, 1);
                    break;
                }
            }

            for(var key in fieldsList){
              if(fieldsList[key].identifier == currentIdentifier){
                fieldsList[key].added = false;
                break;
              }
            }

            return {
              ...state,
              fields,
              fieldsList
            }
        case FIELD_CHANGE :

            for (var i = 0; i < fields.length; i++) {
                if (action.payload.id == fields[i].id) {
                   fields[i]["name"] = action.payload.name;
                   break;
                }
            }

            return {
              ...state,
              fields
            }

        case SETTINGS_OPEN :

            var newField = null;

            for(var key in fields){
              if(fields[key].id == action.payload){
                newField = fields[key];
                break;
              }
            }

            console.log("Check merge !");

            //check if new settings are available
            if(newField != null){
              for(var key in fieldsList){
                if(fieldsList[key].identifier == newField.identifier){
                  newField = mergeFieldSettings(newField,fieldsList[key]);
                  break;
                }
              }
            }

            return {
              ...state,
              settingsField : newField,
              modalSettingsDisplay : true
            }

        case SETTINGS_CHANGE :

            var field = action.payload;

            settingsField[field.source][field.name] = field.value;

            //console.log("SETTINGS_CHANGE :: ",settingsField);

            return {
              ...state,
              settingsField : settingsField
            }

        case SETTINGS_CLOSE :

            return {
              ...state,
              modalSettingsDisplay : false
            }

        case SETTINGS_CLOSED :

            return {
              ...state,
              settingsField : null
            }

        case ADD_PARAMETER :
            var found = false;
            for(var i=0;i<parameters.length;i++){
              if(parameters[i].id == action.payload.id){
                found = true;
                break;
              }
            }

            if(!found){
              parameters.push(action.payload);
            }


            return {
              ...state,
              parameters
            }


        case REMOVE_PARAMETER :
            var found = false;
            for(var i=0;i<parameters.length;i++){
              if(parameters[i].id == action.payload){
                parameters.splice(i,1);
                break;
              }
            }

            return {
              ...state,
              parameters
            }

        default:
            return state;
    }
}

export default appReducer;
