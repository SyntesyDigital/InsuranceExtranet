import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default  class FieldListItem extends Component {

    constructor(props)
    {
        super(props);

        this.onRemoveField = this.onRemoveField.bind(this);
  	    this.onOpenSettings = this.onOpenSettings.bind(this);
    }

    onRemoveField(event) {
  		event.preventDefault();

  	}

  	onOpenSettings(event) {
  	    event.preventDefault();

    }
    
    renderIcons() {

      if(this.props.icons === undefined)
        return null;

      return this.props.icons.map((item,index) => 
        <i class={item} key={index}></i>
      );
    }

    render() {
        return (
          <div className="typology-field field-list-item">
            <div className="field-type">
              <i className={this.props.icon}></i> &nbsp;
    					{this.props.label}

              <div class="type-info">
                <span class="text-success">
                  {this.renderIcons()}
                </span>
              </div>

            </div>

            <div className="field-inputs">
              {this.props.children}
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
  icons: PropTypes.array
};
