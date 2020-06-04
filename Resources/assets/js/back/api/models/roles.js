import { gql } from 'apollo-boost';
import { mutation, query } from '../client.js';

//------------------------------------------------------------//
//          ROLE
//------------------------------------------------------------//
export let roles = {

    getAll() {
        return query(GQL_GET_ALL_ROLE);
    },

    get(id) {
        return query(GQL_GET_ROLE, {
            id: id,
        });
    },

    delete(id) {
        return mutation(GQL_DELETE_ROLE, {
            id: id,
        });
    },

    update(id, params) {
        return mutation(GQL_UPDATE_ROLE, {
            id: id,
            ...params
        });
    },

    create(params) {
        return mutation(GQL_CREATE_ROLE, params);
    }
}

//------------------------------------------------------------//
//          GRAPHQL
//------------------------------------------------------------//


/*
 *  GraphQL GET roles
 *  @params : 
 *      id 
 */
export const GQL_GET_ALL_ROLE = gql`
    {
        roles {
            id
            name
            identifier
        }
        permissionGroups {
            id
            name
            identifier
        }
    }
`;

/*
 *  GraphQL GET role
 *  @params : 
 *      id 
 */
export const GQL_GET_ROLE = gql`
  query($id: ID!) {
    role(id:$id) {
        id
        name
        identifier
        icon
        default
        permissions {
            id
            name
            identifier
            group {
                id
                name
            }
        }
    }
    permissions {
        id
        name
        identifier
        group {
            id
            name
            identifier
        }
    }
    permissionGroups {
        id
        name
        identifier
        order
    }
  }
`;

/*
 *  GraphQL CREATE role 
 *  @params : 
 *      name 
 *      identifier 
 *      icon
 *      default
 *      description (optional)
 */
export const GQL_CREATE_ROLE = gql`
    mutation createRole(
            $name: String!
            $identifier: String
            $icon: String
            $default: Boolean
            $description: String
        ) {
            createRole(
                input: {
                    name: $name
                    identifier: $identifier
                    description: $description
                    icon: $icon
                    default: $default
                }
            ) {
                id
                name
                identifier
                icon 
                description 
                default
            }
    } 
`;

/*
 *  GraphQL UPDATE role 
 *  @params : 
 *      id
 *      name
 *      identifier (optional)
 *      description (optional)
 *      default (optional)
 */
export const GQL_UPDATE_ROLE = gql`
    mutation updateRole(
            $id: ID!
            $name: String!
            $icon: String
            $identifier: String
            $description: String
            $default: Boolean
        ) {
            updateRole(
                input: {
                    id: $id
                    name: $name
                    icon: $icon
                    identifier: $identifier
                    description: $description
                    default: $default
                }
            ) {
                id
                name
                identifier
                description
                default
            }
    } 
`;

/*
 *  GraphQL DELETE role 
 *  @params : 
 *      id
 */
export const GQL_DELETE_ROLE = gql`
  mutation deleteRole(
        $id: ID!
    ) {
        deleteRole(
            id: $id
        ) {
            id
            name
        }
  } 
`;