import { gql } from 'apollo-boost';
import { mutation, query } from '../client.js';

//------------------------------------------------------------//
//          SERVICES 
//------------------------------------------------------------//
export let elementModel = {

    getAll() {
        return query(GQL_GET_ALL_MODELS);
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
  {
    elementModels {
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
        }
  } 
`;