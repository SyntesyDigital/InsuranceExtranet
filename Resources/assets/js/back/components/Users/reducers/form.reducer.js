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
        lastname: ''
    },
    groups: [],
    roles: []
}

function formReducer(state = initialState, action) {

    console.log("formReducer :: Users", action.type, action.payload);

    switch (action.type) {

        case INIT_STATE:
            return {
                ...state,
            }

        case LOAD_USER:
            action.payload.groups.map(group => {
                group.permissions.map(permission => {
                    permission.value = action.payload.user.permissions.filter(item => item.id == permission.id).length > 0 
                            ? true 
                            : false;
                });
            })

            return {
                ...state,
                user: action.payload.user,
                roles: action.payload.roles,
                groups: action.payload.groups
            }

        case UPDATE_USER_ROLE:
            let roles = state.roles;

            // if (roles[action.payload.index].value !== undefined) {
            //     roles[action.payload.index].value = action.payload.value;
            // }

            return {
                ...state,
                roles: roles
            }

        case UPDATE_USER_PERMISSION:
            state.groups.map(group => {
                group.permissions.map(permission => {
                    permission.value = action.payload.filter(item => item.id == permission.id).length > 0 
                        ? true 
                        : false;
                });
            });

            return {
                ...state,
            }

        default:
            return state;
    }
}

export default formReducer;
