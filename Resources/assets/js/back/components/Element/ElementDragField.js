import React, {Component} from 'react';
import { render } from 'react-dom';

import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import FieldTypes from './FieldTypes';

const fieldSource = {
	beginDrag(props) {

		return {
			name: props.definition.name,
			type: props.definition.type,
			icon: props.definition.icon,
			identifier: props.definition.identifier,
			added: props.definition.added,
			formats : props.definition.formats,
			rules: props.definition.rules,
			settings: props.definition.settings,
			boby : props.definition.boby,
			required : props.definition.required,
			fields : props.definition.fields !== undefined ?
				props.definition.fields : null
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

class ElementDragField extends Component {
	render() {
		const { isDragging, connectDragSource, definition } = this.props
		const opacity = isDragging || definition.added ? 0.4 : 1

		return connectDragSource(
			<div className="field" style={{ opacity }}>
				<i className={"fa "+this.props.definition.icon}></i> &nbsp;
				{Lang.get(this.props.definition.name)} &nbsp;
				{this.props.definition.required &&
					<span className="required">*</span>
				}
			</div>
		)
	}
}

ElementDragField.propTypes = {
	connectDragSource: PropTypes.func.isRequired,
	isDragging: PropTypes.bool.isRequired,
	//input: PropTypes.string.isRequired,
	//label : PropTypes.string.isRequired,
	//icon : PropTypes.string.isRequired,
};

export default DragSource(FieldTypes.FIELD, fieldSource, collect)(ElementDragField);
