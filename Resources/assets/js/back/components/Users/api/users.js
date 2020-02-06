import { gql } from 'apollo-boost';

export const GQL_GET_USER = gql`
  query($id: ID!) {
    user(id:$id) {
        id
        firstname
        lastname 
        roles {
            id 
            name
            permissions {
                id
                name 
                identifier
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
    roles {
        id,
        name
    }
  }
`;