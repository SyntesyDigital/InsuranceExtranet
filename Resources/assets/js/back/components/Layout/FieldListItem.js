import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default  class FieldListItem extends Component {

    constructor(props)
    {
        super(props);

        this.onRemoveField = this.onRemoveField.bind(this);
  	    this.handleChange = this.handleChange.bind(this);
  	    this.onOpenSettings = this.onOpenSettings.bind(this);
    }

    onRemoveField(event) {
  		event.preventDefault();

  	}

  	onOpenSettings(event) {
  	    event.preventDefault();

  	}

  	handleChange(event){
      event.preventDefault();
  	}

  	handleIdentifierChange(value) {

  	}

    render() {
        return (
          <div className="typology-field">
            <div className="field-type">
              <i className={this.props.icon}></i> &nbsp;
    					{this.props.label}
            </div>

            <div className="field-inputs">
              <div className="row">
                <div className="field-name col-xs-6">
                  <input type="text" className="form-control" name="name" placeholder="Nom" value={this.props.name} onChange={this.handleChange}/>
                </div>
    						<div className="field-name col-xs-6">
    							<input disabled type="text" className="form-control" name="identifier" placeholder="Idenfiticador" value={this.props.identifier} onChange={this.handleChange} />
    						</div>

              </div>
            </div>

            <div className="field-actions text-right" style={{
    					paddingRight : '15px'
    				}}>

    					<a href="" onClick={this.onOpenSettings}>
                <i className="fas fa-pencil-alt"></i> {Lang.get('header.configuration')}
              </a>
    					<a href="" className="remove-field-btn" onClick={this.onRemoveField}>
                &nbsp;&nbsp;
                <i className="fa fa-trash"></i> {Lang.get('fields.delete')}
              </a>

            </div>
          </div>
        );
    }
}

FieldListItem.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  identifier: PropTypes.string.isRequired,
};
