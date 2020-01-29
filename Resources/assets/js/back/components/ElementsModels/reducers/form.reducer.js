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

    procedures: [],
    objects: [],

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



    form:
    {
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
        procedure: [
            {
                id: 1,
                name: 'Procedure 01',
                service: 'service-01',
                services: [
                    {
                        name: 'service-01',
                        value: 'Service-01'
                    },
                    {
                        name: 'service-02',
                        value: 'Service-02'
                    },
                    {
                        name: 'service-03',
                        value: 'Service-03'
                    },
                ],
                configurable: true,
                required: false,
                repeatable: true,
                objects: [
                    {
                        identifier: 'identifier 1',
                        name: 'Field Name 01',
                        typeNature: 'CTE',
                        typeNatures: [
                            {
                                name: 'cte',
                                value: 'CTE'
                            },
                            {
                                name: 'system',
                                value: 'SYSTEM'
                            },
                            {
                                name: 'input',
                                value: 'INPUT'
                            },
                        ],
                        icon: 'fas fa-calculator',
                        format: 'Num',
                        formats: [
                            {
                                name: 'text',
                                value: 'TEXT'
                            },
                            {
                                name: 'num',
                                value: 'Num'
                            },
                        ],
                        defaultValue: 'defaultValue',
                        boby: 'boby',
                        jsonPath: 'jsonPath',
                        example: 'example',
                        configurable: true,
                        visible: false,
                    },
                    {
                        identifier: 'identifier 2',
                        name: 'Field Name 02',
                        typeNature: [
                            {
                                name: 'cte',
                                value: 'CTE'
                            },
                            {
                                name: 'system',
                                value: 'SYSTEM'
                            },
                            {
                                name: 'input',
                                value: 'INPUT'
                            },
                        ],
                        format: 'Text',
                        formats: [
                            {
                                name: 'text',
                                value: 'TEXT'
                            },
                            {
                                name: 'num',
                                value: 'Num'
                            },
                        ],
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
                services: [
                    {
                        name: 'service-01',
                        value: 'Service-01'
                    },
                    {
                        name: 'service-02',
                        value: 'Service-02'
                    },
                    {
                        name: 'service-03',
                        value: 'Service-03'
                    },
                ],
                configurable: true,
                required: false,
                repeatable: true,
                objects: [
                    {
                        identifier: 'identifier 1',
                        name: 'Field Name 01',
                        typeNature: [
                            {
                                name: 'cte',
                                value: 'CTE'
                            },
                            {
                                name: 'system',
                                value: 'SYSTEM'
                            },
                            {
                                name: 'input',
                                value: 'INPUT'
                            },
                        ],
                        icon: 'fas fa-calculator',
                        format: 'Num',
                        formats: [
                            {
                                name: 'text',
                                value: 'TEXT'
                            },
                            {
                                name: 'num',
                                value: 'Num'
                            },
                        ],
                        defaultValue: 'defaultValue',
                        boby: 'boby',
                        jsonPath: 'jsonPath',
                        example: 'example',
                        configurable: true,
                        visible: false,
                    },
                    {
                        identifier: 'identifier 2',
                        name: 'Field Name 02',
                        typeNature: [
                            {
                                name: 'cte',
                                value: 'CTE'
                            },
                            {
                                name: 'system',
                                value: 'SYSTEM'
                            },
                            {
                                name: 'input',
                                value: 'INPUT'
                            },
                        ],
                        format: 'Text',
                        formats: [
                            {
                                name: 'text',
                                value: 'TEXT'
                            },
                            {
                                name: 'num',
                                value: 'Num'
                            },
                        ],
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
        ]
    }
}



function formReducer(state = initialState, action) {

    console.log("formReducer :: Elements Models", action.type, action.payload);

    switch (action.type) {

        case INIT_STATE:

            console.log("INIT_STATE from Elements Models=> ", action.data);

            return {
                ...state,
            }

        case UPDATE_FIELD:
            let form = state.form;
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

            let procedure = state.currentProcedure;
            
            console.log("Action :: ", procedure);

            procedure[action.payload.name] = action.payload.value;

            return {
                ...state,
                procedure: procedure
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
