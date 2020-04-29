import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Layout/Modal';

export default class ModalResultImport extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <Modal
                id={this.props.id}
                icon={this.props.icon}
                title={'Resultado de la importación'}
                display={this.props.display}
                zIndex={10000}
                size={this.props.size}
                onModalClose={this.props.onModalClose}
                onCancel={this.props.onCancel}
            >
                <div className="row rightbar-page">
                    <div className="col-md-4 col-xs-12 field-col">
                        Se han importado : 
                        - 4 Elementos 
                        - 5 Modelos Satisfactoriamente. 
                        Items no importados por repetición : 
                        - 3 Elementos 
                        - 2 parámetros
                    </div>
                </div>
            </Modal>
        );
    }
}

ModalResultImport.propTypes = {
    id: PropTypes.string.isRequired,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    display: PropTypes.bool.isRequired,
    zIndex: PropTypes.number.isRequired,
    size: PropTypes.string.isRequired,
    onCloseModal: PropTypes.func,
    onCancel: PropTypes.func,
};

