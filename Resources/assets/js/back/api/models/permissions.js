import { gql } from 'apollo-boost';
import { mutation, query } from '../client.js';

//------------------------------------------------------------//
//          PERMISSION
//------------------------------------------------------------//
export let permissions = {

    getAll() {
        return query(GQL_GET_ALL_PERMISSIONS);
    },

    get(id) {
        return query(GQL_GET_PERMISSION, {
            id: id,
        });
    },

    create(params) {
        return mutation(GQL_CREATE_PERMISSION, params);
    },

    update(id, params) {
        return mutation(GQL_UPDATE_PERMISSION, {
            id: id,
            ...params
        });
    },

    delete(id) {
        return mutation(GQL_DELETE_PERMISSION, {
            id: id,
        });
    }

}

//------------------------------------------------------------//
//          GRAPHQL
//------------------------------------------------------------//

/*
 *  GraphQL GET permissions
 */
export const GQL_GET_ALL_PERMISSIONS = gql`
  {
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
 *  GraphQL GET permission
 *  @params : 
 *      id 
 */
export const GQL_GET_PERMISSION = gql`
  query($id: ID!) {
    permission(id:$id){
        id
        name
        identifier
        group {
            id
            name
            identifier
        }
        roles {
            id
            name
            identifier
        }
    }
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
 *  GraphQL CREATE permission 
 *  @params : 
 *      name 
 *      identifier 
 *      description (optional)
 *      group_id
 */
export const GQL_CREATE_PERMISSION = gql`
    mutation createPermission(
            $name: String!
            $identifier: String!
            $description: String
            $group_id: ID!
        ) {
            createPermission(
                input: {
                    name: $name
                    identifier: $identifier
                    description: $description
                    group_id: $group_id
                }
            ) {
                id
                name
                identifier
                group {
                    id
                    name 
                    order
                    identifier
                }
            }
    } 
`;

/*
 *  GraphQL UPDATE permission 
 *  @params : 
 *      id
 *      name 
 *      identifier
 *      description (optional)
 *      group_id
 */
export const GQL_UPDATE_PERMISSION = gql`
    mutation updatePermission(
            $id: ID!
            $name: String!
            $identifier: String!
            $description: String
            $group_id: ID!
        ) {
            updatePermission(
                input: {
                    id: $id
                    name: $name
                    identifier: $identifier
                    description: $description
                    group_id: $group_id
                }
            ) {
                id
                name
                identifier
                roles {
                    id
                    name
                }
                group {
                    id
                    name 
                    order
                    identifier
                }
            }
    } 
`;

/*
 *  GraphQL DELETE permission 
 *  @params : 
 *      id
 */
export const GQL_DELETE_PERMISSION = gql`
  mutation deletePermission(
        $id: ID!
    ) {
        deletePermission(
            id: $id
        ) {
            id
            name
            identifier
            group {
                id
            }
        }
  } 
`;