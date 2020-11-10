import {
  PRELOAD_DONE,
  PRELOAD_FORM_ERROR
} from "../constants/";

import {
  processUrlParameters,
} from "../../functions";

let jp = require('jsonpath');

export function preloadForm(procedure,formParameters) {

  return (dispatch) => {

    ////console.log("getJsonResultBeforePut :: ",procedure);

    if(procedure.SERVICE === undefined){
      return dispatch({type : PRELOAD_FORM_ERROR});
    }

    //process URL parameters
    var url = processUrlParameters(procedure.SERVICE.URL,formParameters);

    var params = {
      method : "GET",
      url : url,
      data : "",
      is_array : false,
      is_old_url: procedure.SERVICE.IS_OLD_URL !== undefined 
            ? procedure.SERVICE.IS_OLD_URL 
            : null,
      domain : procedure.SERVICE.WS
    };

    self = this;

    axios.post(ASSETS+'architect/elements/form/process-service',params)
      .then(function(response) {
        if(response.status == 200){
            return dispatch(setResultValues(procedure, response.data.result));
        }
        else {
            toastr.error(response.data.message);
            return dispatch({type : PRELOAD_FORM_ERROR});
        }
      })
      .catch(function(error){
        return dispatch({
            type : PRELOAD_FORM_ERROR
        });
      });

  }
}

function getJSONValue(json,jsonpath) {

    try {
      var value = jp.value(json, jsonpath);
      console.log("getJSONValue :: (json, jsonpath,value)",json, jsonpath,value);
      return value;
    }
    catch(error) {
        console.error(error);
    }
    return null;
}

/**
 * Depending on jsonpath root, it returns the json part to be processed. Sometimes
 * is necessary to process only a part, and sometimes the json is a list.
 * @param {*} json 
 * @param {*} procedureJsonPath 
 */
export function getJsonSource(json,procedureJsonPath) {

    //if it has . at the end, remove it.
    if(procedureJsonPath.slice(-1) == "."){
      procedureJsonPath = procedureJsonPath.slice(0,-1);
    }

    return jp.value(json,procedureJsonPath);
}

export function getProcedureObjectValues(procedure,json,values) {

  //jsonpath is always root
  var jsonpath = "$.";

  //iterate all objects of json
  for(var key in procedure.OBJECTS) {
    var object = procedure.OBJECTS[key];
    var currentJsonPath = jsonpath
      +(object.OBJ_JSONP != null ? object.OBJ_JSONP : '')
      +object.CHAMP;

    var value = getJSONValue(json,currentJsonPath);
    console.log("setResultValues :: setProcedureObjectValues :: ",object,currentJsonPath,value);

    if(value != null) {
      values[object.CHAMP] = value;
    }
  }

  return values;
}

export function getProcedureListValues(procedure,json,values) {

  if( !(json instanceof Array)){
    console.error("preload.js : getProcedureListValues :: json is not an array (json)",json);
    return values;
  }

  //json is an array
  for( var index in json){

    //iterate for every position of json
    var currentJsonItem = json[index];

    var jsonpath = "$["+index+"]";

    for(var key in procedure.OBJECTS) {
      var object = procedure.OBJECTS[key];
      var currentJsonPath = jsonpath
        +(object.OBJ_JSONP != null ? object.OBJ_JSONP : '')
        +object.CHAMP;
  
      var value = getJSONValue(json,currentJsonPath);
      console.log("setResultValues :: getProcedureListValues :: (object,currentJsonPath,value) ",object,currentJsonPath,value);
  
      if(value != null) {
        //set array for the first time
        if(values[procedure.ID] === undefined )
          values[procedure.ID] = [];
        //set object for current index
        if(values[procedure.ID][index] === undefined)
          values[procedure.ID][index] = {};
        
        values[procedure.ID][index][object.CHAMP] = value;
      }
    }
  }

  return values;
}

export function setResultValues(procedure,json) {
  
  console.log("setResultValues :: (procedure,json)",procedure,json);
  var values = {};

  var jsonSource = getJsonSource(json,procedure.JSONP);
  console.log("setResultValues :: getJsonSource (jsonSource)",jsonSource);

  //if it's of type list
  if(procedure.REP == "Y"){
    values = getProcedureListValues(procedure,jsonSource,values);
  }
  else {
    //if it's normal object
    values = getProcedureObjectValues(procedure,jsonSource,values);
  }

  console.log("setResultValues :: (values)",values);
  
  
  return {
    type : PRELOAD_DONE,
    payload : values
  };

}

export function skipPreload() {
  return {
    type : PRELOAD_DONE,
    payload : {}
  };
}