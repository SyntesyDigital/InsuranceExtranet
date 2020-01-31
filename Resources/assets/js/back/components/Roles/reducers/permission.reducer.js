import {
    OPEN_MODAL_EDIT_PERMISSION,
    CANCEL_EDIT_PERMISSION,
    OPEN_MODAL_CRATE_PERMISSION,
    UPDATE_MODAL_ROLES_GROUPS,
    OPEN_MODAL_PERMISSION_FROM_GROUP,
    UPDATE_MODAL_PERMISSION,
    CREATE_PERMISSION,
    REMOVE_PERMISSION,
    UPDATE_PERMISSION

} from '../constants';

const initialState = {
    display: false,

    selectedGroup : null,
    selectedPermission : null,

    roles: [],
    groups: []
}

function permissionReducer(state = initialState, action) {

    switch (action.type) {
        case OPEN_MODAL_CRATE_PERMISSION:
            return {
                ...state,
                display : true,
                selectedGroup : null,
                selectedPermission : null,
                roles: [],
                groups: []
            };
        case UPDATE_MODAL_ROLES_GROUPS :
            return {
                ...state,
                roles: action.payload.roles,
                groups: action.payload.permissionGroups
            };
        case OPEN_MODAL_EDIT_PERMISSION:
            return {
                ...state,
                display: true,
                selectedPermission: action.payload
            }
        case UPDATE_MODAL_PERMISSION : 

            //add the permission roles from the graphql 
            let selectedPermission = state.selectedPermission;
            selectedPermission.roles = action.payload.permission.roles;

            return {
                ...state,
                selectedPermission: selectedPermission,
                roles: action.payload.roles,
                groups: action.payload.permissionGroups
            }

        case CREATE_PERMISSION:
        case UPDATE_PERMISSION:
        case REMOVE_PERMISSION:
        case CANCEL_EDIT_PERMISSION:
            return {
                ...state,
                display: false,
                selectedGroup : null,
                selectedPermission : null,
                roles: [],
                groups: []
            }
        case OPEN_MODAL_PERMISSION_FROM_GROUP: 
            return {
                ...state,
                display: true,
                selectedGroup : action.payload,
                selectedPermission : null,
                roles: [],
                groups: []
            }
        default:
            return state;
    }
}

export default permissionReducer;
