import { gql } from 'apollo-boost';
import { mutation, query } from '../client.js';

//------------------------------------------------------------//
//          SERVICES 
//------------------------------------------------------------//
export let services = {

    getAll() {
        return query(GQL_GET_ALL_SERVICE);
    },

    get(id) {
        return query(GQL_GET_SERVICE, {
            id: id,
        });
    },

    delete(id) {
        return mutation(GQL_DELETE_SERVICE, {
            id: id,
        });
    },

    update(id, params) {
        return mutation(GQL_UPDATE_SERVICE, {
            id: id,
            ...params
        });
    },

    create(params) {
        return mutation(GQL_CREATE_SERVICE, params);
    }
}

//------------------------------------------------------------//
//          GRAPHQL
//------------------------------------------------------------//

export const GQL_GET_ALL_SERVICE = gql`
    {
        services {
            id
            name
            http_method
            url
            boby
            json
            identifier
            response
            comment
            response_json
            created_at
            updated_at
        }
    }
`;

/*
 *  GraphQL GET Service 
 *  @params : 
 *      id 
 */
export const GQL_GET_SERVICE = gql`
  query($id: ID!) {
    service(id:$id) {
        name
        id
        http_method
        url
        boby
        json
        identifier
        response
        comment
        response_json
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
export const GQL_CREATE_SERVICE = gql`
  mutation createService(
        $name: String
        $identifier: String
        $http_method: String
        $url: String
        $boby: String
        $json: String 
        $response: String 
        $comment: String
        $response_json: String
    ) {
        createService(
        input: {
            name: $name
            identifier: $identifier
            http_method: $http_method
            url: $url
            boby: $boby
            json: $json
            response: $response
            comment: $comment
            response_json: $response_json
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
        response_json
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
export const GQL_UPDATE_SERVICE = gql`
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
        $response_json: String
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
                response_json: $response_json
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
            response_json
        }
  } 
`;

/*
 *  GraphQL DELETE Service 
 *  @params : 
 *      id
 */
export const GQL_DELETE_SERVICE = gql`
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
            response_json
        }
  } 
`;