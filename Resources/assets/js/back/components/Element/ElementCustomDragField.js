import React, {Component} from 'react';
import { render } from 'react-dom';

import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import FieldTypes from './FieldTypes';

const fieldSource = {
	beginDrag(props) {

		//get unique indentifier
		var timestamp = Math.floor(Date.now() / 1000);

		return {
			name: props.definition.name,
			type: props.definition.type,
			icon: props.definition.icon,
			identifier: props.definition.identifier+'_'+timestamp,
			added: false,
			formats : props.definition.formats,
			rules: props.definition.rules,
			settings: props.definition.settings,
			boby : null,
			required : false,
			fields : null
		}
	},

	endDrag(props, monitor) {
		const item = monitor.getItem()
		const dropResult = monitor.getDropResult()

		if (dropResult) {
			//console.log(`You dropped ${item.identifier}!`);
		}
	},
}

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}
}

class ElementCustomDragField extends Component {
	render() {
		const { isDragging, connectDragSource, definition } = this.props
		const opacity = isDragging ? 0.4 : 1

		return connectDragSource(
			<div className="field" style={{ opacity }}>
				<i className={"fa "+this.props.definition.icon}></i> &nbsp;
				{this.props.definition.name} &nbsp;
			</div>
		)
	}
}

ElementCustomDragField.propTypes = {
	connectDragSource: PropTypes.func.isRequired,
	isDragging: PropTypes.bool.isRequired,
	//input: PropTypes.string.isRequired,
	//label : PropTypes.string.isRequired,
	//icon : PropTypes.string.isRequired,
};

export default DragSource(FieldTypes.FIELD, fieldSource, collect)(ElementCustomDragField);
