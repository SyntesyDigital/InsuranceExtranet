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
        icon: 'fa fa-pencil',
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
                title: 'Procedure 01',
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
                configurable: {
                    name: 'configurable',
                    value: true
                },
                required: {
                    name: 'required',
                    value: true
                },
                repeatable: {
                    name: 'required',
                    value: true
                },
                objects: [
                    {
                        identifier: 1,
                        name: 'Name',
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
                        format: [
                            {
                                name: 'text',
                                value: 'TEXT'
                            },
                            {
                                name: 'num',
                                value: 'Num'
                            },
                        ],
                        defaultValue: {
                            name: 'default-value',
                            value: 'Valeur'
                        },
                        boby: {
                            name: 'boby',
                            value: 'Boby'
                        },
                        jsonPath: {
                            name: 'json-path',
                            value: 'JSON path'
                        },
                        example: {
                            name: 'example',
                            value: 'Example'
                        },
                        configurable: {
                            name: 'configurable',
                            value: true
                        },
                        visible: {
                            name: 'visible',
                            value: true
                        }
                    },
                    {
                        identifier: 2,
                        name: 'Name2',
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
                        format: [
                            {
                                name: 'text',
                                value: 'TEXT'
                            },
                            {
                                name: 'num',
                                value: 'Num'
                            },
                        ],
                        defaultValue: {
                            name: 'default-value',
                            value: 'Valeur'
                        },
                        boby: {
                            name: 'boby',
                            value: 'Boby'
                        },
                        jsonPath: {
                            name: 'json-path',
                            value: 'JSON path'
                        },
                        example: {
                            name: 'example',
                            value: 'Example'
                        },
                        configurable: {
                            name: 'configurable',
                            value: true
                        },
                        visible: {
                            name: 'visible',
                            value: true
                        }
                    }
                ]


            },
            {
                id: 2,
                title: 'Procedure 02',
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
                configurable: {
                    name: 'configurable',
                    value: true
                },
                required: {
                    name: 'required',
                    value: true
                },
                repeatable: {
                    name: 'required',
                    value: true
                },
                objects: [
                    {
                        identifier: 2,
                        name: 'Name',
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
                        format: [
                            {
                                name: 'text',
                                value: 'TEXT'
                            },
                            {
                                name: 'num',
                                value: 'Num'
                            },
                        ],
                        defaultValue: {
                            name: 'default-value',
                            value: 'Valeur'
                        },
                        boby: {
                            name: 'boby',
                            value: 'Boby'
                        },
                        jsonPath: {
                            name: 'json-path',
                            value: 'JSON path'
                        },
                        example: {
                            name: 'example',
                            value: 'Example'
                        },
                        configurable: {
                            name: 'configurable',
                            value: true
                        },
                        visible: {
                            name: 'visible',
                            value: true
                        }
                    }

                ]
            }
        ]
    }
}



function formReducer(state = initialState, action) {

    console.log("formReducer :: from elements-models", action.type, action.payload);

    switch (action.type) {

        case INIT_STATE:

            console.log("INIT_STATE from elements-models=> ", action.data);

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
            }

        case UPDATE_PROCEDURES:
            let procedures = state.form.procedure;
            procedures[action.payload.index].value = action.payload.value;
            return {
                ...state,
                procedures : procedures
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
                currentObject: action.payload
            }

        case CLOSE_MODAL_PROCEDURE_OBJECT:
            return {
                ...state,
                displayEditObject: false,
                currentObject: action.payload
            }

        case CLOSE_MODAL_TEST:
            return {
                ...state,
                displayTestForm: true,
            }

        default:
            return state;
    }
}

export default formReducer;
