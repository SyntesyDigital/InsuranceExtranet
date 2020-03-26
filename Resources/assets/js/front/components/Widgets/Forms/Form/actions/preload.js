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
      console.error("procedure not defined => ",procedure);
      return dispatch({type : PRELOAD_FORM_ERROR});
    }

    //process URL parameters
    var url = processUrlParameters(procedure.SERVICE.URL,formParameters);

    var params = {
      method : "GET",
      url : url,
      data : "",
      is_array : false
    };

    self = this;

    axios.post('/architect/elements/form/process-service',params)
      .then(function(response) {
        ////console.log("response => ",response);
        ////console.log("getJsonResultBeforePut :: response ",response);
        if(response.status == 200){
            ////console.log("response => ",response);

            return dispatch(setResultValues(
              procedure,
              response.data.result
            ));
        }
        else {
            toastr.error(response.data.message);
            return dispatch({type : PRELOAD_FORM_ERROR});
            //callback();
        }
      })
      .catch(function(error){
        console.error("error => ",error.message);
        return dispatch({type : PRELOAD_FORM_ERROR});
        //callback();
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

export function setResultValues(procedure,json) {
  
  console.log("setResultValues :: (procedure,json)",procedure,json);
  var values = {};

  var jsonpath = procedure.JSONP;

  //iterate all objects of json
  for(var key in procedure.OBJECTS) {
    var object = procedure.OBJECTS[key];
    var currentJsonPath = jsonpath
      +(object.OBJ_JSONP != null ? object.OBJ_JSONP : '')
      +object.CHAMP;

    var value = getJSONValue(json,currentJsonPath);
    if(value != null) {
      values[object.CHAMP] = value;
    }
  }

  //set values from identifier and jsonpath

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