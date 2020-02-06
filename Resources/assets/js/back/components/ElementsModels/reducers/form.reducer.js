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

} from '../constants';

const initialState = {

    saved: true,

    //Groups
    currentGroup: null,

    //Permissions
    selectedPermission: null,

    //Objects
    displayEditObject: false,
    displayAddObject: false,
    currentObject: null,

    //Test
    displayTestForm: false,

    //Procedures
    displayEditProcedures: false,
    displayAddProcedures: false,
    currentProcedure: null,

    form: {
        id: 1,
        modele: 'CSRIN',
        name: 'Formulario 01',
        identifier: 'Identifier',
        description: 'Description',
        icon: 'fas fa-align-center',
        objectId: 'SIN02',
        etap: '101',
        lib: 'Assuré',
        rep: 'N',
        conf: 'Y',
        obl: 'Y',
        p1: null,
        P2: null,
        p3: null,
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
                        icon: 'fas fa-calculator',
                        format: 'Num',
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
                        format: 'Text',
                        icon: 'fas fa-font',
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
                        format: 'Num',
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
                        format: 'Text',
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

        case INIT_STATE:

            console.log("INIT_STATE from Elements Models=> ", action.data);

            return {
                ...state,
            }

        case UPDATE_FIELD:
            form[action.payload.name] = action.payload.value;

            return {
                ...state,
                form: form
            }

        case UPDATE_FORM:
            return {
                ...state,
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
                displayAddProcedures: true,
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
                displayAddProcedures: false,
                currentProcedure: null
            }

        case OPEN_MODAL_CREATE_OBJECT:
            return {
                ...state,
                displayAddObject: true,
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
