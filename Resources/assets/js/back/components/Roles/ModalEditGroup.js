import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Layout/Modal';
import InputField from '../Layout/Fields/InputField';

import {connect} from 'react-redux';

import {
    closeModalEditGroup
} from './actions';

class ModalEditGroup extends Component {

    constructor(props) {
        
        super(props);

        this.state = {

        };

    }
    
    
    render() {

        const {currentGroup,displayGroup} = this.props.form;

        return (
            <Modal
                id={this.props.id}
                icon={this.props.icon}
                title={this.props.title}
                display={displayGroup}
                zIndex={10000}
                onModalClose={this.props.closeModalEditGroup}     
                size={this.props.size}       
                submitButton={false}
            >
                {currentGroup != null && 
                    <div className="row">
                        <div className="col-xs-12">
                            <InputField 
                                label={'Name'}
                                name={'name'}
                                value={currentGroup.name}
                                onChange={this.props.onFieldChange}
                            />
                            <InputField 
                                label="Identifier"
                                name={'identifier'}
                                value={currentGroup.identifier}
                                onChange={this.props.onFieldChange}
                            />
                        </div>
                    </div>
                }
            </Modal>
            
      );
    }
}

const mapStateToProps = state => {
    return {
        form: state.form
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeModalEditGroup : () => {
            return dispatch(closeModalEditGroup());
        }
      /* 
      openModalEditGroup : (group) => {
        return dispatch(openModalEditGroup(group));
      }
      */
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalEditGroup);

ModalEditGroup.propTypes = {
    id: PropTypes.string.isRequired,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    display: PropTypes.bool.isRequired,
    zIndex: PropTypes.number.isRequired,
    group : PropTypes.object
};
