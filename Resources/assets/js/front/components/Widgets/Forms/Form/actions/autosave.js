import {
    AUTOSAVE_CREATE,
    AUTOSAVE_UPDATE,
    AUTOSAVE_READ,
    AUTOSAVE_DELETE
} from "../constants/";


export function autosave(action, payload) {
    return (dispatch) => {
        axios.post(ASSETS + 'autosave/' + action, payload)
            .then(response => {

                let type = action == 'create' 
                    ? AUTOSAVE_CREATE 
                    : AUTOSAVE_UPDATE;

                switch(action) {
                    case 'read':
                        type = AUTOSAVE_READ;
                        break;

                    case 'delete':
                        type = AUTOSAVE_DELETE;
                        break;
                }

                dispatch({
                    type: type, 
                    payload: response.data.data
                });

            })
            .catch(error => {
                console.error(error);
            });
    }
};