import {
  EDIT_ITEM_CANCEL,
  EDIT_ITEM_SELECT,
  UPDATE_EDIT_ITEM,
  INIT_EDIT_ITEM_MODAL,
  EDIT_ITEM_UPDATE_CATEGORIES,
  EDIT_ITEM_UPDATE_ELEMENS,
  LOAD_PARAMETERS,
  UPDATE_PARAMETERS

} from "../constants/";

import axios from 'axios';

export function initEditItem(payload) {
  return { type: INIT_EDIT_ITEM_MODAL, payload : payload };
}

function pushCategories(categoriesFrom, level, categoriesTo){

   level++;
   for (var i = 0; i< categoriesFrom.length; i++ ){
        categoriesTo.push({
          value: categoriesFrom[i].id,
          name: this.printSpace(level)+categoriesFrom[i].name,
        });
       if(categoriesFrom[i].descendants.length > 0){
          pushCategories(categoriesFrom[i].descendants,level, categoriesTo);
       }
   }
}

export function loadCategories() {

  return (dispatch) => {
    axios.get(ASSETS+'api/categories/tree?accept_lang=es')
      .then(function (response) {
          if(response.status == 200
              && response.data.data !== undefined
              && response.data.data[0].descendants.length > 0)
          {

            ////console.log("original categories => ",response.data.data);

            var categories = [{
              value:'',
              name:'----'
            }];

            pushCategories(response.data.data, 0,categories);

            dispatch({
              type : EDIT_ITEM_UPDATE_CATEGORIES,
              payload : {
                originalCategories : response.data.data,
                categories : categories
              }
            })

          }

      }).catch(function (error) {
         //console.log(error);
       });
    }
}

function pushElements(elementsFrom, fileElementsTo, formElementsTo, tableElementsTo, formElementsV2To){
    for (var i = 0; i< elementsFrom.length; i++ ){

       if(elementsFrom[i].type == 'file'){
         fileElementsTo.push(processElement(elementsFrom[i]));
       }
       else if(elementsFrom[i].type == 'form'){
         formElementsTo.push(processElement(elementsFrom[i]));
       }
       else if(elementsFrom[i].type == 'form-v2'){
        formElementsV2To.push(processElement(elementsFrom[i]));
       }
       else if(elementsFrom[i].type == 'table'){
        tableElementsTo.push(processElement(elementsFrom[i]));
       }
    }
 }

 function processElement(element) {
    var result = {
      value: element.id,
      name : element.name,
      parameters : []
    };

    if(element.attrs !== undefined){
      for(var key in element.attrs){
        var attribute = element.attrs[key];
        if(attribute.name == "parameter"){
          result.parameters.push({
            name : attribute.name,
            id : attribute.value,
            settings : JSON.parse(attribute.settings)
          });
        }
      }
    }

    return result;
 }

export function loadElements() {

  return (dispatch) => {

    axios.get(ASSETS+'architect/elements/list')
      .then(function (response) {
          if(response.status == 200
              && response.data !== undefined
              && response.data.length > 0)
          {

            console.log("original elements => ",response.data);

            var fileElements = [{
              value:'',
              name:'----'
            }];

            var tableElements = [{
              value:'',
              name:'----'
            }];

            var formElements = [{
              value:'',
              name:'----'
            }];

            var formElementsV2 = [{
              value:'',
              name:'----'
            }];

            

            pushElements(response.data, 
              fileElements,
              formElements, 
              tableElements,
              formElementsV2
            );

            dispatch({
              type : EDIT_ITEM_UPDATE_ELEMENS,
              payload : {
                originalElements : response.data,
                fileElements  : fileElements,
                tableElements : tableElements,
                formElements  : formElements,
                formElementsV2 : formElementsV2
              }
            });

          }

      }).catch(function (error) {
         //console.log(error);
       });
    }
}

