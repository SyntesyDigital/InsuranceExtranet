import {
  INIT_STATE,
  PROCEDURES_LOADED,
  PROCEDURES_INIT_ITERATION,
  UPDATE_JSON_RESULT_FROM_GET,
  SUBMIT_PROCEDURE_ERROR,
  PROCEDURE_SUBMITED,
  PROCEDURE_NEXT_STEP_SAME_SERVICE,
  PROCEDURES_FINISHED,
  PROCEDURE_LIST_NEXT_STEP,
  SKIP_PROCEDURE,
  PROCEDURE_NEXT_STEP,
  UPDATE_JSON_RESULT_GET_ERROR,

} from '../../constants';

const initialState =  {
  procedures : [],
  variables : [], //system variables with all data processed
  loading : true,

  iterating : false,
  currentProcedureIndex : 0,
  currentListIndex : 0,
  jsonResult : {},
  stepsToProcess : false, //variable to know if there is previous steps that need submit
  processing : false,
  complete : false,
  error : false,

  //by default it's false, when it's done change to true
  jsonGetDone : false
}

function formReducer(state = initialState, action) {

    console.log("formReducer :: ",action.type, action.payload);

    switch(action.type) {
        case INIT_STATE:

            return {
                ...state
            }

        case PROCEDURES_LOADED :
            return {
                ...state,
                procedures : action.payload.procedures,
                variables : action.payload.variables,
                loading : false
            }
        case PROCEDURES_INIT_ITERATION:
            return {
                ...state,
                iterating : true,
                currentProcedureIndex : 0,
                jsonResult : {},
                processing : true,
                complete : false,
                error : false,
                jsonGetDone : false
            }
        case UPDATE_JSON_RESULT_FROM_GET:
            return {
                ...state,
                iterating : true,
                jsonResult : action.payload,
                processing : true,
                complete : false,
                error : false,
                jsonGetDone : true
            }
        case PROCEDURE_SUBMITED :
            return {
              ...state,
              currentProcedureIndex : state.currentProcedureIndex + 1 ,
              currentListIndex : 0,
              jsonResult : {},
              processing : true,
              stepsToProcess : false,
              complete : false,
              error : false,
              jsonGetDone : false
            }
        case UPDATE_JSON_RESULT_GET_ERROR :
        case SUBMIT_PROCEDURE_ERROR :
            return {
              ...state,
              iterating : false,
              currentProcedureIndex : 0,
              currentListIndex : 0,
              stepsToProcess : false,
              jsonResult : {},
              processing : false,
              complete : false,
              error : true,
              jsonGetDone : false
            };
        case PROCEDURE_NEXT_STEP :
            return {
              ...state,
              currentProcedureIndex : state.currentProcedureIndex + 1 ,
              currentListIndex : 0,
              jsonResult : {},
              processing : true,
              stepsToProcess : false,
              complete : false,
              error : false,
              jsonGetDone : false
            };
        case PROCEDURE_NEXT_STEP_SAME_SERVICE :
            return {
                ...state,
                currentProcedureIndex : state.currentProcedureIndex + 1 ,
                currentListIndex : 0,
                jsonResult : action.payload,
                stepsToProcess : true,
                processing : true,
                complete : false,
                error : false,
                jsonGetDone : false
            };
        case PROCEDURES_FINISHED :
            return {
                ...state,
                iterating : false,
                currentProcedureIndex : 0,
                currentListIndex : 0,
                stepsToProcess : false,
                jsonResult : {},
                processing : false,
                complete : true,
                error : false,
                jsonGetDone : false
            }
        case PROCEDURE_LIST_NEXT_STEP :
            return {
                ...state,
                currentListIndex : state.currentListIndex + 1,
                jsonResult : action.payload.jsonResult,
                processing : true,
                complete : false,
                error : false,
                jsonGetDone : false
            }
        case SKIP_PROCEDURE :
            return {
                ...state,
                currentProcedureIndex : state.currentProcedureIndex + 1 ,
                currentListIndex : 0,
                jsonResult : action.payload.jsonResult,
                stepsToProcess : false,
                processing : true,
                complete : false,
                error : false,
                jsonGetDone : false
            }
        default:
            return state;
    }
}

export default formReducer;
