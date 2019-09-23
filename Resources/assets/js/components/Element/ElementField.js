import React, {Component} from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import FieldTypes from './FieldTypes';
import flow from 'lodash/flow';

//import SlugInput from '../common/SlugInput';

const style = {
	cursor: 'move',
}

const fieldSource = {
	beginDrag(props) {
		return {
			id: props.id,
			index: props.index,
		}
	},
}

const fieldTarget = {
	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index
		const hoverIndex = props.index

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return
		}

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

		// Determine mouse position
		const clientOffset = monitor.getClientOffset()

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return
		}

		// Time to actually perform the action
		props.moveField(dragIndex, hoverIndex)

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex
	},
}

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
	  isDragging: monitor.isDragging(),
  };
}

class ElementField extends Component {

	constructor(props) {
	    super(props);

				this.state = {
            name : props.name,
						identifier : props.identifier
        };

	    this.onRemoveField = this.onRemoveField.bind(this);
	    this.handleChange = this.handleChange.bind(this);
	    this.onOpenSettings = this.onOpenSettings.bind(this);
	}

	componentWillReceiveProps(nextProps) {

    //console.log("ElementField ::will recieve props : =>",nextProps);
	}

	onRemoveField(event) {

		event.preventDefault();
		var self = this;

		bootbox.confirm({
				message: Lang.get('fields.sure'),
				buttons: {
						confirm: {
								label: Lang.get('fields.si'),
								className: 'btn-primary'
						},
						cancel: {
								label: Lang.get('fields.no'),
								className: 'btn-default'
						}
				},
				callback: function (result) {
					if(result){
						self.props.onRemoveField(self.props.id);
					}
				}
		});



	}

	onOpenSettings(event) {
	    event.preventDefault();
	    this.props.onOpenSettings(this.props.id);
	}

	handleChange(event)
	{

		var identifier = this.state.identifier;
		var name = event.target.value;

		this.setState({
			name : name,
			identifier : identifier
		});

    var field = {
      id: this.props.id,
			name : name,
			identifier : identifier
    };

	  this.props.onFieldChange(field);

	}

	handleIdentifierChange(value) {

		var identifier = value;
		var name = this.state.name;

		this.setState({
			name : name,
			identifier : identifier
		});

    var field = {
      id: this.props.id,
			name : name,
			identifier : identifier
    };

		//console.log("ElementField :: handleIdentifierChange => ",field);

	  this.props.onFieldChange(field);

	}

	isValid() {

		console.log("isValid => ",this.props.settings);

		if(this.props.settings.hasRoute != null ){
			var hasRoute = this.props.settings.hasRoute;
			if(hasRoute.params != undefined && hasRoute.params != null){
				if(hasRoute.params != null && hasRoute.params.length > 0){
		        for(var key in hasRoute.params){
		            if(hasRoute.params[key].value == ""){
		              return false;
		            }
		        }
		    }
			}
		}

		return true;
	}

	getConfiguration() {
			var configured = false;
			var required = false;
			var hasRoute = false;

			if(this.props.rules != null){
				for(var key in this.props.rules){
					if(this.props.rules[key] != null && this.props.rules[key] != false){
						configured = true;
						if(key == "required" && this.props.rules[key])
							required = true;
					}
				}
			}

			if(this.props.settings != null){
				for(var key in this.props.settings){
					if(this.props.settings[key] != null && this.props.settings[key] != false){
						configured = true;
						if(key == "hasRoute"){
							hasRoute = true;
						}
					}
				}
			}

			return {
				configured : configured,
				required : required,
				hasRoute : hasRoute
			}
	}

  render() {

		//console.log("is editable => ",this.props.editable);

		var configuration = this.getConfiguration();


		var isEntryTitle = false;
		if(this.props.settings != null &&
			this.props.settings.entryTitle !== undefined &&
			this.props.settings.entryTitle
		){
			isEntryTitle = true;
		}




	//const valid = this.isValid();

	const {
		isDragging,
		connectDragSource,
		connectDropTarget,
	} = this.props
	const opacity = isDragging ? 0 : 1

    return connectDragSource(
			connectDropTarget(

      <div className="typology-field" style={{ ...style, opacity }}>
        <div className={"field-type "}>
          <i className={"fa "+this.props.icon}></i> &nbsp;
					{MODELS_FIELDS[this.props.type] !== undefined ? MODELS_FIELDS[this.props.type].label : ''}

					<div className="type-info">

						{configuration.hasRoute &&
							<span className="text-success">
								<i class="fas fa-link"></i>
							</span>
						}

						{configuration.configured &&
							<span className="text-success">
								<i className="fas fa-cog"></i>
							</span>
						}


						{/*
						{!valid &&

						}
						{valid &&
							<span className="text-success">
								<i className="fas fa-check"></i>
							</span>
						}
						*/}
					</div>

        </div>

        <div className="field-inputs">
          <div className="row">
            <div className="field-name col-xs-6">
              <input type="text" className="form-control" name="name" placeholder="Nom" value={this.state.name} onChange={this.handleChange}/>
            </div>
						<div className="field-name col-xs-6">
							<input disabled type="text" className="form-control" name="identifier" placeholder="Idenfiticador" value={this.state.identifier} onChange={this.handleChange}/>
						</div>

          </div>
        </div>

        <div className="field-actions">

					<a href="" onClick={this.onOpenSettings}> <i className="fas fa-pencil-alt"></i> {Lang.get('header.configuration')}</a> &nbsp;&nbsp;
					<a href="" className="remove-field-btn" onClick={this.onRemoveField}> <i className="fa fa-trash"></i> {Lang.get('fields.delete')} </a>
					&nbsp;&nbsp;

        </div>
      </div>),
    );
  }

}

ElementField.propTypes = {
	connectDragSource: PropTypes.func.isRequired,
	connectDropTarget: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
	isDragging: PropTypes.bool.isRequired,
	id: PropTypes.any.isRequired,
	type: PropTypes.string.isRequired,
	//label : PropTypes.string.isRequired,
	//input : PropTypes.string.isRequired,
	moveField: PropTypes.func.isRequired,
};

export default flow(
  DragSource(FieldTypes.SORT_FIELD, fieldSource, collectSource),
  DropTarget(FieldTypes.SORT_FIELD, fieldTarget, collectTarget)
)(ElementField);
