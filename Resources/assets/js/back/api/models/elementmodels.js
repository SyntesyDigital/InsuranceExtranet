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
        procedures {
            id
            name
            configurable
            required
            repeatable
            repeatable_json
            repeatable_jsonpath
            service {
                id
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
    ) {
        createElementModel(
        input: {
            name: $name
            identifier: $identifier
            description: $description
            icon: $icon
            type: $type
        }
    ) {
        id
        name
        identifier
        description
        icon
        type
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
    ) {
        updateElementModel(
        input: {
            id: $id
            name: $name
            identifier: $identifier
            description: $description
            icon: $icon
            type: $type
        }
    ) {
        id
        name
        identifier
        description
        icon
        type
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
        }
  } 
`;