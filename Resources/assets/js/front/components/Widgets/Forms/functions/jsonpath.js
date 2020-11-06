

let jp = require('jsonpath');

/**
 * Check if jsonpath is definied into de JSON.
 * If it dones't exist.
 * @param {*} json 
 * @param {*} jsonpath 
 */
export function checkIfExistJsonPath(json,jsonpath){
      
    var query = jp.query(json, jsonpath);

    return query.length > 0;
}


/**
*   Iterate recursively to make the json result.
*/
export function createJsonKey(paramArray,index,jsonResult) {

    //console.log("setupJsonResult :: setup => ",paramArray,jsonResult,index,name,arrayPosition);
  
    var name = paramArray[index];
  
    /*
    console.log("createJsonKey :: iteration : (paramArray,index,jsonResult,name,paramArray.length)",
        paramArray,
        index,
        JSON.stringify(jsonResult),
        name,
        paramArray.length
    );
    */
  
    if(jsonResult === undefined || jsonResult == null || $.isEmptyObject(jsonResult)){
        jsonResult = {};
    }
  
    //define the json with null value
    if(jsonResult[name] === undefined)
        jsonResult[name] = null;
  
    if(paramArray.length-1 > index ){
        //continue with the next step
        jsonResult[name] = createJsonKey(
            paramArray,
            index+1,
            jsonResult[name]
        );
    }
  
    return jsonResult;
  }
  
  /**
   * Function add a key that doesn't exist to JSON.
   * 
   * @param {*} json 
   * @param {*} jsonpath 
   */
  export function addKeyToJson(json,jsonpath){
  
    if(jsonpath.indexOf('[') != -1){
        console.error("addKeyToJSON : not possible to add key to array (jsonpath)",jsonpath);
        return json;
    }
  
    //remove identifier from jsonpath
    var jsonPathArray = jsonpath.split('.');
  
    json = createJsonKey(jsonPathArray,1,json);
  
    //console.log("createJsonKey :: final result (json)",json,'\n\n');
  
    return json;
  }


  /**
   * Look for the array and empty if exists
   * @param {*} json 
   * @param {*} jsonpath 
   */
  export function cleanArrayFromJsonpath(json,jsonpath) {
    
    //console.log("cleanResultJSONFromProcedure :: cleanArrayFromJsonpath :: json,jsonpath",JSON.parse(JSON.stringify(json)),jsonpath);
    jp.value(json,jsonpath,[]);
    //console.log("cleanResultJSONFromProcedure :: cleanArrayFromJsonpath ::  jsonResult",JSON.parse(JSON.stringify(json)));

    return json;
  }


/**
 * Depending on procedure type, the jsonresult preloaded, need to cleaned. 
 * In this case, if procedure is repeatable, then the list need to be empty, 
 * if not the array items are duplicated.
 * 
 * @param {*} procedure 
 * @param {*} jsonResult 
 */
export function cleanResultJSONFromProcedure(procedure,jsonResult) {

    if(procedure.PRELOAD == "Y" && procedure.REP == "Y"){
      //if is preloaded and is repetable ( an array with subjson ) empty 
      jsonResult = cleanArrayFromJsonpath(jsonResult,procedure.JSONP);

      //console.log("cleanResultJSONFromProcedure :: jsonResult",jsonResult);
    }
  
    return jsonResult;
  }
  