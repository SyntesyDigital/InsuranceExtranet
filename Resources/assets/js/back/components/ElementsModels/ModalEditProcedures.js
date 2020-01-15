import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Layout/Modal';
import InputField from '../Layout/Fields/InputField';
import SelectField from '../Layout/Fields/SelectField';
import Switch from '../Layout/Fields/ToggleField';
import InputFieldJsonEdit from '../Layout/Fields/InputFieldJsonEdit';
import FieldList from '../Layout/FieldList';
import FieldListItem from '../Layout/FieldList';

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

export default class ModalEditProcedures extends Component {

    constructor(props) {

        super(props);

        this.state = {
            selectedValue: 'Nothing selected'
        };

    }

    handleSelectChange(selectedValue) {
        this.setState({
            selectedValue: selectedValue
        });
    }

    render() {

        return (

            <Modal
                id={this.props.id}
                icon={this.props.icon}
                title={'Edit Procedures'}
                display={this.props.display}
                zIndex={10000}
                onModalClose={this.props.onModalClose}
                size={this.props.size}
            >
                <div className="row">
                    <div className="col-md-8 field-col">
                        <FieldList>
                            <FieldListItem
                                icon={'fa fa-file'}
                                label={'Name'}
                                identifier={'id'}
                            >
                                <div className="row">
                                    <div className="field-name col-xs-6">
                                        <input type="text" className="form-control" name="name" placeholder="Nom" value={this.props.name} onChange={this.handleChange} />
                                    </div>
                                    <div className="field-name col-xs-6">
                                        <input disabled type="text" className="form-control" name="identifier" placeholder="Idenfiticador" value={this.props.identifier} onChange={this.handleChange} />
                                    </div>
                                </div>
                            </FieldListItem>
                        </FieldList>
                    </div>

                    <div className="col-md-4 field-col">
                        <InputField
                            title={'Name'}
                            value={''}
                            name={'name'}
                            placeholder={''}
                        />

                        <SelectField
                            arrayOfGroup={arrayOfGroup}
                            title={'Service'}
                            onSelectChange={this.handleSelectChange.bind(this)}
                        />

                        <Switch
                            title={'Configurable'}
                        />

                        <Switch
                            title={'Required'}
                        />

                        <Switch
                            title={'Repeatable'}
                        />

                        <InputFieldJsonEdit
                        />
                    </div>
                </div>
            </Modal>
        );
    }
}

ModalEditProcedures.propTypes = {
    id: PropTypes.string.isRequired,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    display: PropTypes.bool.isRequired,
    zIndex: PropTypes.number.isRequired,
    size: PropTypes.string.isRequired
};

