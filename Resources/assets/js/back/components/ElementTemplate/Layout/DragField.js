import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import {DRAG_FIELD} from './../constants';

const fieldSource = {
	beginDrag(props) {

		return props.definition;
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

class DragField extends Component {
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

DragField.propTypes = {
	connectDragSource: PropTypes.func.isRequired,
	isDragging: PropTypes.bool.isRequired,
	label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
};

export default DragSource(DRAG_FIELD, fieldSource, collect)(DragField);
