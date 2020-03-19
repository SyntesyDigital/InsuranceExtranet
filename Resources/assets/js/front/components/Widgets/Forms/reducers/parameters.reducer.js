import {
  INIT_PARAMETERS_STATE,
  CHECK_PARAMETERS,
  INIT_ITERATION,
  PARAMETERS_LOADED,
  PARAMETERS_NEXT_ITERATION,
  PARAMETER_UPDATE,
  PROCEDURE_SUBMITED
} from '../../constants';

const initialState =  {
  formIterator : 0,
  formParameters : {},
  formParametersLoaded : false,
  checked : false,
  iterating : false,
  iterated : false
}

function parametersReducer(state = initialState, action) {

    //console.log("parametersReducer :: ",action.type, action.payload);

    switch(action.type) {
        case INIT_PARAMETERS_STATE:

            return {
                ...state,
                formParameters : action.payload.formParameters,
            }

        case CHECK_PARAMETERS :
          return {
              ...state,
              formParameters : action.payload,
              checked : true,
              iterating : true
          }

        case INIT_ITERATION :
          return {
              ...state,
              iterating : true,
              iterated : false,

          }
        case PARAMETERS_NEXT_ITERATION :

          return {
              ...state,
              formIterator : state.formIterator + 1,
              formParametersLoaded : false,
              iterating : true,
              iterated : false
          }

        case PARAMETERS_LOADED :
          return {
              ...state,
              formParametersLoaded : true,
              iterating : false,
              iterated : true
          }
        case PROCEDURE_SUBMITED :
          //after procedure submited, the parameters are updated
          return {
              ...state,
              formParameters : action.payload.formParameters
          }
        case PARAMETER_UPDATE :
          return {
              ...state,
              formIterator : state.formIterator + 1,
              formParameters : action.payload
          }


        default:
            return state;
    }
}

export default parametersReducer;
