import {
  INIT_STATE,

} from '../constants';

const initialState =  {
    
    saved : false,
    //role
    role : {
        id : 1,
        name : 'Admin',
        identifier : 'admin',
        icon : 'fa fa-pencil',
        default : true,
        groups : [
            {
                id : 1,
                identifier : 'group_1',
                name : 'Group 1',
                default : true,
                permissions : [
                    {
                        id : 1,
                        identifier : 'permission_1',
                        name : 'Permission 1',
                        value : true
                    },
                    {
                        id : 2,
                        identifier : 'permission_2',
                        name : 'Permission 2',
                        value : true
                    }
                ]
            },
            {
                id : 2,
                identifier : 'group_2',
                name : 'Group 2',
                permissions : [
                    {
                        id : 3,
                        identifier : 'permission_3',
                        name : 'Permission 3',
                        value : true
                    },
                    {
                        id : 4,
                        identifier : 'permission_4',
                        name : 'Permission 4',
                        value : false
                    }
                ]
            },
            {
                id : 3,
                identifier : 'group_3',
                name : 'Group 3',
                permissions : []
            }
        ]
    }
}

function formReducer(state = initialState, action) {

    //console.log("formReducer :: ",action.type, action.payload);

    switch(action.type) {
        case INIT_STATE:

            console.log("INIT_STATE => ",action.data);

            return {
                ...state
            }

        
        default:
            return state;
    }
}

export default formReducer;
