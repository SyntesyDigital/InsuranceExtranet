import { gql } from 'apollo-boost';
import { mutation, query } from '../client.js';

//------------------------------------------------------------//
//          MODEL PROCEDURES 
//------------------------------------------------------------//
export let groups = {
    getGroupsPermissions() {
        return query(GQL_GET_GROUPS_PERMISSIONS);
    },

    update(id, params) {
        return mutation(GQL_UPDATE_GROUP, {
            id: id,
            ...params
        });
    },

    create(params) {
        return mutation(GQL_CREATE_GROUP, params);
    },

    delete(id) {
        return mutation(GQL_REMOVE_GROUP, {
            id: id,
        });
    },
}

//------------------------------------------------------------//
//          GRAPHQL
//------------------------------------------------------------//
export const GQL_GET_GROUPS_PERMISSIONS = gql`
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

export const GQL_CREATE_GROUP = gql`
  mutation CreateGroup(
      $name: String!,
      $identifier: String!
    ) {
    createPermissionGroup(
        input: {
            name: $name
            identifier: $identifier
        }
    ) {
        id
        name
        identifier
        order
    }
  } 
`;

export const GQL_UPDATE_GROUP = gql`
  mutation UpdatePermissionGroup(
      $id: ID!,
      $name: String!,
      $identifier: String!
    ) {
      updatePermissionGroup(
        input: {
            id : $id
            name: $name
            identifier: $identifier
        }
    ) {
        id
        name
        identifier
        order
    }
  } 
`;

export const GQL_REMOVE_GROUP = gql`
  mutation DeletePermissionGroup(
    $id: ID!
  ){
    deletePermissionGroup(
        id: $id
    ) {
        id
        name
        identifier
    }
  }
  `;