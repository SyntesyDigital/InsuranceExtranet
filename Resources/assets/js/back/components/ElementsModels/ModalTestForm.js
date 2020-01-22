import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Layout/Modal';
import CollapsableGroup from '../Layout/CollapsableGroup';
import InputFieldJsonEdit from '../Layout/Fields/InputFieldJsonEdit';


export default class ModalTestForm extends Component {

    constructor(props) {

        super(props);

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
                <div className="row page-content form-fields">
                    <CollapsableGroup
                        identifier='1'
                        title='POST / Sinister /...'
                    >
                        <InputFieldJsonEdit
                            label={'JSON'}
                        />

                    </CollapsableGroup>
                </div>
            </Modal>
        );
    }
}

ModalTestForm.propTypes = {
    id: PropTypes.string.isRequired,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    display: PropTypes.bool.isRequired,
    zIndex: PropTypes.number.isRequired,
    size: PropTypes.string.isRequired
};

