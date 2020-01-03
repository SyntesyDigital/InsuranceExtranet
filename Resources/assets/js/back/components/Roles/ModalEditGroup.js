import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Modal from '../Layout/Modal';

export default class ModalEditGroup extends Component {

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
                title={this.props.title}
                display={this.props.display}
                zIndex={10000}
                onModalClose={this.props.onModalClose}            
            >
                <div className="row">
                    <div className="col-xs-8 col-xs-offset-2">
                        <div className={"form-group bmd-form-group"}>
                            <label className="bmd-label-floating">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name={'name-group'}
                                placeholder={''}
                            />
                            <label className="bmd-label-floating">
                                Identifier
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name={'identifier-group'}
                                placeholder={''}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
            
      );
    }
}

ModalEditGroup.propTypes = {
    id: PropTypes.string.isRequired,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    display: PropTypes.bool.isRequired,
    zIndex: PropTypes.number.isRequired
};
