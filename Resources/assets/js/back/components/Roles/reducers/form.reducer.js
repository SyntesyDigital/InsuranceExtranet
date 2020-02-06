import {
    INIT_STATE, UPDATE_FIELD,
    OPEN_MODAL_CREATE_GROUP,
    OPEN_MODAL_EDIT_GROUP,
    UPDATE_GROUPS,

    REMOVE_GROUP,
    UPDATE_GROUP,
    CANCEL_EDIT_GROUP,
    CREATE_GROUP,

    UPDATE_ROLE,
    CREATE_PERMISSION,
    UPDATE_PERMISSION,
    REMOVE_PERMISSION


} from '../constants';

const initialState = {

    loaded : false,
    saved: false,

    displayPermision: false,
    displayGroup: false,

    currentGroup: null,
    selectedPermission: null,

    //flag to reload the groups
    groupsReload : false,

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

function getPermissionIndex(group,permisisonId) {
    for(var key in group.permissions) {
      if(group.permissions[key].id == permisisonId) {
          return key;
      }
    }
    return null;
  }

function formReducer(state = initialState, action) {

    console.log("formReducer :: Roles", action.type, action.payload);

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

        case UPDATE_PERMISSION :

            return {
                ...state,
                groupsReload : true
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
            var newGroup = action.payload;
            newGroup.permissions = [];
            role.groups.push(newGroup);

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
        case CREATE_PERMISSION: 

            role = state.role;
            index = getGroupIndex(role,action.payload.group);
            role.groups[index].permissions.push({
                id : action.payload.id,
                identifier : action.payload.identifier,
                name : action.payload.name,
                value : false,
                group : action.payload.group.id
            });

            return {
                ...state,
                role : role
            };
        case REMOVE_PERMISSION:

            role = state.role;
            index = getGroupIndex(role,action.payload.group);
            var permissionIndex = getPermissionIndex(role.groups[index],action.payload.id);
            //console.log("REMOVE_PERMISSION : ",index,permissionIndex);
            role.groups[index].permissions.splice(permissionIndex,1);

            return {
                ...state,
                role : role
            };

        case UPDATE_GROUPS:

            role = state.role;
            role.groups = action.payload;

            return {
                ...state,
                role : role,
                groupsReload : false
            };
        
        default:
            return state;
    }
}

export default formReducer;
