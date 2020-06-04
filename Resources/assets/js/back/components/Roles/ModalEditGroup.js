import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Layout/Modal';
import InputField from '../Layout/Fields/InputField';
import { connect } from 'react-redux';

import {
    cancelEditGroup,
    saveGroup,
    removeGroup,
} from './actions';

class ModalEditGroup extends Component {

    constructor(props) {

        super(props);

        this.state = {
            id : null,
            name : '',
            identifier : '',
            order : 0
        };

    }

    /*
    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.group != null && prevState.id != nextProps.group.id) {
            return nextProps.group;
        }
        
        return null;
      }
    */

    componentDidUpdate(prevProps,prevState) {
        if(!prevProps.form.displayGroup && this.props.form.displayGroup) {
            //modal is showing 
            this.setState(this.props.group != null ? this.props.group : {
                id : null,
                name : '',
                identifier : '',
                order : 0
            });
        }
    }

    // ==============================
    // Handlers
    // ==============================

    handleFieldChange(name,value) {
        const state = this.state;
        state[name] = value;
        this.setState(state);
    }

    handleSubmit() {
        this.props.saveGroup(this.state);
    }

    handleCancel() {
        console.log("handleCancel Group");
        this.props.cancelEditGroup();
    }

    handleRemove() {
        console.log("handleRemove Group");
        this.props.removeGroup(this.state);
    }

    
    // ==============================
    // Renderers
    // ==============================

    render() {

        const { displayGroup } = this.props.form;

        return (
            <Modal
                id={this.props.id}
                icon={this.props.icon}
                title={this.props.title}
                display={displayGroup}
                zIndex={10000}
                onModalClose={this.props.cancelEditGroup}
                onCancel={this.props.cancelEditGroup}
                onRemove={this.handleRemove.bind(this)}
                onSubmit={this.handleSubmit.bind(this)}
                size={this.props.size}
            >
                
                <div className="row">
                    <div className="col-xs-12">

                        <InputField
                            label={'Name'}
                            name={'name'}
                            value={this.state.name}
                            onChange={this.handleFieldChange.bind(this)}
                        />

                        <InputField
                            label="Identifier"
                            name={'identifier'}
                            value={this.state.identifier}
                            onChange={this.handleFieldChange.bind(this)}
                        />
                        
                    </div>
                </div>
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
        saveGroup: (group) => {
            return dispatch(saveGroup(group));
        },
        removeGroup: (group) => {
            return dispatch(removeGroup(group));
        },
        cancelEditGroup: () => {
            return dispatch(cancelEditGroup());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditGroup);

ModalEditGroup.propTypes = {
    id: PropTypes.string.isRequired,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    display: PropTypes.bool.isRequired,
    zIndex: PropTypes.number.isRequired,
    group: PropTypes.object,

    onSubmit: PropTypes.func,
    onRemove: PropTypes.func,
    onCancel: PropTypes.func
};
