import { gql } from 'apollo-boost';
import { mutation, query } from '../client.js';

//------------------------------------------------------------//
//          SERVICES 
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
        service
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
        $name: String
        $configurable: String
        $required: String
        $repeatable: String
        $repeatable_json: String
        $service: String 
        $elementModel: String 
        $fields: String
    ) {
        createModelProcedure(
            input: {
                name: $name
                identifier: $identifier
                http_method: $http_method
                url: $url
                boby: $boby
                json: $json
                response: $response
                comment: $comment
            }
        ) {
            name
            configurable
            required
            repeatable
            repeatable_json
            service
            elementModel
            fields
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
  mutation updateService(
        $id: ID!
        $name: String
        $identifier: String
        $http_method: String
        $url: String
        $boby: String
        $json: String
        $response: String
        $comment: String
    ) {
        updateService(
            input: {
                id: $id
                name: $name
                identifier: $identifier
                http_method: $http_method
                url: $url
                boby: $boby
                json: $json
                response: $response
                comment: $comment
            }
        ) {
            id
            name
            identifier
            http_method
            url
            boby
            json
            response
            comment
        }
  } 
`;

/*
 *  GraphQL DELETE Service 
 *  @params : 
 *      id
 */
export const GQL_DELETE_MODEL_PROCEDURE = gql`
  mutation deleteService(
        $id: ID!
    ) {
        deleteService(
            id: $id
        ) {
            id
            name
            identifier
            http_method
            url
            boby
            json
            response
            comment
        }
  } 
`;