import { gql } from 'apollo-boost';
import { mutation, query } from '../client.js';

//------------------------------------------------------------//
//          SERVICES 
//------------------------------------------------------------//
export let users = {
    importUser(idPer) {
        return mutation(GQL_IMPORT_USER, {
            idPer: idPer
        });
    }
}

//------------------------------------------------------------//
//          GRAPHQL
//------------------------------------------------------------//


/*
 *  GraphQL IMPORT users 
 *  @params : 
 *       id
 *       id_per
 *       firstname
 *       lastname
 *       phone
 */
export const GQL_IMPORT_USER = gql`
    mutation importUser($idPer: Int!){
        importUser(id_per: $idPer) {
            id
            id_per
            firstname
            lastname
            phone
        }
    }
`;
