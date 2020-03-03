import { gql } from 'apollo-boost';
import { mutation, query } from '../client.js';

//------------------------------------------------------------//
//          MODEL PROCEDURES 
//------------------------------------------------------------//
export let procedures = {
    get(id) {
        return query(GQL_GET_MODEL_PROCEDURE, {
            id: id,
        });
    },

    delete(id) {
        return mutation(GQL_DELETE_MODEL_PROCEDURE, {
            id: id,
        });
    },

    update(id, params) {
        return mutation(GQL_UPDATE_MODEL_PROCEDURE, {
            id: id,
            ...params
        });
    },

    create(params) {
        console.log("api.procedure.create (params)",params);
        return mutation(GQL_CREATE_MODEL_PROCEDURE, params);
    }
}

//------------------------------------------------------------//
//          GRAPHQL
//------------------------------------------------------------//

/*
 *  GraphQL GET Model procedure 
 *  @params : 
 *      id 
 */
export const GQL_GET_MODEL_PROCEDURE = gql`
  query($id: ID!) {
    modelProcedure(id:$id) {
        name
        configurable
        required
        repeatable
        repeatable_json
        order
        service {
            id
        }
        elementModel
        fields
    }
  }
`;

/*
 *  GraphQL CREATE Service 
 *  @params : 
 *      name 
 *      identifier 
 *      url
 *      boby
 *      response (optional)
 *      comment (optional)
 */
export const GQL_CREATE_MODEL_PROCEDURE = gql`
    mutation createModelProcedure(
            $name: String!
            $configurable: String
            $required: String
            $repeatable: String
            $repeatable_json: String
            $repeatable_jsonpath: String
            $service_id: ID! 
            $model_id: ID! 
            $order: Int
        ) {
            createModelProcedure(
                input: {
                    name: $name
                    configurable: $configurable
                    required: $required
                    repeatable: $repeatable
                    repeatable_json: $repeatable_json
                    repeatable_jsonpath: $repeatable_jsonpath
                    service_id: $service_id
                    model_id: $model_id
                    order: $order
                }
            ) {
                id
                name
                configurable
                required
                repeatable
                repeatable_json
                order
            }
    } 
`;

/*
 *  GraphQL UPDATE Service 
 *  @params : 
 *      id
 *      name (optional)
 *      identifier (optional)
 *      url (optional)
 *      boby (optional)
 *      response (optional)
 *      comment (optional)
 */
export const GQL_UPDATE_MODEL_PROCEDURE = gql`
    mutation updateModelProcedure(
            $id: ID!
            $name: String!
            $configurable: String
            $required: String
            $repeatable: String
            $repeatable_json: String
            $repeatable_jsonpath: String
            $service_id: ID
            $model_id: ID
            $order: Int
        ) {
            updateModelProcedure(
                input: {
                    id: $id
                    name: $name
                    configurable: $configurable
                    required: $required
                    repeatable: $repeatable
                    repeatable_json: $repeatable_json
                    repeatable_jsonpath: $repeatable_jsonpath
                    service_id: $service_id
                    model_id: $model_id
                    order: $order
                }
            ) {
                id
                name
                configurable
                required
                repeatable
                repeatable_json
                order
            }
    } 
`;

/*
 *  GraphQL DELETE Service 
 *  @params : 
 *      id
 */
export const GQL_DELETE_MODEL_PROCEDURE = gql`
  mutation deleteModelProcedure(
        $id: ID!
    ) {
        deleteModelProcedure(
            id: $id
        ) {
            id
        }
  } 
`;