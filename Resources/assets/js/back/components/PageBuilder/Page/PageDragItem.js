import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import {DRAG_FIELD} from './../constants';

const fieldSource = {
	beginDrag(props) {
    
    console.log("PageDragItem :: beginDrag :: (props)", props);
    var definition = props.definition.field;
    definition.pathToIndex = props.pathToIndex;

    console.log("PageDragItem :: beginDrag :: (field) ",definition);

		return definition;
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

class PageDragItem extends Component {

  handleClick(e) {
    e.preventDefault();

    if(this.props.editable){
      this.props.onEditItem();
    }
  }

	render() {
		const { isDragging, connectDragSource } = this.props
		const opacity = isDragging ? 0.4 : 1

		return connectDragSource(
      <div className="item-content"
        style={{opacity}} 
        onClick={this.handleClick.bind(this)}
      >
        {this.props.children}
      </div>
		)
	}
}

PageDragItem.propTypes = {
	connectDragSource: PropTypes.func.isRequired,
	isDragging: PropTypes.bool.isRequired,
};

export default DragSource(DRAG_FIELD, fieldSource, collect)(PageDragItem);
