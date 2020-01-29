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

    roles: [],
    groups: [],
    
    //user
    user: {
        name: 'Name',
        email: 'user.email@gmail.com'
    },
    groups: [
        {
            id: 1,
            identifier: 'group_1',
            name: 'Group 1',
            permissions: [
                {
                    id: 1,
                    identifier: 'permission_1',
                    name: 'Permission 1',
                    value: true
                },
                {
                    id: 2,
                    identifier: 'permission_2',
                    name: 'Permission 2',
                    value: true
                }
            ]
        },
        {
            id: 2,
            identifier: 'group_2',
            name: 'Group 1',
            permissions: [
                {
                    id: 3,
                    identifier: 'permission_3',
                    name: 'Permission 3',
                    value: true
                },
                {
                    id: 4,
                    identifier: 'permission_4',
                    name: 'Permission 4',
                    value: false
                }
            ]
        }
    ],
    roles: [{
        id: 1,
        identifier: 'admin',
        name: 'Admin',
        value: true
    },
    {
        id: 2,
        identifier: 'client',
        name: 'Client',
        value: false
    }
    ]
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
            let user = state.user;
            user[action.payload.name] = action.payload.value;

            return {
                ...state,
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
