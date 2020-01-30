import { gql } from 'apollo-boost';

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



export const GQL_CREATE_ROLE = gql`
  mutation CreateRole(
      $name: String!,
      $identifier: String!,
      $icon: String!,
      $default : Boolean!,
      $permissions: [ID!]
    ) {
      createRole(
        input: {
            name: $name
            identifier: $identifier
            icon: $icon
            default : $default
            permissions: {
              sync: $permissions
            }
        }
    ) {
        id
        name
        identifier
        icon
        default
        permissions {
            id
            name 
            identifier
        }
    }
  } 
`;

export const GQL_UPDATE_ROLE = gql`
  mutation UpdateRole(
      $id : ID!,
      $name: String!,
      $identifier: String!,
      $icon: String!,
      $default : Boolean!,
      $permissions: [ID!]
    ) {
      updateRole(
        input: {
            id : $id
            name: $name
            identifier: $identifier
            icon: $icon
            default : $default
            permissions: {
              sync: $permissions
            }
        }
    ) {
        id
        name
        identifier
        icon
        default
        permissions {
            id
            name 
        }
    }
  } 
`;