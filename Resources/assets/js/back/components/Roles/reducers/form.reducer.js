import {
    INIT_STATE, UPDATE_FIELD,
    OPEN_MODAL_CREATE_GROUP,
    OPEN_MODAL_EDIT_GROUP,
    SAVE_GROUP,
    REMOVE_GROUP,
    UPDATE_GROUP,
    CANCEL_EDIT_GROUP,
    OPEN_MODAL_EDIT_PERMISSION,
    CANCEL_EDIT_PERMISSION

} from '../constants';

const initialState = {

    saved: true,

    displayPermision: false,
    displayGroup: false,

    currentGroup: null,
    selectedPermission: null,

    roles: [],

    //role
    role: {
        id: 1,
        name: 'Admin',
        identifier: 'admin',
        icon: 'fa fa-pencil',
        default: true,
        groups: [
            {
                id: 1,
                identifier: 'group_1',
                name: 'Group 1',
                default: true,
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
                name: 'Group 2',
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
            },
            {
                id: 3,
                identifier: 'group_3',
                name: 'Group 3',
                permissions: []
            }
        ]
    }
}

function formReducer(state = initialState, action) {

    console.log("formReducer :: ", action.type, action.payload);

    switch (action.type) {
        case INIT_STATE:

            console.log("INIT_STATE => ", action.data);

            return {
                ...state
            }
        case UPDATE_FIELD:
            let role = state.role;
            role[action.payload.name] = action.payload.value;

            return {
                ...state,
                role: role
            }

        case OPEN_MODAL_CREATE_GROUP:

            return {
                ...state,
                displayGroup: true,
            }

        case OPEN_MODAL_EDIT_GROUP:

            return {
                ...state,
                displayGroup: true,
                currentGroup: action.payload
            }

        case CANCEL_EDIT_GROUP:

            return {
                ...state,
                displayGroup: false,
                currentGroup: null
            }

        case SAVE_GROUP:

            return {
                ...state,
            }

        case REMOVE_GROUP:

            return {
                ...state,
            }

        case UPDATE_GROUP:

            return {
                ...state,
            }

        case OPEN_MODAL_EDIT_PERMISSION:
            return {
                ...state,
                displayPermision: true,
                selectedPermission: action.payload
            }

        case CANCEL_EDIT_PERMISSION:
            return {
                ...state,
                displayPermision: false,
                selectedPermission: null
            }
        default:
            return state;
    }
}

export default formReducer;