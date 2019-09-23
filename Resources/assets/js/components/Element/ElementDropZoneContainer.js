import React, {Component} from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux';

import {
	addField, removeField, moveField, changeField,
	openModalSettings
} from './actions/';

import ElementDropZone from './ElementDropZone';


class ElementDropZoneContainer extends Component {

	constructor(props){
    super(props);

	}

	moveField(dragIndex, hoverIndex) {
		this.props.moveField(dragIndex,hoverIndex);
	}

	handleRemoveField(fieldId) {
		this.props.removeField(fieldId);
	}

	handleOpenSettings(fieldId) {
		this.props.onOpenSettings(fieldId);
	}

	handleFieldAdded(field) {
		this.props.addField(field);
  }

	handleFieldChange(field) {
		this.props.changeField(field);
	}

  render() {

		return (
			<ElementDropZone
				errors={this.props.app.errors}
				created={this.props.app.model !== undefined && this.props.app.model != null}
				fields={this.props.app.fields}
				elementType={this.props.app.elementType}
				onFieldAdded={this.handleFieldAdded.bind(this)}
				onFieldChanged={this.handleFieldChange.bind(this)}
				moveField={this.moveField.bind(this)}
				onRemoveField={this.handleRemoveField.bind(this)}
				onOpenSettings={this.handleOpenSettings.bind(this)}

				//onSettingsFieldChange={this.handleSettingsChanged}

			/>
		);

  }

}


const mapStateToProps = state => {
    return {
        app: state.app
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addField : (field) => {
						return dispatch(addField(field));
				},
				changeField : (field) => {
						return dispatch(changeField(field));
				},
				removeField : (fieldId) => {
						return dispatch(removeField(fieldId));
				},
				moveField : (dragIndex, hoverIndex) => {
						return dispatch(moveField(dragIndex, hoverIndex));
				},
				onOpenSettings : (fieldId) => {
						return dispatch(openModalSettings(fieldId));
				}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ElementDropZoneContainer);
