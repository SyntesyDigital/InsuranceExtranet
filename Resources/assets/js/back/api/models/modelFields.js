import gql from 'graphql-tag';
import { mutation, query } from '../client.js';

//------------------------------------------------------------//
//          MODEL MODEL FIELD 
//------------------------------------------------------------//
export let fields = {
    delete(id) {
        return mutation(GQL_DELETE_MODEL_FIELD, {
            id: id,
        });
    },

    update(id, params) {
        return mutation(GQL_UPDATE_MODEL_FIELD, {
            id: id,
            ...params
        });
    },

    create(params) {
        return mutation(GQL_CREATE_MODEL_FIELD, params);
    }
}

//------------------------------------------------------------//
//          GRAPHQL
//------------------------------------------------------------//


export const GQL_CREATE_MODEL_FIELD = gql`
    mutation createModelField(
            $procedure_id: ID!
            $name: String!
            $identifier: String!
            $type: String!
            $format: String !
            $default_value: String 
            $boby: String
            $jsonpath: String 
            $example: String 
            $configurable: String 
            $visible: String
            $required: String
        ) {
            createModelField(
                input: {
                    procedure_id: $procedure_id
                    name: $name
                    identifier: $identifier
                    type: $type
                    format: $format
                    default_value: $default_value
                    boby: $boby
                    jsonpath: $jsonpath
                    example: $example
                    configurable: $configurable
                    visible: $visible
                    required: $required
                }
            ) {
                id
                name
                identifier
                type
                format
            }
    } 
`;

export const GQL_UPDATE_MODEL_FIELD = gql`
    mutation updateModelField(
            $id: ID!
            $procedure_id: ID!
            $name: String!
            $identifier: String!
            $type: String!
            $format: String !
            $default_value: String 
            $boby: String
            $jsonpath: String 
            $example: String 
            $configurable: String 
            $visible: String
            $required: String
        ) {
            updateModelField(
                input: {
                    id : $id
                    procedure_id: $procedure_id
                    name: $name
                    identifier: $identifier
                    type: $type
                    format: $format
                    default_value: $default_value
                    boby: $boby
                    jsonpath: $jsonpath
                    example: $example
                    configurable: $configurable
                    visible: $visible
                    required: $required
                }
            ) {
                id
                name
                identifier
                type
                format
                configurable
                visible
            }
    } 
`;

export const GQL_DELETE_MODEL_FIELD = gql`
  mutation deleteModelField(
        $id: ID!
    ) {
        deleteModelField(
            id: $id
        ) {
            id
        }
  } 
`;