export function loadParameters() {

  return (dispatch) => {

    axios.get(ASSETS+'api/parameters')
      .then(function (response) {
          if(response.status == 200
              && response.data !== undefined
              && response.data.length > 0)
          {

            //console.log("loadParameters :: loadParameters",response.data);
            var parameters = {};
            for(var i=0;i<response.data.length;i++){
              //console.log("loadParameters :: key => ",i);
              var item = response.data[i];
              parameters[item.id] = item;
            }

            dispatch({
              type : LOAD_PARAMETERS,
              payload : parameters
            });

          }

      }).catch(function (error) {
         //console.log(error);
       });
    }
}

export function editItem(item) {

  return { type: EDIT_ITEM_SELECT, payload : item };
};

export function cancelEditItem() {

  return { type: EDIT_ITEM_CANCEL };
};

function parameterExist(id,pageParameters) {
  for(var i=0;i<pageParameters.length;i++){
    if(pageParameters[i].id == id){
      return i;
    }
  }
  return null;
}

/**
* Get the first default value with the same identifier from
* the array of elements.
*/
function getElementParameterOption(identifier,elements){
  for(var i=0;i<elements.length;i++){
    var element = elements[i];

    if(element.model_exemple !== undefined &&
      element.model_exemple != ''){
        var defaultArray=element.model_exemple.split('?');
        if(defaultArray.length == 2){
          var defaultParams = defaultArray[1].split('&');

          for(var j=0;j<defaultParams.length;j++){
            var defaultValue = defaultParams[j];
            var values = defaultValue.split('=');
            if(values[0] == identifier){
              return values[1];
            }
          }
        }
    }
  }

  return '';
}

function mergeByPriority(settings,newSettings){
  var currentRequired = settings != null && settings.required !== undefined &&
    settings.required != null ?
    settings.required : false;
  var newRequired = newSettings != null && newSettings.required !== undefined &&
    newSettings.required != null ?
    newSettings.required : false;

  //if any is required, then result is required
  if(settings == null)
    settings = {};

  settings.required = newRequired || currentRequired;
  return settings;

  /*
  //NOT NECESSARY BY NOW
  for(var key in PARAMETERS.settings){
    var setting = PARAMETERS.settings[key];
  }
  */
}

function parameterListByIdentifier(parametersList) {
  var result = {};
  for(var id in parametersList) {
    result[parametersList[id].identifier] = parametersList[id];
  }
  return result;
}

