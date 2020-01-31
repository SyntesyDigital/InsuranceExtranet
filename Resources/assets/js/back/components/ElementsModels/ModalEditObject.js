import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Layout/Modal';
import InputField from '../Layout/Fields/InputField';
import ToggleField from '../Layout/Fields/ToggleField';
import SelectField from '../Layout/Fields/SelectField';


export default class ModalEditObject extends Component {

    constructor(props) {

        super(props);

        this.state = {

            object:
            {
                ID: 1,
                SERV_ID: 'DOCUMENT',
                OBJ_ID: 'DOC01',
                OBJ_JSONP: '$.',
                CHAMP: 'confid',
                LIB: 'Confidentiel',
                NATURE: '',
                FORMAT: '',
                OBL: 'Y',
                VALEUR: '0',
                BOBY: null,
                VIS: 'N',
                CONF: 'N',
                CONT: null,
                COM: null,
                ACTIF: 'Y',
                EXEMPLE: '0',
                P1: null,
                P2: null,
            },

            NATURE:[
                {
                    name: 'CTE',
                    value: 'CTE'
                },
                {
                    name: 'System',
                    value: 'System'
                },
                {
                    name: 'INPUT',
                    value: 'INPUT'
                },
            ],

            FORMAT: [
                {
                    name: 'Text',
                    value: 'Text'
                },
                {
                    name: 'num',
                    value: 'num'
                },
            ],
        
        };
    }

// ==============================
// Handlers
// ==============================

handleFieldChange(name, value) {
    console.log("handleFieldChange :: (name,value) ", name, value);
    const { object } = this.state;
    object[name] = value;
    this.setState({
        object: object
    });
}

// ==============================
// Renderers
// ==============================

render() {

    return (

        <Modal
            id={this.props.id}
            icon={this.props.icon}
            title={this.props.title}
            display={this.props.display}
            zIndex={10000}
            onModalClose={this.props.onModalClose}
            size={this.props.size}
        >
            <div className="row">

                <div className="col-xs-12 field-col">

                    <InputField
                        label={'Identifier (champ)'}
                        value={this.state.object.CHAMP}
                        name={'CHAMP'}
                        onChange={this.handleFieldChange.bind(this)}
                    />

                    <InputField
                        label={'Name (lib)'}
                        value={this.state.object.LIB}
                        name={'LIB'}
                        onChange={this.handleFieldChange.bind(this)}
                    />

                    <SelectField
                        label={'Type (Nature) (CTE, System, INPUT)'}
                        value={this.state.object.NATURE}
                        name={'type-nature'}
                        arrayOfOptions={this.state.NATURE}
                        onChange={this.handleFieldChange.bind(this)}
                    />

                    <SelectField
                        label={'Format (Text, num, etc)'}
                        value={this.state.object.FORMAT}
                        name={'type-format'}
                        arrayOfOptions={this.state.FORMAT}
                        onChange={this.handleFieldChange.bind(this)}
                    />

                    <InputField
                        label={'Default value (valeur)'}
                        name={'VALEUR'}
                        value={this.state.object.VALEUR}
                        onChange={this.handleFieldChange.bind(this)}
                    />

                    <InputField
                        label={'Boby (solo si es select)'}
                        name={'BOBY'}
                        value={this.state.object.BOBY}
                        onChange={this.handleFieldChange.bind(this)}
                    />

                    <InputField
                        label={'JSON path (concreto para este campo)'}
                        name={'OBJ_JSONP'}
                        value={this.state.object.OBJ_JSONP}
                        onChange={this.handleFieldChange.bind(this)}
                    />

                    <InputField
                        label={'Example'}
                        name={'EXEMPLE'}
                        value={this.state.object.EXEMPLE}
                        onChange={this.handleFieldChange.bind(this)}
                    />

                    <ToggleField
                        label={'Configurable'}
                        name={'CONF'}
                        checked={this.state.object.CONF}
                        onChange={this.handleFieldChange.bind(this)}
                    />

                    <ToggleField
                        label={'Visible'}
                        name={'VIS'}
                        checked={this.state.object.VIS}
                        onChange={this.handleFieldChange.bind(this)}
                    />

                </div>
            </div>
        </Modal>

    );
}
}

ModalEditObject.propTypes = {
    id: PropTypes.string.isRequired,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    display: PropTypes.bool.isRequired,
    zIndex: PropTypes.number.isRequired
};
