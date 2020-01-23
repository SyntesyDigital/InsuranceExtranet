import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Layout/Modal';
import InputField from '../Layout/Fields/InputField';
import { connect } from 'react-redux';

import {
    cancelEditGroup,
    updateGroup,
    saveGroup,
    removeGroup,


} from './actions';

class ModalEditGroup extends Component {

    constructor(props) {

        super(props);

        this.state = {

        };

    }

    // ==============================
    // Handlers
    // ==============================

    // handleSubmit() {
    //     console.log("handleSubmit");
    //     this.props.saveGroup(this.props.form.currentGroup);
    // }

    handleCancel() {
        console.log("handleCancel Group");
        this.props.cancelEditGroup();
    }

    handleRemove() {
        console.log("handleRemove Group");
        this.props.removeGroup(this.props.form.currentGroup);
    }

    
    // ==============================
    // Renderers
    // ==============================

    render() {

        const { currentGroup, displayGroup } = this.props.form;

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
                // onSubmit={this.handleSubmit.bind(this)}
                size={this.props.size}
            >
                {currentGroup != null &&
                    <div className="row">
                        <div className="col-xs-12">
                            <InputField
                                label={'Name'}
                                name={'name'}
                                value={currentGroup.name}
                                onChange={this.props.updateGroup}
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
        cancelEditGroup: () => {
            return dispatch(cancelEditGroup());
        },
        updateGroup: (name, value) => {
            return dispatch(updateGroup(name, value));
        },
        removeGroup: (currentGroup) => {
            return dispatch(removeGroup(currentGroup));
        },
        // saveGroup: (currentGroup) => {
        //     return dispatch(saveGroup(currentGroup));
        // },
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
