import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Layout/Modal';
import InputField from '../Layout/Fields/InputField';
import Switch from '../Layout/Fields/ToggleField';
import SelectField from '../Layout/Fields/SelectField';

const arrayOfGroup = [
    {
        id: '1 - Nico',
        name: 'nico'
    },
    {
        id: '2 - Sergi',
        name: 'sergi'
    },
    {
        id: '3 - Francicso',
        name: 'francisco'
    },
    {
        id: '4 - dani',
        name: 'dani'
    },
];

export default class ModalEditObject extends Component {

    constructor(props) {

        super(props);

        this.state = {
            selectedValueType: 'Nothing selected',
            selectedValueFormat: 'Nothing selected'
        };

    }

    handleSelectValueChange(selectedValueType) {
        this.setState({
          selectedValueType: selectedValueType
        });
    }

    handleSelectFormatChange(selectedValueFormat) {
        this.setState({
            selectedValueFormat: selectedValueFormat
        });
    }
    
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

                    <div className="col-xs-8 col-xs-offset-2 field-col">

                        <InputField
                            title={'Identifier (champ)'}
                            name={'name'}
                        />

                        <InputField
                            title={'Name (lib)'}
                            name={'identifier'}
                        />

                        <SelectField
                            arrayOfGroup={arrayOfGroup}
                            title={'Type (Nature) (CTE, System, INPUT)'}
                            onSelectChange={this.handleSelectValueChange.bind(this)}
                        />

                        <SelectField
                            arrayOfGroup={arrayOfGroup}
                            title={'Format (Text, num, etc)'}
                            onSelectChange={this.handleSelectFormatChange.bind(this)}
                        />

                        <InputField
                            title={'Default value (valeur)'}
                            name={'name'}
                        />

                        <InputField
                            title={'Boby (solo si es select)'}
                            name={'identifier'}
                        />

                        <InputField
                            title={'JSON path (concreto para este campo)'}
                            name={'name'}
                        />

                        <InputField
                            title={'Example'}
                            name={'identifier'}
                        />

                        <Switch
                            title={'Configurable'}
                        />

                        <Switch
                            title={'Visible'}
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