export function updateParameters(layout, elements, pageParameters, parametersList) {

  //search for all hierarchy all widgets that has parameters
  console.log("updateParameters :: ",layout, elements);

  var parametersObjects = getParametersFromLayout(layout,[], elements);

  //get parameters ids
  var parameters = [];
  for(var key in parametersObjects){
    parameters.push(parametersObjects[key].id);
  }

  //get parameters objects by id
  var parametersById = {};
  for(var key in parametersObjects){
    //if parameter already added merge by priority
    if(parametersById[parametersObjects[key].id] !== undefined){
      parametersById[parametersObjects[key].id].settings = mergeByPriority(
        parametersById[parametersObjects[key].id].settings,
        parametersObjects[key].settings
      );
    }
    else {
      parametersById[parametersObjects[key].id] = parametersObjects[key];
    }
  }

  //console.log("updateParameters :: getParametersFromLayout : parametersById : => ", parametersById);

  //console.log("updateParameters :: getParametersFromLayout : pageParams : => ", pageParameters, parameters);
  //get all parameters by conditional visibility
  var filterParameters = getFilterParametersFromLayout(
    layout,{},
    parameterListByIdentifier(parametersList)
  );
  console.log("updateParameters :: filter parameters ",filterParameters);

  //add filter parameters into parameters array
  parameters = concatFilterParameters(parameters,filterParameters);
  console.log("updateParameters :: parameters after concat ",parameters);

  //console.log("getParametersFromLayout : init page parameters => ",pageParameters);
  //check existing parameters
  for(var j=pageParameters.length-1;j>=0;j--){

    //if not exist in array
    //console.log("getParametersFromLayout :: indexOf => ", parameters.indexOf(pageParameters[j].id.toString()));
    if(parameters.indexOf(pageParameters[j].id.toString()) == -1){
      //console.log("getParametersFromLayout :: delete => ", j);
      //remove it
      pageParameters.splice(j,1);
    }
  }
  console.log("getParametersFromLayout : after clean => ",pageParameters);

  //add new parameters
  for(var i =0;i<parameters.length;i++){
    var id = parameters[i];

    var parameterIndex = parameterExist(id, pageParameters);

    //check if not already pushed to page
    if(parameterIndex == null){

        console.log("getParametersFromLayout :: dont exist :: id => ", id, parametersById, parametersList);

        //if parameters is a filter
        if(filterParameters[id] !== undefined){
          pageParameters.push({
              id : parseInt(id),
              default : filterParameters[id],
              identifier : parametersList[id].identifier,
              name : parametersList[id].name,
              settings : getFilterSettings(parametersById[parseInt(id)])
          });
        }
        else {
          pageParameters.push({
              id : parseInt(id),
              default : getElementParameterOption(parametersList[id].identifier, elements),
              identifier : parametersList[id].identifier,
              name : parametersList[id].name,
              settings : parametersById[parseInt(id)].settings
          });
        }
    }
    else {
      //if exist update only settings. Necessary to filter getSettings to check if it is a filter
      pageParameters[parameterIndex].settings = getFilterSettings(parametersById[parseInt(id)]);
    }
  }

  console.log("getParametersFromLayout : after adding => ",pageParameters);

  return { type: UPDATE_PARAMETERS,payload : pageParameters };
}

/*
*   Parameters that are filters can be added to any kind of widget, even with no element.
*   Maybe this parameters are not in any of the elements of the widgets. ( imagine a page of buttons for example )
*/
function getFilterSettings(paramterById) {
    //if parametersById is defined
    if(paramterById !== undefined && paramterById != null){
        return paramterById.settings;
    }
    else {
        return {
          //filters are not required
          required : false
        }
    }
}

/**
*    Filter parametres are an object. Need to convert parameters to array
*    and concat with parameters to allow the same process for filters.
*/
function concatFilterParameters(parameters,filterParameters) {

  for(var parameterId in filterParameters){
    if(parameters.indexOf(parameterId) == -1){
      //if don't exist to parameters
      parameters.push(parameterId);
    }
  }

  return parameters;
}

/*
*   Recursive function to search for all parameters.
*/
function getParametersFromLayout(layout,params, elements) {

  for(var i=0;i<layout.length;i++){
    var item = layout[i];
    //console.log("item => ",item);
    if(item.type == "item"){
      //process item, return params

      var widgetParams = getWidgetParams(item.field, elements);
      console.log("functionGetParametersFromLayout :: item, widgetParams => ",item,widgetParams);
      params = Array.from(new Set(params.concat(widgetParams)));
      console.log("functionGetParametersFromLayout :: item, params => ",params);
    }
    else if(item.children != null && item.children !== undefined &&
      item.children.length > 0){
      var childrenParams = getParametersFromLayout(item.children,params, elements);
      //merge with params
      params = Array.from(new Set(params.concat(childrenParams)));
      console.log("functionGetParametersFromLayout :: row/col, params => ",params);
    }
  }

  return params;
}

/**
*   Function that iterate all widgets, and see if widget has a filter.
*   If has a filter add to array like this :
      params = {
        "param id" : "default value",
        "param id" : "default value"
      }
*/
function getFilterParametersFromLayout(layout,params,parametersList) {

  for(var i=0;i<layout.length;i++){
    var item = layout[i];
    //console.log("item => ",item);
    if(item.type == "item"){
      //process item, return params

      var widgetParams = getWidgetFilterParam(item.field,parametersList);

      if(widgetParams != null){
        for(var key in widgetParams){
          if(params[key] === undefined) {
            params[key] = widgetParams[key];
          }
        }
      }

      //console.log("item, widgetParams => ",item,widgetParams);

    }
    else if(item.children != null && item.children !== undefined &&
      item.children.length > 0){
        params = getFilterParametersFromLayout(item.children,params,parametersList);
      }
  }

  return params;
}

