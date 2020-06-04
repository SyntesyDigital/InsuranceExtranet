import { gql } from 'apollo-boost';
import { mutation, query } from '../client.js';

//------------------------------------------------------------//
//          SERVICES 
//------------------------------------------------------------//
export let users = {

    get(id) {
        return query(GQL_GET_USER, {
            id: id,
        });
    },

    update(id, params) {
        return mutation(GQL_UPDATE_USER, {
            id: id,
            ...params
        });
    },
    
    importUser(idPer) {
        return mutation(GQL_IMPORT_USER, {
            idPer: idPer
        });
    },

    updatePermission(userId, permissionId, enabled) {
        return mutation(GQL_USER_UPDATE_PERMISSION, {
            user_id: userId,
            permission_id: permissionId,
            enabled: enabled
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


/*
 *  GraphQL IMPORT users 
 *  @params : 
 *       id
 *       id_per
 *       firstname
 *       lastname
 *       phone
 */
export const GQL_UPDATE_USER = gql`
    mutation updateUser(
        $id: ID!
        $id_per: String
        $firstname: String
        $lastname: String
        $email: String
        $phone: String
        $roles: RolesInput
    ){
        updateUser(
            input: {
                id: $id
                id_per: $id_per
                firstname: $firstname
                lastname: $lastname
                email: $email
                phone: $phone
                roles: $roles
            }
        ) {
            id
            id_per
            firstname
            lastname
            phone
            roles {
                id
                name 
            }
        }
    }
`;

/*
 *  GraphQL update user permission
 *  @params : 
 *       user_id
 *       permission_id
 *       enabled (boolean)
 */
export const GQL_USER_UPDATE_PERMISSION = gql`
    mutation updateUserPermission(
        $user_id: ID!, 
        $permission_id: ID!, 
        $enabled: Int!
    ){
        updateUserPermission(
            user_id : $user_id
            permission_id : $permission_id
            enabled : $enabled
        ) {
            id
            identifier
            name 
            group {
                id 
                identifier 
                name
            }
        }
    }
`;


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