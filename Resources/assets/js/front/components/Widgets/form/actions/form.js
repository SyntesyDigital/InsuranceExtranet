import {
  INIT_STATE,
  PROCEDURES_LOADED,
  PROCEDURES_ERROR,
  PROCEDURES_INIT_ITERATION,
  UPDATE_JSON_RESULT_FROM_GET,
  PROCEDURE_SUBMITED,
  SUBMIT_PROCEDURE_ERROR,
  PROCEDURE_NEXT_STEP,
  PROCEDURE_NEXT_STEP_SAME_SERVICE,
  PROCEDURE_LIST_NEXT_STEP,
  SKIP_PROCEDURE,
  PROCEDURES_FINISHED
} from "../constants/";

import {
  processUrlParameters,
  processStandardProcedure,
  procedureIsArray,
  processResponseParameters,
  processListProcedure
} from "../functions";

export function initState(payload) {
  return { type: INIT_STATE, payload }
};

export function initProceduresIteration() {
  return { type: PROCEDURES_INIT_ITERATION }
};

export function loadProcedures(modelIdentifier) {

  var self = this;

  return (dispatch) => {
    //this.state.elementObject.modelIdentifier;
    axios.get('/architect/elements/procedures/'+modelIdentifier)
      .then(function(response) {
        if(response.status == 200 && response.data.data !== undefined){

          dispatch({ type: PROCEDURES_LOADED, payload : {
            procedures : response.data.data.procedures,
            variables : response.data.data.variables,
          }});

        }
        else {
          dispatch({ type: PROCEDURES_ERROR });
        }
      })
      .catch(function(error){
        console.error(error);
        dispatch({ type: PROCEDURES_ERROR });
      });
    }

};

/**
*   Whe the SERVICE  is a PUT, is necessary to do a GET to get currentn values.
*/
export function getJsonResultBeforePut(procedure,formParameters) {

  return (dispatch) => {

    ////console.log("getJsonResultBeforePut :: ",procedure);

    if(procedure.SERVICE === undefined){
      console.error("procedure not defined => ",procedure);
      return dispatch({type : UPDATE_JSON_RESULT_GET_ERROR});
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

            return dispatch({
              type : UPDATE_JSON_RESULT_FROM_GET,
              payload : response.data.result
            });
        }
        else {
            toastr.error(response.data.message);
            return dispatch({type : UPDATE_JSON_RESULT_GET_ERROR});
            //callback();
        }
      })
      .catch(function(error){
        console.error("error => ",error.message);
        return dispatch({type : UPDATE_JSON_RESULT_GET_ERROR});
        //callback();
      });

  }
}

/**
*   Function to process current iteration
*/
export function processProcedure(procedures,currentProcedureIndex, values,
    currentListIndex, stepsToProcess,jsonResult,formParameters,jsonGetDone) {

    //const {procedures,currentProcedureIndex, values, currentListIndex, stepsToProcess} = this.state;
    //let {jsonResult} = this.state;

    return (dispatch) => {

      console.log("processProcedure :: start iteration (jsonGetDone)",jsonGetDone);
      //console.log("processProcedure :: start iteration (currentProcedureIndex,procedures.length)",currentProcedureIndex,procedures.length);

      //if all procedures done finish
      if(currentProcedureIndex == procedures.length){
        return dispatch(finish());
      }

      const procedure = procedures[currentProcedureIndex];

      //if the methode is PUT set with a get
      if(!stepsToProcess && procedure.SERVICE !== undefined &&
        procedure.SERVICE.METHODE == "PUT" && !jsonGetDone){
        //set the jsonResult with a get
        return dispatch(getJsonResultBeforePut(procedure,formParameters));
      }


      const isRequired = procedure.OBL == "Y" ? true : false;
      const isConfigurable = procedure.CONF == "Y" ? true : false;
      const isRepetable = procedure.REP == "Y" ? true : false;

      console.log("processProcedure :: (currentProcedureIndex,procedure) ",currentProcedureIndex,procedure);
      var self = this;

      if(!isRepetable){
        //normal procedure
        //console.log("!isRepetable :: Process standard iteration => ",currentProcedureIndex, jsonResult);

        jsonResult = processStandardProcedure(
          currentProcedureIndex,procedure,
          jsonResult,values,formParameters
        );

        console.log("processProcedure :: !isRepetable :: jsonResult processed => ",currentProcedureIndex, JSON.stringify(jsonResult));

        //always pass to next procedure

        //if has values
            return dispatch(submitStandardProcedure(currentProcedureIndex,procedure,
              jsonResult,procedures,formParameters));

            //this.submitStandardProcedure(currentProcedureIndex,procedure,jsonResult);

        //else
            //if it is required
              //TODO error
            //else
              //TODO pass next procedure
      }
      else if(isConfigurable && isRepetable){
        //internal array, check for values list

        //console.log("Process list iteration => ",currentProcedureIndex, currentListIndex, values[procedure.OBJID],jsonResult);

        //check for value with id => procedure->OBJID

        if(values[procedure.OBJID] !== undefined && values[procedure.OBJID].length > 0){
          //there is values

          //check what is the current value index

          //process every values
          jsonResult = processListProcedure (
            currentProcedureIndex,
            procedure,
            values[procedure.OBJID][currentListIndex],
            jsonResult,
            formParameters
          );

          console.log("processProcedure :: isList :: jsonResult processed => ",currentProcedureIndex, JSON.stringify(jsonResult));

          //go to next value of this procedure of submit as standard procedure
          /*
          this.submitListProcedure(
            currentProcedureIndex,
            procedure,jsonResult,currentListIndex,
            values[procedure.OBJID]
          );
          */

          return dispatch(submitListProcedure(
            currentProcedureIndex,procedure,jsonResult,
            currentListIndex, values[procedure.OBJID],
            formParameters,procedures
          ));

        }
        else {
          //there is no data
          console.log("processProcedure :: No data :: jsonResult processed => ",currentProcedureIndex, JSON.stringify(jsonResult));

          if(isRequired){
            //this is needed
            console.error("No list values and this procedure is required "+procedure.OBJID);
            return dispatch({type : SUBMIT_PROCEDURE_ERROR});
          }
          else {
            //if there is data to process, submit process
            if(stepsToProcess){
              //this.submitStandardProcedure(currentProcedureIndex,procedure,jsonResult);
              return dispatch(submitStandardProcedure(currentProcedureIndex,procedure,
                jsonResult,procedures,formParameters));
            }
            else {
              //skip procedure
              //this.skipProcedure(currentProcedureIndex,procedure,jsonResult);
              return dispatch(skipProcedure(currentProcedureIndex,procedure,jsonResult));
            }
          }
        }

      }

    }

    //after procedure is done we obtain a jsonResult, with this jsonResult decide what to Do.
}

