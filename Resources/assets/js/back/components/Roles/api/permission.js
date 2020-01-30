import { gql } from 'apollo-boost';

export const GQL_LOAD_PERMISSION = gql`
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
    }
  }
`;

export const GQL_LOAD_ROLES_GROUPS = gql`
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

export const GQL_CREATE_PERMISSION = gql`
  mutation CreatePermission(
      $name: String!,
      $identifier: String!
      $group_id:ID!
    ) {
    createPermission(
        input: {
            name: $name
            identifier: $identifier
            group_id: $group_id
        }
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

export const GQL_UPDATE_PERMISSION = gql`
  mutation UpdatePermission(
      $id: ID!,
      $name: String!,
      $identifier: String!
      $group_id:ID!
    ) {
    updatePermission(
        input: {
            id : $id
            name: $name
            identifier: $identifier
            group_id: $group_id
        }
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