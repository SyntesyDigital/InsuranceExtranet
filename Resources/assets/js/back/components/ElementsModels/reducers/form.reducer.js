import {
    INIT_STATE,
    UPDATE_FIELD,
    UPDATE_FORM,
    REMOVE_FORM,
    TEST_FORM,
    OPEN_MODAL_CREATE_PROCEDURE,
    OPEN_MODAL_EDIT_PROCEDURE,
    REMOVE_PROCEDURE,
    UPDATE_PROCEDURES,
    CLOSE_MODAL_PROCEDURES,
    OPEN_MODAL_CREATE_OBJECT,
    OPEN_MODAL_EDIT_OBJECT,
    CLOSE_MODAL_PROCEDURE_OBJECT,
    CLOSE_MODAL_TEST,
    INIT_CREATE

} from '../constants';

const initialState = {

    saved: false,

    //Objects
    displayEditObject: false,
    currentObject: null,

    //Test
    displayTestForm: false,

    //Procedures
    displayEditProcedures: false,
    currentProcedure: null,

    form : {
        id: null,
        name: '',
        identifier: '',
        description: '',
        icon: '',
        type: 'form-v2',
        procedures : [],
        validation : false,
        validation_ws : null
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
            return {
                ...state
            }
        case INIT_STATE:

            //console.log("INIT_STATE from Elements Models=> ", action.data);

            var newForm = action.payload;
            newForm.validation = newForm.validation_ws !== undefined &&  newForm.validation_ws != null && newForm.validation_ws != '' 
                ? true : false;

            return {
                ...state,
                form : newForm
            }

        case UPDATE_FIELD:
            form[action.payload.name] = action.payload.value;
            //if validate disabled, remove validate_ws value
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
            newForm.validation = newForm.validation_ws !== undefined &&  newForm.validation_ws != null && newForm.validation_ws != '' 
                ? true : false;

            return {
                ...state,
                form : newForm
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

        case OPEN_MODAL_CREATE_PROCEDURE:
            return {
                ...state,
                displayEditProcedures: true,
                //add default procedure values
                currentProcedure : {
                    id: null,
                    name: '',
                    service: '',
                    configurable: false,
                    required: false,
                    repeatable: false,
                    prefixed : false,
                    duplicate: false,
                    repeatable_json : '',
                    repeatable_jsonpath : '',
                    fields: [],
                    order:0
                }
            }

        case OPEN_MODAL_EDIT_PROCEDURE:
            return {
                ...state,
                displayEditProcedures: true,
                currentProcedure: action.payload
            }

        case REMOVE_PROCEDURE:
            return {
                ...state,
                currentProcedure: action.payload
            }

        case UPDATE_PROCEDURES:

            form.procedures = action.payload;

            return {
                ...state,
                form : form
            }

        case CLOSE_MODAL_PROCEDURES:
            return {
                ...state,
                displayEditProcedures: false,
                currentProcedure: null
            }

        case OPEN_MODAL_CREATE_OBJECT:
            return {
                ...state,
                displayEditObject: true,
                //default current object
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
                displayEditObject: true,
                currentObject: action.payload.object,
            }

        case CLOSE_MODAL_PROCEDURE_OBJECT:
            return {
                ...state,
                displayEditObject: false,
                currentObject: null
            }

        case CLOSE_MODAL_TEST:
            return {
                ...state,
                displayTestForm: false,
            }

        default:
            return state;
    }
}

export default formReducer;
