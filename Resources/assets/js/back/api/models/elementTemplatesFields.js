import gql from 'graphql-tag';
import { mutation, query } from '../client.js';

//------------------------------------------------------------//
//          SERVICES 
//------------------------------------------------------------//
export let elementTemplatesFields = {

    getAll() {
        return query(GQL_GET_ALL_ELEMENT_TEMPLATE_FIELDS);
    },

    get(id) {
        return query(GQL_GET_ELEMENT_TEMPLATE_FIELDS, {
            id: id,
        });
    },

    delete(id) {
        return mutation(GQL_DELETE_ELEMENT_TEMPLATE_FIELDS, {
            id: id,
        });
    },

    update(id, params) {
        return mutation(GQL_UPDATE_ELEMENT_TEMPLATE_FIELDS, {
            id: id,
            ...params
        });
    },

    create(params) {
        return mutation(GQL_CREATE_ELEMENT_TEMPLATE_FIELDS, params);
    }
}

//------------------------------------------------------------//
//          GRAPHQL
//------------------------------------------------------------//
export const GQL_GET_ELEMENT_TEMPLATE_FIELDS = gql`
  query($id: ID!) {
    elementTemplateField(id:$id) {
        template_id
        language_id
        parent_id
        name
        value
        relation
        language {
            name 
            iso default
        }
    }
  }
`;

export const GQL_GET_ALL_ELEMENT_TEMPLATE_FIELDS = gql`
  {
    elementTemplateFields {
        id
        template_id
        language_id
        parent_id
        name
        value
        relation
        language {
            name 
            iso default
        }
    }
  }
`;

export const GQL_CREATE_ELEMENT_TEMPLATE_FIELDS = gql`
  mutation createElementTemplateField(
        $template_id: ID!
        $language_id: ID!
        $parent_id: ID
        $name: String!
        $value: String
        $relation: String
    ) {
        createElementTemplateField(
            input: {
                template_id: $template_id
                language_id: $language_id
                parent_id: $parent_id
                name: $name
                value: $value
                relation: $relation
            }
        ) {
            id
            template_id
            language_id
            parent_id
            name
            value
            relation
            language {
                name 
                iso default
            }
        }
  } 
`;

export const GQL_UPDATE_ELEMENT_TEMPLATE_FIELDS = gql`
  mutation updateElementTemplateField(
        $id: ID!
        $template_id: ID
        $language_id: ID
        $parent_id: ID
        $name: String
        $value: String
        $relation: String
    ) {
        updateElementTemplateField(
            input: {
                id: $id
                template_id: $template_id
                language_id: $language_id
                parent_id: $parent_id
                name: $name
                value: $value
                relation: $relation
            }
        ) {
            id
            template_id
            language_id
            parent_id
            name
            value
            relation
            language {
                name 
                iso default
            }
        }
  } 
`;

export const GQL_DELETE_ELEMENT_TEMPLATE_FIELDS = gql`
  mutation deleteElementTemplateField(
        $id: ID!
    ) {
        deleteElementTemplateField(
            id: $id
        ) {
            id
            template_id
            language_id
            parent_id
            name
            value
            relation
            language {
                name 
                iso default
            }
        }
  } 
`;