import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'

import {DROP_FIELD} from './../constants';

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

class EmptyItem extends Component {

  constructor(props){
    super(props);

  }

  exploteToObject(fields) {

    if(fields == null){
      return null;
    }

    if(typeof fields === 'object'){
      //already processed
      return fields;
    }

    var result = {};

    for(var i=0;i<fields.length;i++){
      result[fields[i]] = null;
    }
    return result;
  }

  addField(field) {

    console.log("EmptyItem :: add field (field) :: ",field);
    
    if(field.added){
			toastr.error('Not possible to add same field twice');
			return;
		}

    var newField = JSON.parse(JSON.stringify(field));

    newField.rules = this.exploteToObject(newField.rules);
    newField.settings = this.exploteToObject(newField.settings);

    this.props.onFieldAdded(newField);
    
	}

  onSelectItem(e) {
    e.preventDefault();

    //console.log("EmptyItem :: onSelectItem : "+this.props.index);

    this.props.onSelectItem(this.props.pathToIndex);
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

    return connectDropTarget(
      <div className={"row empty-item "+ className}>
          <a href="" className="btn btn-link" onClick={this.onSelectItem.bind(this)}>
            <i className="fa fa-plus"></i>
          </a>
      </div>
    );
  }

}

EmptyItem.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
};

export default DropTarget(DROP_FIELD, fieldTarget, collect)(EmptyItem);
