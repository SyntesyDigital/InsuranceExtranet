import gql from 'graphql-tag';
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

    getBody(id, sessionId) {
        
        return query(GQL_GET_SERVICE_BODY, {
            id: id,
            session_id : sessionId
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
            is_old_url_ws
            created_at
            updated_at
            body
            example
            has_session_id
            ws
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
        is_old_url_ws
        body
        example
        has_session_id
        ws
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
        $is_old_url_ws: Boolean
        $body: String
        $example: String
        $has_session_id: Boolean
        $ws: String
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
            is_old_url_ws: $is_old_url_ws
            body: $body
            example: $example
            has_session_id: $has_session_id
            ws: $ws
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
        body
        example
        has_session_id
        ws
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
        $is_old_url_ws: Boolean
        $body: String
        $example: String
        $has_session_id: Boolean
        $ws: String
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
                is_old_url_ws: $is_old_url_ws
                body: $body
                example: $example
                has_session_id: $has_session_id
                ws: $ws
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
            is_old_url_ws
            body
            example
            has_session_id
            ws
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
            is_old_url_ws
            body
            example
            has_session_id
            ws
        }
  } 
`;



export const GQL_GET_SERVICE_BODY = gql`
    query(
            $id: ID!
            $session_id: String!
        ) {
        serviceBody(
            id:$id
            session_id:$session_id
        ) {
            body
        }
    }
`;
