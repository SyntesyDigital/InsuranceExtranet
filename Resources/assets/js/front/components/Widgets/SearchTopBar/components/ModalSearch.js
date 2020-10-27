import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../Modal';
import './ModalSearch.scss';

export default class ModalSearch extends Component {

    constructor(props) {
        super(props);
    }

    handleChange(name, value) {
        console.log("handleChange :: ", evt.target.name, evt.target.value);
    }
    handleCancel() {
        console.log("handleCancel :: ");
    }

    handleSubmit() {
        console.log("handleSubmit :: ");
    }

    handleFocus() {
        console.log("handleFocus :: ");
    }

    handleOnChange(e) {
        console.log("this.props.valueSearch" , this.props.dataFromParent);
    }


    // ==============================
    // Renderers
    // ==============================

    render() {
        console.log(this.props.valueSearch)
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
                submitButton={false}
            >
                <label>
                    <input
                        type="text"
                        name="search"
                        value={this.props.valueSearch}
                        onChange={this.handleOnChange.bind(this)}
                        placeholder="Recherche"
                    />
                </label>
                <div className="col-xs-12 results">
                    <div className="row-result">
                        <h3>Numéro de contrat</h3>
                        <span>122131254</span>
                        <span>122131254</span>
                    </div>
                    <div className="row-result">
                        <h3>Numéro de contrat</h3>
                        <span>122131254</span>
                        <span>122131254</span>
                    </div>
                    <div className="row-result">
                        <h3>Numéro de contrat</h3>
                        <span>122131254</span>
                        <span>122131254</span>
                    </div>
                    <div className="row-result">
                        <h3>Numéro de contrat</h3>
                        <span>122131254</span>
                        <span>122131254</span>
                    </div>
                    <div className="row-result">
                        <h3>Numéro de contrat</h3>
                        <span>122131254</span>
                        <span>122131254</span>
                    </div>
                    <div className="row-result">
                        <h3>Numéro de contrat</h3>
                        <span>122131254</span>
                        <span>122131254</span>
                    </div>
                    <div className="row-result">
                        <h3>Numéro de contrat</h3>
                        <span>122131254</span>
                        <span>122131254</span>
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
    value: PropTypes.string.isRequired,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    valueSearch: PropTypes.string.isRequired,
};

