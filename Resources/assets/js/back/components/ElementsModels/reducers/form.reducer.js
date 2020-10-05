import {
    INIT_STATE,
    UPDATE_FIELD,
    UPDATE_FORM,
    REMOVE_FORM,
    TEST_FORM,
    OPEN_MODAL_PROCEDURE,
    CLOSE_MODAL_PROCEDURE,
    REMOVE_PROCEDURE,
    UPDATE_PROCEDURES,
    OPEN_MODAL_CREATE_OBJECT,
    OPEN_MODAL_EDIT_OBJECT,
    CLOSE_MODAL_PROCEDURE_OBJECT,
    CLOSE_MODAL_TEST,
    INIT_CREATE,
    IMPORT_PROCEDURE_OBJECTS,
    UPDATE_CURRENT_PROCEDURE,
    REMOVE_OBJECT_CURRENT_PROCEDURE
} from '../constants';

const initialState = {

    saved: false,

    displayProcedureModal: false,
    displayObjectModal: false,

    currentProcedure: null,
    currentObject: null,

    //Test
    displayTestForm: false,

    form : {
        id: null,
        name: '',
        identifier: '',
        description: '',
        icon: '',
        type: 'form-v2',
        procedures : [],
        validation : false,
        validation_ws : null,
        service_id: null
    },

    /*
    form: {
        id: 1,
        modele: 'CSRIN',
        name: 'Formulario 01',
        identifier: 'Identifier',
        description: 'Description',
        icon: 'fas fa-align-center',
        type: 'form-v2',
        procedures: [
            {
                id: 1,
                name: 'Procedure 01',
                service: 'service-01',
                configurable: true,
                required: false,
                repeatable: true,
                objects: [
                    {
                        id : 1,
                        identifier: 'identifier 1',
                        name: 'Field Name 01',
                        format: 'number',
                        defaultValue: 'defaultValue',
                        boby: 'boby',
                        jsonPath: 'jsonPath',
                        example: 'example',
                        configurable: true,
                        visible: false,
                    },
                    {
                        id : 2,
                        identifier: 'identifier 2',
                        name: 'Field Name 02',
                        format: 'text',
                        defaultValue: 'defaultValue',
                        boby: 'boby',
                        jsonPath: 'jsonPath',
                        example: 'example',
                        configurable: true,
                        visible: false,
                    }
                ]


            },
            {
                id: 2,
                name: 'Procedure 02',
                service: 'service-02',
                configurable: true,
                required: false,
                repeatable: true,
                objects: [
                    {
                        id : 3,
                        identifier: 'identifier 1',
                        name: 'Field Name 01',
                        icon: 'fas fa-calculator',
                        format: 'number',
                        defaultValue: 'defaultValue',
                        boby: 'boby',
                        jsonPath: 'jsonPath',
                        example: 'example',
                        configurable: true,
                        visible: false,
                    },
                    {
                        id : 4,
                        identifier: 'identifier 2',
                        name: 'Field Name 02',
                        format: 'number',
                        icon: 'fas fa-font',
                        defaultValue: 'defaultValue',
                        boby: 'boby',
                        jsonPath: 'jsonPath',
                        example: 'example',
                        configurable: true,
                        visible: false,
                    }
                ]
            }
        ]
    },
    */

    test : {
        "causeCirconstance": "cause",
        "circonstance": "AUTOBDG",
        "dateDeclaration": "04/09/2019",
        "dateOuverture": "04/09/2019",
        "dateSurvenance": "02/09/2019",
        "dommages": "dommange",
        "heureSurvenance": "09:45",
        "idPol": "11000031",
        "motif": "OUVSIN",
        "mouvement": "OUVSIN",
        "numCbt": "04/09/2019",
        "numCie": "Non Communiqué",
        "numSoc": "LYON",
        "risque5": "France",
        "type": "4",
        "listPer": [{
            "categ": "ASSURE",
            "idPer": "11336083"
        }, {
            "categ": "USEREXT",
            "idPer": "11336223"
        }]
        
    },
}


