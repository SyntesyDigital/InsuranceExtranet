import React, {Component} from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux';

import {customFieldChange} from './../actions/';

class IconField extends Component
{
  constructor(props)
  {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }


  handleOnChange(event)
  {
    this.props.onFieldChange({
      identifier : this.props.field.identifier,
      value : event.target.value
    });

  }

  renderInputs()
  {

    const errors = this.props.app.errors[this.props.field.identifier];
    var error = errors ? true : false;
    var value = this.props.field.value && this.props.field.value ? this.props.field.value : '';

    return (
      <div className={'form-group bmd-form-group ' + (error ? 'has-error' : null)} >
          <label htmlFor={this.props.field.identifier} className="bmd-label-floating">{this.props.field.name}</label>
          <input type="text" className="form-control"  name="name" value={value} onChange={this.handleOnChange} />
      </div>
    );
  }


  render() {

    const hideTab = this.props.hideTab !== undefined && this.props.hideTab == true ? true : false;

    return (
      <div className="field-item">
        <button style={{display:(hideTab ? 'none' : 'block')}} id={"heading"+this.props.field.identifier} className="btn btn-link" data-toggle="collapse" data-target={"#collapse"+this.props.field.identifier} aria-expanded="true" aria-controls={"collapse"+this.props.field.identifier}>
          <span className="field-type">
            <i className={"fa " + ELEMENT_TEMPLATE_FIELDS.ICON.icon}></i> {ELEMENT_TEMPLATE_FIELDS.ICON.name}
          </span>
          <span className="field-name">
            {this.props.field.name}
          </span>
        </button>

        <div id={"collapse"+this.props.field.identifier} className="collapse in" aria-labelledby={"heading"+this.props.field.identifier} aria-expanded="true" aria-controls={"collapse"+this.props.field.identifier}>
          <div className="field-form">
            {this.renderInputs()}
          </div>
        </div>

      </div>
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
        customFieldChange: (field) => {
            return dispatch(customFieldChange(field));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IconField);
