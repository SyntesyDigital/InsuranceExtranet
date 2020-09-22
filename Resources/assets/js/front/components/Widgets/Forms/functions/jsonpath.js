

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