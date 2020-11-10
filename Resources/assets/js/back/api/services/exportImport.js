import gql from 'graphql-tag';
import { mutation, query } from '../client.js';

//------------------------------------------------------------//
//          SERVICES 
//------------------------------------------------------------//
export let exportImport = {
    export(id, classPath) {
        return query(GQL_EXPORT, {
            id: id,
            class: classPath
        });
    },

    import(params) {
        return mutation(GQL_IMPORT, params);
    }
}

//------------------------------------------------------------//
//          GRAPHQL
//------------------------------------------------------------//
export const GQL_EXPORT = gql`
  query($id: ID!, $class: String!) {
    export(id: $id, class: $class) {
        payload
    }
  }
`;


export const GQL_IMPORT = gql`
  mutation import(
        $payload: String!
    ) {
        import(payload: $payload) {
            payload
        }
  } 
`;
