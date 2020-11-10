import gql from 'graphql-tag';
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
        preload
        prefixed
        duplicate
        service {
            id
            name
            http_method
            url
            boby
            json
            identifier
            response
            comment
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
            $prefixed: Boolean
            $duplicate: Boolean
            $preload: String
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
                    prefixed: $prefixed
                    duplicate: $duplicate
                    repeatable_jsonpath: $repeatable_jsonpath
                    service_id: $service_id
                    model_id: $model_id
                    order: $order
                    preload: $preload
                }
            ) {
                id
                name
                configurable
                required
                repeatable
                repeatable_json
                order
                preload
                duplicate
                prefixed
                service {
                    id
                    name
                    http_method
                    url
                    boby
                    json
                    identifier
                    response
                    comment
                }
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
            $prefixed: Boolean
            $duplicate: Boolean
            $service_id: ID
            $model_id: ID
            $order: Int
            $preload: String
            # $fields: UpdateModelProcedureFieldsHasMany
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
                    prefixed: $prefixed
                    duplicate: $duplicate
                    service_id: $service_id
                    model_id: $model_id
                    order: $order
                    preload: $preload,
                    # fields: $fields
                }
            ) {
                id
                name
                configurable
                required
                repeatable
                repeatable_json
                order
                preload
                duplicate
                prefixed
                service {
                    id
                    name
                    http_method
                    url
                    boby
                    json
                    identifier
                    response
                    comment
                }
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