/**
*   Submit standard procedure.
*/
export function submitStandardProcedure(currentProcedureIndex,procedure,
  jsonResult,procedures,formParameters) {

  //const {procedures} = this.state;
  //console.log("submitStandardProcedure parameters =>",currentProcedureIndex,procedure,
  //  jsonResult,procedures,formParameters);

  //var self = this;

  return (dispatch) => {

      var nextProcedure = null;
      if( currentProcedureIndex + 1 < procedures.length){
        //is the last one
        nextProcedure = procedures[currentProcedureIndex+1];
      }
      ////console.log("nextProcedure => ",nextProcedure);

      console.log("submitStandardProcedure :: (currentProcedureIndex,nextProcedure,procedure) ",
        currentProcedureIndex,nextProcedure,procedure );

      //if no next procedure
      if(nextProcedure == null) {
        //process this procedure

        return dispatch(submitProcedure(procedure, jsonResult, formParameters));


      }
      else if(nextProcedure.SERVICE.ID != procedure.SERVICE.ID ){
        //the service is different, process the procedure

        return dispatch(submitProcedure(procedure, jsonResult, formParameters));

      }
      else {
        //we have next procedure and is the same service, continue same json
        dispatch({type : PROCEDURE_NEXT_STEP_SAME_SERVICE,payload:jsonResult});
      }
  }

}

/**
* Process the procedure, with the service and the json
* Returns info for next Step
*/
export function submitProcedure(procedure, jsonResult, formParameters) {

  return (dispatch) => {

    //console.log("submitProcedure :: ",procedure, jsonResult);

    if(procedure.SERVICE === undefined){
      console.error("procedure not defined => ",procedure);
      return dispatch({type: SUBMIT_PROCEDURE_ERROR });
    }

    //process URL parameters
    var url = processUrlParameters(
      procedure.SERVICE.URL,
      formParameters
    );

    var params = {
      method : procedure.SERVICE.METHODE,
      url : url,
      data : jsonResult,
      is_array : procedureIsArray(procedure)
    };

    axios.post('/architect/elements/form/process-service',params)
      .then(function(response) {
        ////console.log("response => ",response);
        if(response.status == 200){

            //update form parameters
            dispatch({type:PROCEDURE_SUBMITED,payload: {
              formParameters : processResponseParameters(
                  response.data.result,
                  procedure.SERVICE,
                  formParameters
              )
            }});
        }
        else {
            toastr.error(response.data.message);
            //errorCallback();
            return dispatch({type: SUBMIT_PROCEDURE_ERROR });
        }
      })
      .catch(function(error){
        console.error("error => ",error.message);
        if(error.response.data.message !== undefined){
          toastr.error(error.response.data.message);
        }
        else {
          toastr.error(error.message);
        }
        //errorCallback();
        return dispatch({type: SUBMIT_PROCEDURE_ERROR });
      });

  }
}

export function finish() {
  return {type : PROCEDURES_FINISHED};
}

/**
*   Submit procedure that is a list. It has its own iteartor.
*/
export function submitListProcedure(currentProcedureIndex,procedure,jsonResult,
  currentListIndex, listValues, formParameters,procedures) {

  return (dispatch) => {

    //if we there is more values process next
    if(currentListIndex + 1 < listValues.length){
      //go to next procedure
      dispatch({
        type : PROCEDURE_LIST_NEXT_STEP,
        payload : {
          jsonResult : jsonResult
        }
      });
    }
    else {
      //process this as standard procedure
      return dispatch(submitStandardProcedure(currentProcedureIndex,procedure,
        jsonResult,procedures,formParameters));
    }
  }
}

/**
*   This procedure no needs procesment
*/
export function skipProcedure(currentProcedureIndex, procedures, jsonResult) {

  return (dispatch) => {
    var nextProcedure = null;
    if( currentProcedureIndex + 1 < procedures.length){
      //is the last one
      nextProcedure = procedures[currentProcedureIndex+1];
    }

    if(nextProcedure != null){

      dispatch({type : SKIP_PROCEDURE ,payload : {
        jsonResult : jsonResult,
      }});
    }
    else {
      //we are at then end, complete
      dispatch(finish());
    }
  }
}
