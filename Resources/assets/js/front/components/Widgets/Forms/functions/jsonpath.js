

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