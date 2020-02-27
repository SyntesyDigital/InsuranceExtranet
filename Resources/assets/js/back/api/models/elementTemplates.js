import { gql } from 'apollo-boost';
import { mutation, query } from '../client.js';

//------------------------------------------------------------//
//          SERVICES 
//------------------------------------------------------------//
export let elementTemplates = {

    getAll() {
        return query(GQL_GET_ALL_ELEMENT_TEMPLATE);
    },

    get(id) {
        return query(GQL_GET_ELEMENT_TEMPLATE, {
            id: id,
        });
    },

    delete(id) {
        return mutation(GQL_DELETE_ELEMENT_TEMPLATE, {
            id: id,
        });
    },

    update(id, params) {
        return mutation(GQL_UPDATE_ELEMENT_TEMPLATE, {
            id: id,
            ...params
        });
    },

    create(params) {
        return mutation(GQL_CREATE_ELEMENT_TEMPLATE, params);
    }
}

//------------------------------------------------------------//
//          GRAPHQL
//------------------------------------------------------------//

export const GQL_GET_ELEMENT_TEMPLATE = gql`
  query($id: ID!) {
    elementTemplate(id:$id) {
        id
        name
        layout
        fields {
            name 
            value
            relation
            parent_id
            language {
                name 
                iso 
                default
            }
        }
    }
  }
`;

export const GQL_GET_ALL_ELEMENT_TEMPLATE = gql`
  {
    elementTemplates {
        id
        name
        layout
        fields {
            name 
            value
            relation
            parent_id
            language {
                name 
                iso 
                default
            }
        }
    }
  }
`;

export const GQL_CREATE_ELEMENT_TEMPLATE = gql`
  mutation createElementTemplate(
        $name: String!
        $layout: String!
        $element_id: ID!
    ) {
        createElementModel(
        input: {
            name: $name
            layout: $layout
            element_id: $element_id
        }
    ) {
        id
        name
        layout
    }
  } 
`;

export const GQL_UPDATE_ELEMENT_TEMPLATE = gql`
  mutation updateElementTemplate(
        $id: ID!
        $name: String!
        $layout: String!
        $element_id: ID!
    ) {
        createElementModel(
        input: {
            id: $id
            name: $name
            layout: $layout
            element_id: $element_id
        }
    ) {
        id
        name
        layout
    }
  } 
`;

export const GQL_DELETE_ELEMENT_TEMPLATE = gql`
  mutation deleteElementTemplate(
        $id: ID!
    ) {
        deleteElementTemplate(
            id: $id
        ) {
            id
            name
            layout
        }
  } 
`;