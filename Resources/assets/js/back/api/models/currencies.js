import { gql } from 'apollo-boost';
import { mutation, query } from '../client.js';

//------------------------------------------------------------//
//          CURRENCIES 
//------------------------------------------------------------//
export let currencies = {

    getAll() {
        return query(GQL_GET_ALL_CURRENCY);
    },

    get(id) {
        return query(GQL_GET_CURRENCY, {
            id: id,
        });
    },

    delete(id) {
        return mutation(GQL_DELETE_CURRENCY, {
            id: id,
        });
    },

    update(id, params) {
        return mutation(GQL_UPDATE_CURRENCY, {
            id: id,
            ...params
        });
    },

    create(params) {
        return mutation(GQL_CREATE_CURRENCY, params);
    }
}

//------------------------------------------------------------//
//          GRAPHQL
//------------------------------------------------------------//

export const GQL_GET_ALL_CURRENCY = gql`
    {
        currencies {
            id
            code
            label
            symbole
            symbole_position
            decimals
            decimals_separator
            thousands_separator
            default
            created_at
            updated_at
        }
    }
`;

/*
 *  GraphQL GET Currency 
 *  @params : 
 *      id 
 */
export const GQL_GET_CURRENCY = gql`
  query($id: ID!) {
    currency(id:$id) {
        id
        code
        label
        symbole
        symbole_position
        decimals
        decimals_separator
        thousands_separator
        default
    }
  }
`;

/*
 *  GraphQL CREATE Currency 
 *  @params : 
 *      name 
 *      identifier 
 *      url
 *      boby
 *      response (optional)
 *      comment (optional)
 */
export const GQL_CREATE_CURRENCY = gql`
  mutation createCurrency(
        $code: String
        $label: String
        $symbole: String
        $symbole_position: String
        $decimals: Int
        $decimals_separator: String
        $thousands_separator: String
        $default: Boolean
    ) {
        createCurrency(
        input: {
            code : $code
            label: $label
            symbole: $symbole
            symbole_position: $symbole_position
            decimals: $decimals
            decimals_separator: $decimals_separator
            thousands_separator: $thousands_separator
            default: $default
        }
    ) {
        id
        code
        label
        symbole
        symbole_position
        decimals
        decimals_separator
        thousands_separator
        default
    }
  } 
`;

/*
 *  GraphQL UPDATE Currency 
 *  @params : 
 *      id
 *      name (optional)
 *      identifier (optional)
 *      url (optional)
 *      boby (optional)
 *      response (optional)
 *      comment (optional)
 */
export const GQL_UPDATE_CURRENCY = gql`
  mutation updateCurrency(
        $id: ID!
        $code: String
        $label: String
        $symbole: String
        $symbole_position: String
        $decimals: Int
        $decimals_separator: String
        $thousands_separator: String
        $default: Boolean
    ) {
        updateCurrency(
            input: {
                id: $id
                code : $code
                label: $label
                symbole: $symbole
                symbole_position: $symbole_position
                decimals: $decimals
                decimals_separator: $decimals_separator
                thousands_separator: $thousands_separator
                default: $default
            }
        ) {
            id
            code
            label
            symbole
            symbole_position
            decimals
            decimals_separator
            thousands_separator
            default
        }
  } 
`;

/*
 *  GraphQL DELETE Currency 
 *  @params : 
 *      id
 */
export const GQL_DELETE_CURRENCY = gql`
  mutation deleteCurrency(
        $id: ID!
    ) {
        deleteCurrency(
            id: $id
        ) {
            id
            code
            label
            symbole
            symbole_position
            decimals
            decimals_separator
            thousands_separator
            default
        }
  } 
`;