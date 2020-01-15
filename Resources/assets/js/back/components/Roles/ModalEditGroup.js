import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Layout/Modal';
import InputField from '../Layout/Fields/InputField';

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
                size={this.props.size}       
            >
                <div className="row">
                    <div className="col-xs-12">
                        <InputField 
                            label={'Name'}
                            name={'name'}
                        />
                        <InputField 
                            label="Identifier"
                            name={'identifier'}
                        />
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
