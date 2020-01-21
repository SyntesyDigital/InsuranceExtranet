import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Layout/Modal';
import InputField from '../Layout/Fields/InputField';
import SelectField from '../Layout/Fields/SelectField';
import ToggleField from '../Layout/Fields/ToggleField';
import InputFieldJsonEdit from '../Layout/Fields/InputFieldJsonEdit';
import FieldList from '../Layout/FieldList';
import FieldListItem from '../Layout/FieldListItem';
import BoxAddLarge from '../Layout/BoxAddLarge';
import ModalEditObject from './ModalEditObject';

const arrayOfOptions = [
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

            displayEditObject: false,
            displayEditProcedures: false,
            checkedRepeatable: false,
            currentProcedure: null
        };

        this.handleChangeRepeatable = this.handleChangeRepeatable.bind(this);

    }

    // ==============================
    // Open Modals
    // ==============================

    openModalEditObject(e) {
        if (e !== undefined) {
            e.preventDefault();
        }

        this.setState({
            displayEditObject: true,
        });
    }

    // ==============================
    // Handlers
    // ==============================

    handleModalCloseEditObject() {
        this.setState({
            displayEditObject: false,
            displayEditProcedures: true,
        });
    }

    handleChangeRepeatable() {
        this.setState({
            checkedRepeatable: !this.state.checkedRepeatable
        })
    }

    handleFieldChange(name, value) {
        console.log("handleFieldChange :: (name,value) ", name, value);
        const { form } = this.state;

        form[name] = value;
        this.setState({
            form: form
        });
    }

    // ==============================
    // Renderers
    // ==============================

    renderObjects(currentProcedure) {
        if (currentProcedure === undefined)
            return null;

        const displayObjects = currentProcedure.objects.map((object, index) =>
            <div key={object.identifier + index} className={object.identifier + index}>
                <FieldListItem
                    key={index}
                    identifier={object.identifier}
                    index={index}
                    onClick={this.openModalEditObject.bind(this)}
                    icon={'fas fa-bars'}
                    icons={[
                        'fas fa-redo-alt'
                    ]}
                    labelInputLeft={object.name}
                // labelInputRight={object.title}
                />
            </div>
        )
        return (
            <div>
                {displayObjects}
            </div>

        )

    }

    render() {

        const inputFieldJsonEdit = this.state.checkedRepeatable ? <InputFieldJsonEdit label={'JSON'} /> : null;

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
                {this.props.procedure != null &&

                    <div className="row rightbar-page">

                        <div className="col-md-8 col-xs-12 field-col page-content form-fields">

                            <ModalEditObject
                                id={'modal-edit-object'}
                                icon={'fas fa-bars'}
                                size={'medium'}
                                title={'Object | Configuration'}
                                display={this.state.displayEditObject}
                                zIndex={10000}
                                onModalClose={this.handleModalCloseEditObject.bind(this)}
                            />

                            <FieldList>

                                {this.renderObjects(this.props.procedure)}

                                <BoxAddLarge
                                    identifier='1'
                                    title='Ajouter'
                                    onClick={this.openModalEditObject.bind(this)}
                                />

                            </FieldList>

                        </div>

                        <div className="col-md-4 col-xs-12 field-col">

                            <InputField
                                label={'Name'}
                                name={'name'}
                                // value={this.state.form.procedure.name}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <SelectField
                                arrayOfOptions={arrayOfOptions}
                                title={'Service'}
                            />

                            <ToggleField
                                label={'Configurable'}
                                name={'configurable'}
                                // checked={this.state.form.procedure.configurable}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <ToggleField
                                label={'Required'}
                                name={'requires'}
                                // checked={this.state.form.procedure.required}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <ToggleField
                                label={'Repeatable'}
                                name={'repeatable'}
                                checked={this.state.checkedRepeatable}
                                onChange={this.handleChangeRepeatable}
                            />

                            {/* show input json edit when procedures is Repeatable */}
                            {inputFieldJsonEdit}

                        </div>
                    </div>

                }






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

