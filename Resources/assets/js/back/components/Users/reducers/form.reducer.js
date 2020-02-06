import {
    INIT_STATE,
    LOAD_USER,
    UPDATE_USER_ROLE,
    UPDATE_USER_PERMISSION

} from '../constants';

const initialState = {

    saved: true,

    currentGroup: null,
    selectedPermission: null,

    //user
    user: {
        lastname : ''
    },
    groups: [],
    roles: []
}



function formReducer(state = initialState, action) {

    console.log("formReducer :: Users", action.type, action.payload);

    switch (action.type) {

        case INIT_STATE:

            console.log("INIT_STATE => ", action.data);

            return {
                ...state,
            }

        case LOAD_USER:
            return {
                ...state,
                user : action.payload.user,
                roles : action.payload.roles,
                groups : action.payload.groups
            }

        case UPDATE_USER_ROLE:
            let roles = state.roles;
            roles[action.payload.index].value = action.payload.value;

            return {
                ...state,
                roles: roles
            }
            
        case UPDATE_USER_PERMISSION:
            let role = state.role;
            role[action.payload.name] = action.payload.value;

            return {
                ...state,
                role: role
            }

        default:
            return state;
    }
}

export default formReducer;
