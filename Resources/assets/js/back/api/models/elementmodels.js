import gql from 'graphql-tag';
import { mutation, query } from '../client.js';

//------------------------------------------------------------//
//          SERVICES 
//------------------------------------------------------------//
export let elementModel = {

    getAll(type) {
        return query(GQL_GET_ALL_MODELS, {
            type: type
        });
    },

    get(id) {
        return query(GQL_GET_MODEL, {
            id: id,
        });
    },

    delete(id) {
        return mutation(GQL_DELETE_MODEL, {
            id: id,
        });
    },

    update(id, params) {
        return mutation(GQL_UPDATE_MODEL, {
            id: id,
            ...params
        });
    },

    create(params) {
        return mutation(GQL_CREATE_MODEL, params);
    }
}

//------------------------------------------------------------//
//          GRAPHQL
//------------------------------------------------------------//

/*
 *  GraphQL GET ElementModel 
 *  @params : 
 *      id 
 */
export const GQL_GET_MODEL = gql`
  query($id: ID!) {
    elementModel(id:$id) {
        id
        identifier
        name
        description
        icon
        type
        ws
        ws_format
        filtres
        example
        def1
        def2
        validation_ws
        procedures {
            id
            name
            configurable
            required
            repeatable
            repeatable_json
            repeatable_jsonpath
            prefixed
            duplicate
            order
            preload
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
            fields {
                id
                name
                identifier
                type
                format
                default_value
                boby
                jsonpath
                example
                configurable
                visible
                required
            }
        }
    }
  }
`;

export const GQL_GET_ALL_MODELS = gql`
    query($type: String) {
        elementModels(type: $type) {
            id
            identifier
            name
            description
            icon
            type
            ws
            ws_format
            filtres
            example
            def1
            def2
            created_at
        }
    }
`;

export const GQL_CREATE_MODEL = gql`
  mutation createElementModel(
        $name: String!
        $identifier: String!
        $description: String
        $icon: String
        $type: String
        $ws: String
        $ws_format: String
        $filtres: String
        $example: String
        $def1: String
        $def2: String
        $validation_ws: String
    ) {
        createElementModel(
        input: {
            name: $name
            identifier: $identifier
            description: $description
            icon: $icon
            type: $type
            ws: $ws
            ws_format: $ws_format
            filtres: $filtres
            example: $example
            def1: $def1
            def2: $def2
            validation_ws: $validation_ws
        }
    ) {
        id
        name
        identifier
        description
        icon
        type
        ws
        ws_format
        filtres
        example
        def1
        def2
        validation_ws
    }
  } 
`;

export const GQL_UPDATE_MODEL = gql`
  mutation updateElementModel(
        $id: ID!
        $name: String!
        $identifier: String!
        $description: String
        $icon: String
        $type: String
        $ws: String
        $ws_format: String
        $filtres: String
        $example: String
        $def1: String
        $def2: String
        $validation_ws: String
    ) {
        updateElementModel(
        input: {
            id: $id
            name: $name
            identifier: $identifier
            description: $description
            icon: $icon
            type: $type
            ws: $ws
            ws_format: $ws_format
            filtres: $filtres
            example: $example
            def1: $def1
            def2: $def2
            validation_ws: $validation_ws
        }
    ) {
        id
        name
        identifier
        description
        icon
        type
        ws
        ws_format
        filtres
        example
        def1
        def2
        validation_ws
    }
  } 
`;

/*
 *  GraphQL DELETE Service 
 *  @params : 
 *      id
 */
export const GQL_DELETE_MODEL = gql`
  mutation deleteElementModel(
        $id: ID!
    ) {
        deleteElementModel(
            id: $id
        ) {
            id
            identifier
            name
            description
            icon
            type
            ws
            ws_format
            filtres
            example
            def1
            def2
            validation_ws
        }
  } 
`;