function formReducer(state = initialState, action) {

    console.log("formReducer :: Elements Models", action.type, action.payload);

    let form = state.form;

    switch (action.type) {

        case INIT_CREATE : 
            form.type = action.payload.type;
            return {
                ...state,
                form: form
            }

        case INIT_STATE:
            if(action.payload.type == "table" || action.payload.type == "fiche") {
                return {
                    ...state,
                    form: {
                        ...action.payload,
                        service_id: action.payload.procedures[0].service.id
                    },
                    currentProcedure: action.payload.procedures[0]
                }
            }

            return {
                ...state,
                form : action.payload
            }

        case UPDATE_FIELD:
            form[action.payload.name] = action.payload.value;

            if(action.payload.name == "validation" && action.payload.value == false){
                form['validation_ws'] = null;
            }

            return {
                ...state,
                form: form
            }

        case UPDATE_FORM:

            var proceduresCopy = state.form.procedures;
            var newForm = action.payload;
            newForm.procedures = proceduresCopy;
            newForm.validation = newForm.validation_ws !== undefined &&  newForm.validation_ws != null && newForm.validation_ws != '' ? true : false;

            if(form.type == "table" || form.type == "fiche") {
                newForm.service_id = proceduresCopy[0].service.id;
            }

            return {
                ...state,
                form: newForm
            }

        case REMOVE_FORM:
            return {
                ...state,
            }

        case TEST_FORM:
            return {
                ...state,
                displayTestForm: true,
            }

        case OPEN_MODAL_PROCEDURE:
            return {
                ...state,
                displayProcedureModal: true,
                currentProcedure: action.payload ? action.payload : {
                    id: null,
                    name: '',
                    service: '',
                    configurable: false,
                    required: false,
                    repeatable: false,
                    prefixed: false,
                    duplicate: false,
                    repeatable_json: '',
                    repeatable_jsonpath: '',
                    fields: [],
                    order: 0
                }
            }

        case CLOSE_MODAL_PROCEDURE:
            return {
                ...state,
                displayProcedureModal: false,
                currentProcedure: null
            }

        case REMOVE_PROCEDURE:
            return {
                ...state,
                currentProcedure: action.payload
            }

        case UPDATE_PROCEDURES:
            return {
                ...state,
                form : {
                    ...form,
                    service_id: form.type == "table" || form.type == "fiche" ? action.payload[0].service.id : null,
                    procedures: action.payload
                },
            }

        case UPDATE_CURRENT_PROCEDURE: 
            return {
                ...state,
                currentProcedure: action.payload,
                form : {
                    ...form,
                    procedures: [action.payload],
                    service_id: action.payload.service_id
                },
            }

        case OPEN_MODAL_CREATE_OBJECT:
            return {
                ...state,
                displayObjectModal: true,
                currentObject : {
                    id : null,
                    identifier: '',
                    name: '',
                    type : 'INPUT',
                    format: 'text',
                    default_value: '',
                    boby: '',
                    jsonPath: '',
                    example: '',
                    configurable: false,
                    visible: false
                }
            }

        case OPEN_MODAL_EDIT_OBJECT:
            return {
                ...state,
                displayObjectModal: true,
                currentObject: action.payload.object,
            }

        case CLOSE_MODAL_PROCEDURE_OBJECT:
            return {
                ...state,
                displayObjectModal: false,
                currentObject: null
            }

        case REMOVE_OBJECT_CURRENT_PROCEDURE: 
            return {
                ...state,
                currentProcedure: {
                    ...state.currentProcedure,
                    fields: state.currentProcedure.fields.filter(field => field.identifier != action.payload.identifier)
                }
            }

        case CLOSE_MODAL_TEST:
            return {
                ...state,
                displayTestForm: false,
            }

        case IMPORT_PROCEDURE_OBJECTS: 
            return {
                ...state,
                currentProcedure: {
                    ...state.currentProcedure,
                    fields: Object.keys(action.payload.data[0]).map((k, index) => {
                        return {
                            name: k, 
                            identifier: k,
                            type: 'CTE',
                            format: 'text',
                            visible: 1,
                            index: index
                        };
                    })
                }
            };

        default:
            return state;
    }
}

export default formReducer;
