import {
    INIT_STATE_TEMPLATE,
    UPDATE_FORM,
    UPDATE_FIELD,
    REMOVE_FORM,
} from '../constants';

const initialState = {
    "type": "row",
    "settings": {
        "htmlId": null,
        "htmlClass": null,
        "hasContainer": null
    },
    "children": [{
        "type": "col",
        "settings": {
            "htmlId": null,
            "htmlClass": null
        },
        "colClass": "col-xs-12",
        "children": [{
            "type": "item",
            "field": {
                "class": "Modules\\Architect\\Widgets\\Types\\ElementTable",
                "rules": {
                    "required": null
                },
                "label": "ELEMENT_TABLE",
                "name": "Tableau principaux",
                "type": "widget",
                "icon": "fa fa-table",
                "settings": {
                    "pagination": "50",
                    "tableElements": "34",
                    "excel": null
                },
                "component": "CommonWidget",
                "widget": null,
                "hidden": false,
                "defaultSettings": null,
                "identifier": "temp_[0,0,0]",
                "fieldname": "pagewidget_5d3b5e32baef2"
            }
        }]
    }]
};


function templateReducer(state = initialState, action) {

    console.log("templateReducer :: REDUCER :: => ", action.type, action.payload);

    switch (action.type) {

        case INIT_STATE_TEMPLATE:
            return {
                ...state,
            };

        case UPDATE_FORM:
            return {
                ...state,
            };

        case UPDATE_FIELD:
            return {
                ...state,
            };

        case REMOVE_FORM:
            return {
                ...state,
            };

        default:
            return state;
    }
}

export default templateReducer;