function getWidgetParams(field, elements) {

  var params = [];

  
  if(field.settings['formElementsV2Preload'] !== undefined){
    params = getParamsMerged('formElementsV2Preload',field,params,elements);
  }

  if(field.settings['fileElements'] !== undefined){
    params = getParamsMerged('fileElements',field,params,elements);
  }
  else if(field.settings['tableElements'] !== undefined){
    params = getParamsMerged('tableElements',field,params,elements);
  }
  else if(field.settings['formElements'] !== undefined){
    params = getParamsMerged('formElements',field,params,elements);
  }
  else if(field.settings['formElementsV2'] !== undefined){
    params = getParamsMerged('formElementsV2',field,params,elements);
  }
  
  console.log("getWidgetParams => (field,params) ",field, params);

  return params;
}

/**
 * 
 * Get Element parameters and merge with source params. Necessary when two 
 * selectors in same widget.
 * 
 * @param {*} settingsName 
 * @param {*} field 
 * @param {*} params 
 */
function getParamsMerged(settingsName, field, params,elements) {

  //if formElementsV2Preload take elements from formv2
  var newParams = getElementParameters(settingsName, field, elements);

  //merge params with new Params
  for(var key in newParams){
    if(!paramExist(params,newParams[key].id)){
      params.push(newParams[key]);
    }
  }

  return params;
}

function paramExist(params,id){
  for(var key in params){
    if(params[key].id == id)
      return true;
  }
  return false;
}

/**
 * Get parameters from settings name getting the element id stored in settings.
 * 
 * @param {*} field 
 * @param {*} elements 
 */
function getElementParameters(settingsName,field,elements) {
    if(field == null || field.settings === undefined || field.settings[settingsName] === undefined){
      return [];
    }

    var value = field.settings[settingsName];
    //console.log("getWidgetParams :: getElementParameters (field,settingsName,value,elements)",field,settingsName,value,elements);

    for(var i=0;i<elements.length;i++){
      var element = elements[i];
      if(element.id == value){
        var elementProcessed = processElement(element);
        return elementProcessed.parameters;
      }
    }
    return [];
}

/**
*   Return parameters object found on this widget.
*   Return {
*       id : default_value,
*        id : default_value,
*    }
*/
function getWidgetFilterParam(field, parametersList) {

  if(field == null || field.settings === undefined){
    return null;
  }

  if(field.settings['conditionalVisibility'] !== undefined && field.settings['conditionalVisibility'] != null
    && field.settings['conditionalVisibility'] != ''){

    var settings = field.settings['conditionalVisibility'];

    //get all parameters and some default values
    //console.log("getWidgetFilterParam :: settings",settings);

    var parameters = getParametersFromConditions(settings,parametersList);

    console.log("getWidgetFilterParam :: getParametersFromConditions :: ",parameters);
    return parameters;
  }

  return null;
}

/**
Return an object with
parameters {
  "id" : "default value"
}
*/
function getParametersFromConditions(settings,parametersList){
  if(settings.conditions === undefined)
    return null;

  var parameters = {};

  for(var key in settings.conditions){
    var condition = settings.conditions[key];

    //if names and values are defined and values > 0
    if(condition.name !== undefined && condition.name != ""){
      if(condition.values !== undefined && condition.values != ""){
        var values = condition.values.split(",");
        if(values.length > 0){

          //if parameter exist
          if(parametersList[condition.name] !== undefined){
            parameters[parametersList[condition.name].id] = values[0].trim();
          }
        }
      }
    }
  }

  return parameters;
}
