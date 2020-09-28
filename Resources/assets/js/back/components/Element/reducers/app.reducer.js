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

  ELEMENT_PARAMETERS_UPDATE

} from '../constants';

import {
  setSettings,
  exploteToObject,
  getFieldToAdd,
  mergeFieldSettings,
  getRequiredFields
} from '../functions';

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
  modalSettingsDisplay : false,
  tabsRoutes: {}
}

function checkIfFieldAdded(field,fields) {
  for(var key in fields){
    if(fields[key].identifier == field.identifier){
      return true;
    }
  }
  return false;
}



function checkIfFilterExist(filterIdentifier, parameters) {

}

function getParamerter(identifier, parametersList){

  for(var key in parametersList) {
    if(parametersList[key].identifier == identifier){
      return key;
    }
  }

  return null;
}

/*
*   variables came from Forms procedures. Only works for forms.
*/
function getModelParameters(model) {

  var modelFilters = model.FILTRES;

  var filters = [];

  //we find variables in FILTRES variables.
  if(modelFilters != "" && modelFilters != null ){
    var modelFiltersArray = modelFilters.split(",");
    for(var key in modelFiltersArray){
      var modelFiltersValues = modelFiltersArray[key].split("=");
      filters.push(modelFiltersValues[0]);
    }
  }

  return filters;
}

/**
*   Update parameters from FILTRES, if it exist and the parameter is also added,
*   the parameters is added as filter.
*   Also process parameters already created to set settings if changed.
*/
function updateParamertsFromModel(filters,variables,parameters, parametersList) {

    console.log("parametersMerged :: init parameters : ",parameters);
    console.log("parametersMerged :: all parametersList : ",parametersList);
    console.log("parametersMerged :: filters: ",filters);
    console.log("parametersMerged :: variables: ",variables);

    //first add filters mandatory

    if(filters != null){
      for(var key in filters) {

        if(getParamerter(filters[key], parameters) == null) {
          //dont exist yet add parameter
          var index = getParamerter(filters[key], parametersList);
          if(index != null) {
            var newParameter = parametersList[index];
            newParameter = setSettings(newParameter,PARAMETERS.types[0]);

            if(newParameter != null){
              parameters.push(newParameter);
            }
            else {
              console.error("Parameter need to be created with key => ",filters[key]);
            }
          }
        }
        else {
          var index = getParamerter(filters[key], parameters);
          if(index != null)
            parameters[index] = setSettings(parameters[index],PARAMETERS.types[0]);
        }
      }
    }

    //second if not added as a filter, add variables as optional
    if(variables != null){
      for(var key in variables) {

        //console.log("parametersMerged",variables[key],parameters);
        if(getParamerter(key, parameters) == null) {
          //dont exist yet add parameter
          var index = getParamerter(key, parametersList);
          if(index != null) {
            var newParameter = parametersList[index];
            newParameter = setSettings(newParameter,PARAMETERS.types[1]);
            if(newParameter != null){
              parameters.push(newParameter);
            }
            else {
              console.error("Parameter need to be created with key => ",key);
            }
          }
        }
        else {
          var index = getParamerter(key, parameters);
          if(index != null)
            parameters[index] = setSettings(parameters[index],PARAMETERS.types[1]);
        }
      }
    }

    //check for all parameters if need to add new settings
    for(var index in parameters){
      //if type not set, set to null
      parameters[index] = setSettings(parameters[index],null);
    }

    console.log("parametersMerged :: final result : ",parameters);

    return parameters;
}

function addDefinitionToFields(fields,fieldsList) {

  //process fields list with id
  var fieldsListByKey = {};
  for(var i=0;i<fieldsList.length;i++) {
    fieldsListByKey[fieldsList[i].identifier] = fieldsList[i];
  }

  for(var j=0;j<fields.length;j++){
    fields[j].modelDefinition = fieldsListByKey[fields[j].identifier];
  }

  //add Definition to custom fields
  for(var j=0;j<fields.length;j++){
    //if exist in custom fields
    if(MODELS_CUSTOM_FIELDS[fields[j].type] !== undefined){
      fields[j].modelDefinition = MODELS_CUSTOM_FIELDS[fields[j].type];
    }
  }

  return fields;
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

            var modelParameters = getModelParameters(
              action.payload.model
            );

            //check from model if paramerts correctly set
            var parametersMerged = updateParamertsFromModel(
              modelParameters,
              action.payload.variables,
              action.payload.parameters,
              action.payload.parametersList
            );

            console.log("parametersMerged result :: ",parametersMerged);

            return {
                ...state,
                element : action.payload.element,
                model : action.payload.model,
                fieldsList : action.payload.fieldsList,
                inputs : elementInputs,
                wsModelIdentifier : action.payload.wsModelIdentifier,
                wsModel : action.payload.wsModel,
                wsModelFormat : action.payload.wsModelFormat,
                wsModelExemple : action.payload.wsModelExemple 
                    ? action.payload.wsModelExemple 
                    : action.payload.wsModelIdentifier,

                elementType :  action.payload.elementType,
                parameters: parametersMerged,
                parametersList : action.payload.parametersList,
                modelParameters : modelParameters,
                fields : action.payload.element != null 
                    ? addDefinitionToFields(action.payload.element.fields, action.payload.fieldsList) 
                    : getRequiredFields(action.payload.fieldsList, action.payload.elementType),

                modelVariables : action.payload.variables != null 
                    ? action.payload.variables 
                    : [],

                tabsRoutes : action.payload.tabsRoutes != null 
                    ? action.payload.tabsRoutes 
                    : [],
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

            //console.log("Check merge !");

            //check if new settings are available
            if(newField != null){
              for(var key in fieldsList){
                if(fieldsList[key].identifier == newField.identifier){
                  newField = mergeFieldSettings(
                    newField,
                    fieldsList[key],
                    state.elementType
                  );
                  break;
                }
              }
            }

            //console.log("mergeFieldSettings :: After merge => ",newField);

            return {
              ...state,
              settingsField : newField,
              modalSettingsDisplay : true
            }

        case SETTINGS_CHANGE :

            var field = action.payload;

            //console.log("SETTINGS_CHANGE :: ",settingsField);

            settingsField[field.source][field.name] = field.value;

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
        case ELEMENT_PARAMETERS_UPDATE :
            var found = false;
            var currentParameter = action.payload;
            for(var i=0;i<parameters.length;i++){
              if(parameters[i].id == currentParameter.id){
                parameters[i].settings = currentParameter.settings;
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
