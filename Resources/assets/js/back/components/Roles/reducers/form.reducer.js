import {
    INIT_STATE, UPDATE_FIELD,
    OPEN_MODAL_CREATE_GROUP,
    OPEN_MODAL_EDIT_GROUP,

    REMOVE_GROUP,
    UPDATE_GROUP,
    CANCEL_EDIT_GROUP,
    CREATE_GROUP,

    UPDATE_ROLE,

} from '../constants';

const initialState = {

    loaded : false,
    saved: false,

    displayPermision: false,
    displayGroup: false,

    currentGroup: null,
    selectedPermission: null,

    roles: [],

    //role
    role: {
        id: null,
        name: '',
        identifier: '',
        icon: '',
        default: false,
        groups: []
    }
}

function getGroupIndex(role,group) {
    for(var key in role.groups) {
        if(role.groups[key].id == group.id) {
            return key;
        }
    }
    return null;
}

function formReducer(state = initialState, action) {

    console.log("formReducer :: ", action.type, action.payload);

    let role = state.role;
    let index = -1;

    switch (action.type) {
        case INIT_STATE:
            return {
                ...state,
                role : action.payload,
                loaded : true
            }
        case UPDATE_FIELD:
            role[action.payload.name] = action.payload.value;

            return {
                ...state,
                role: role
            }

        case UPDATE_ROLE : 

            role = action.payload

            return {
                ...state,
                role : role
            }
            
        case OPEN_MODAL_CREATE_GROUP:

            return {
                ...state,
                displayGroup: true,
                currentGroup : null
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

        case CREATE_GROUP:

            role = state.role;
            role.groups.push(action.payload);

            return {
                ...state,
                role : role,
                displayGroup: false,
                currentGroup : null
            };

        case REMOVE_GROUP:

            role = state.role;
            index = getGroupIndex(role,action.payload);
            role.groups.splice(index,1);

            return {
                ...state,
                role : role,
                displayGroup: false,
                currentGroup : null
            }

        case UPDATE_GROUP:

            role = state.role;
            index = getGroupIndex(role,action.payload);
            role.groups[index].name = action.payload.name;
            role.groups[index].identifier = action.payload.identifier;
            role.groups[index].order = action.payload.order;

            return {
                ...state,
                role : role,
                displayGroup: false,
                currentGroup : null
            };
        
        default:
            return state;
    }
}

export default formReducer;
