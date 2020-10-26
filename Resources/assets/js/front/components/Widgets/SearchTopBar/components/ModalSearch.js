import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../Modal';

export default class ModalSearch extends Component {

    constructor(props) {
        super(props);
    }

    handleCancel() {
        console.log("handleCancel :: ");
    }

    handleSubmit() {
        console.log("handleSubmit :: ");
    }

    // ==============================
    // Renderers
    // ==============================

    render() {
        return (
            <Modal
                id={this.props.id}
                title={this.props.title}
                display={this.props.display}
                zIndex={10000}
                onModalClose={this.props.onModalClose}
                onCancel={this.handleCancel.bind(this)}
                onSubmit={this.handleSubmit.bind(this)}
                size={'medium'}
                deleteButton={false}
                cancelButton={false}
            >
                <div className="row">
                    <div className="col-xs-12">
                        Número de contrat
                        122131254
                        122131254
                        Numéro de quittance
                        zy12213562
                        Numéro de sinistre
                    </div>
                </div>
            </Modal>
        );
    }
}

ModalSearch.propTypes = {
    id: PropTypes.string.isRequired,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    display: PropTypes.bool.isRequired,
    zIndex: PropTypes.number.isRequired,
    size: PropTypes.string.isRequired,

    onSubmit: PropTypes.func,
    onCancel: PropTypes.func
};

