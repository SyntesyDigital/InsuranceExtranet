import {
    INIT_STATE_TEMPLATE,
    SUBMIT_FORM,
    SUBMITED_FORM,
    UPDATE_FIELD,
    LOAD_TEMPLATE,
    DELETE_TEMPLATE,
} from "../constants/";

/**
 * Iterate recursively through layout to get fields
 * @param {*} layout 
 * @param {*} identifiers 
 */
function getLayoutElementFields(layout,identifiers) {

    if(layout == null)
        return identifiers;

    for(var i=0;i<layout.length;i++){
        var item = layout[i];
        //console.log("item => ",item);
        if(item.type == "element_field"){
          //process item, return params
          identifiers.push(item.field.identifier);
        }
        else if(item.children != null && item.children !== undefined &&
          item.children.length > 0){
            identifiers = getLayoutElementFields(item.children,identifiers);
          }
      }


    return identifiers;
}

/**
 * Function to check if there is identifiers ndefined in the layout. 
 * That means some fields doesn't exist, so a future break in the front and template.
 * @param {} identifiers 
 */

function anyIdentifierIsUndefined(identifiers) {
    for(var key in identifiers){
        if(identifiers[key] === undefined)
            return true;
    }
    return false;
}

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

    console.log("templateReducer :: ",action);

    var fields = state.fields;
    var layoutFieldsIdentifier = null;

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

            layoutFieldsIdentifier = getLayoutElementFields(state.form.layout,[]);

            //process required field
            var fieldsList = action.payload.fields ? JSON.parse(atob(action.payload.fields)) : [];
            for(var key in fieldsList){
                fieldsList[key].required = fieldsList[key].rules && fieldsList[key].rules.required ? fieldsList[key].rules.required : false;
                if(layoutFieldsIdentifier.indexOf(fieldsList[key].identifier) != -1){
                    fieldsList[key].added = true;
                }
                else {
                    fieldsList[key].added = false;
                }
            }

            return {
                ...state,
                form: {
                    ...state.form,
                    id: action.payload.templateId ? action.payload.templateId : null,
                    element_id: action.payload.elementId
                },
                fields : fieldsList,
                tabsRoutes: action.payload.tabsRoutes ? JSON.parse(atob(action.payload.tabsRoutes)) : [],
                templatesList: templatesList,
                errors : anyIdentifierIsUndefined(layoutFieldsIdentifier)
            };


        case UPDATE_FIELD:
            var form = state.form;

            var layoutChanged = false;

            if(action.payload.name == "layout"){
                //it cames from page builder update field
                layoutChanged = true;
                const layoutFieldsIdentifier = getLayoutElementFields(action.payload.value,[]);
                console.log("layoutFieldsIdentifier :: (layout,identifiers) ",action.payload.value,layoutFieldsIdentifier);

                for(var key in fields){
                    if(layoutFieldsIdentifier.indexOf(fields[key].identifier) != -1){
                        fields[key].added = true;
                    }
                    else {
                        fields[key].added = false;
                    }
                }
            }
            else {
                form[action.payload.name] = action.payload.value;
            }
            
            return {
                ...state,
                form : form,
                fields : fields,
                errors : layoutChanged ? anyIdentifierIsUndefined(layoutFieldsIdentifier) : state.errors
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

            layoutFieldsIdentifier = getLayoutElementFields(form.layout,[]);
            console.log("loadTemplate :: ayoutFieldsIdentifier :: (layoutFieldsIdentifier)",layoutFieldsIdentifier);

            for(var key in fields){
                if(layoutFieldsIdentifier.indexOf(fields[key].identifier) != -1){
                    fields[key].added = true;
                }
                else {
                    fields[key].added = false;
                }
            }
            
            return {
                ...state,
                form : form,
                fields : fields,
                errors : anyIdentifierIsUndefined(layoutFieldsIdentifier)
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
