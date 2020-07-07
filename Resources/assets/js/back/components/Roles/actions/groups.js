import {
    OPEN_MODAL_CREATE_GROUP,
    OPEN_MODAL_EDIT_GROUP,
    CANCEL_EDIT_GROUP,
    UPDATE_GROUP,
    SAVE_GROUP,
    REMOVE_GROUP,
    CREATE_GROUP
} from "../constants/";

import api from "../../../api/";

export function openModalCreateGroup() {
    return { 
        type: OPEN_MODAL_CREATE_GROUP 
    };
}

export function openModalEditGroup(group) {
    return { 
        type: OPEN_MODAL_EDIT_GROUP,
        payload: group 
    };
}

export function saveGroup(group) {
    return group.id != null 
        ? updateGroup(group) 
        : createGroup(group);
}

export function createGroup(group) {
    return (dispatch) => {
        api.groups.create({
            name: group.name,
            identifier: group.identifier
        }).then(function (data) {

            toastr.success(Lang.get('fields.success'));

            dispatch({ 
                type: CREATE_GROUP,
                payload: data.data.createPermissionGroup 
            });
        },function(error){
            console.error("error",error);
            toastr.error(error.message);
        });
    }
}

export function updateGroup(group) {
    return (dispatch) => {
        api.groups.update(group.id, {
            name: group.name,
            identifier: group.identifier
        }).then(function (data) {

            toastr.success(Lang.get('fields.success'));

            dispatch({
                type: UPDATE_GROUP, 
                payload: data.data.updatePermissionGroup 
            });
        },function(error){
            console.error("error",error);
            toastr.error(error.message);
        });
    }
}

export function cancelEditGroup() {
    return { 
        type: CANCEL_EDIT_GROUP 
    };
}


export function removeGroup(group) {
    return (dispatch) => {
        api.groups.delete(group.id)
            .then(function (data) {

                toastr.success(Lang.get('fields.success'));

                dispatch({ 
                    type: REMOVE_GROUP, 
                    payload: data.data.deletePermissionGroup 
                });
            },function(error){
                console.error("error",error);
                toastr.error(error.message);
            });
    }
}