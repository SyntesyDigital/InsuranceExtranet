import { gql } from 'apollo-boost';

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
export const GQL_DELETE_SERVICE = gql`
  mutation deleteService(
        $id: ID!
    ) {
        deleteService(
            input: {
                id: $id
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

