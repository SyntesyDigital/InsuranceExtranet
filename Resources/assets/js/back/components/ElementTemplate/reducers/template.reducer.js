import {
    INIT_STATE_TEMPLATE,
    SUBMIT_FORM,
    SUBMITED_FORM,
    UPDATE_FIELD,
    LOAD_TEMPLATE,
    DELETE_TEMPLATE
} from "../constants/";


const initialState = {
    saved: false,
    modalItem: true,
    fields : [],
    tabsRoutes: [],
    templatesList: [],
    form: {
        id: null,
        name: '',
        layout: null,
        elementId: null
    }
};

function templateReducer(state = initialState, action) {
    switch (action.type) {
        case INIT_STATE_TEMPLATE:

            // BUILD Template list
            var templatesList = [{
                label: 'Nouveau Template',
                icon: 'fa fa-plus-circle',
                route: routes['template.create']
            }];

            if(action.payload.templates) {
                let templates = JSON.parse(atob(action.payload.templates));
                Object.keys(templates).map((key) => {
                    templatesList.unshift({
                        label: templates[key].name,
                        icon: 'fa fa-file',
                        route: routes.template.replace(':id', templates[key].id),
                    });
                });
            }

            return {
                ...state,
                form: {
                    ...state.form,
                    id: action.payload.templateId ? action.payload.templateId : null,
                    element_id: action.payload.elementId
                },
                fields : action.payload.fields ? JSON.parse(atob(action.payload.fields)) : [],
                tabsRoutes: action.payload.tabsRoutes ? JSON.parse(atob(action.payload.tabsRoutes)) : [],
                templatesList: templatesList
            };


        case UPDATE_FIELD:
            var form = state.form;
            form[action.payload.name] = action.payload.value;
            
            return {
                ...state,
                form : form
            };

        case LOAD_TEMPLATE:

            var elementId = state.form.elementId;
            var form = action.payload
            form.elementId = elementId;
            
            form.layout = (form.layout != null 
                && form.layout != "null" 
                && form.layout !== undefined 
                && form.layout != "") 
            ? JSON.parse(form.layout) 
            : [];
            
            return {
                ...state,
                form : form
            };

        case DELETE_TEMPLATE:
        case SUBMIT_FORM:
        case SUBMITED_FORM:
            return {
                ...state,
            };

        default:
            return state;
    }
}

export default templateReducer;
