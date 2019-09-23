import React, {Component} from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import update from 'immutability-helper'

import FieldTypes from './FieldTypes'
import ElementField from './ElementField'

const fieldTarget = {
	drop(props, monitor, component) {

		const item = monitor.getItem();

		component.addField(item);

		return { name: 'Dustbin' }
	},
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
  	isOver: monitor.isOver(),
  	canDrop: monitor.canDrop()
  };
}

class ElementDropZone extends Component {

	constructor(props){
    super(props);

		this.moveField = this.moveField.bind(this);
		this.handleRemoveField = this.handleRemoveField.bind(this);
		this.handleFieldChange = this.handleFieldChange.bind(this);
		this.handleOpenSettings = this.handleOpenSettings.bind(this);

		this.ini
	}

	getMaxId() {
		const fields = this.props.fields;

		var maxId = 1;

		for(var key in fields){
			maxId = Math.max(fields[key].id,maxId);
		}

		return maxId;
	}

	exploteToObject(fields) {

		if(fields == null){
			return null;
		}

		var result = {};

		for(var i=0;i<fields.length;i++){
			if((fields[i] != 'searchable' &&  fields[i] != 'sortable') || this.props.elementType == 'table'){
				result[fields[i]] = null;
			}
		}
		return result;
	}

	addField(field) {

		//console.log("add field =>",field);

		if(field.added){
			toastr.error('Not possible to add same field twice');
			return;
		}

		var settings = this.exploteToObject(field.settings);
		var rules = this.exploteToObject(field.rules);

		if(field.fields != null){
			settings.fields = field.fields;
		}

		if(rules['required'] !== undefined){
			rules['required'] = field.required;
		}

		var field = {
			id : this.getMaxId() + 1,
			type : field.type,
			name : field.name,
			identifier : field.identifier,
			icon : field.icon,
			saved : false,
			editable : true,
			rules : rules,
			boby : field.boby,
			settings : settings,
		};

		this.props.onFieldAdded(field);
	}

	moveField(dragIndex, hoverIndex) {
		this.props.moveField(dragIndex,hoverIndex);
	}

	handleRemoveField(fieldId) {

		this.props.onRemoveField(fieldId);

	}

	handleFieldChange(field) {
		this.props.onFieldChanged(field);

	}

	handleOpenSettings(fieldId) {
		this.props.onOpenSettings(fieldId);
	}

	renderFields() {
		const fields = this.props.fields;


		console.log("fields => ",fields);

		return (
			fields.map((item, i) => (
				<ElementField
					created={this.props.created}
					saved={item.saved}
					editable={item.editable}
					key={item.id}
					index={i}
					id={item.id}
					type={item.type}
					name={item.name}
					icon={item.icon}
					settings={item.settings}
					rules={item.rules}
					identifier={item.identifier}
					moveField={this.moveField}
					onRemoveField={this.handleRemoveField}
					onFieldChange={this.handleFieldChange}
					onOpenSettings={this.handleOpenSettings}
				/>
			))
		);


	}

  render() {

    const { canDrop, isOver, connectDropTarget } = this.props
		const isActive = canDrop && isOver

    let className = '';
	if (isActive) {
		className += 'is-active';
	} else if (canDrop) {
		className += 'can-drop';
	}

	if(this.props.errors.fields) {
		className += ' error';
	}

    return connectDropTarget(
			<div className={"fields-list-container " + className}>

				{this.renderFields()}

				<div className="separator"></div>

				<div className="list-container-content-wrapper">
					<div className="list-container-content">
	          {Lang.get('fields.drag_fields')}
	        </div>
				</div>
      </div>
		);
  }

}

ElementDropZone.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
};

export default DropTarget(FieldTypes.FIELD, fieldTarget, collect)(ElementDropZone);
