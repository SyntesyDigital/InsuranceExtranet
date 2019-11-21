import React, {Component} from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux';

import {submitForm} from './actions/';

class ElementBar extends Component {

  constructor(props){
    super(props);

  }

  goBack(e)
  {
      e.preventDefault();
      window.history.back();
  }

  onSubmitForm(e) {

    e.preventDefault();

    this.props.submitForm(this.getFormData());
  }

  getFormData() {

     return {
         elementId : this.props.app.element != null && this.props.app.element.id !== undefined ? this.props.app.element.id : null,
         name : this.props.app.inputs.name,
         identifier : this.props.app.inputs.identifier,
         fields : this.props.app.fields,
         icon : this.props.app.inputs.icon.value ? this.props.app.inputs.icon.value : null,
         wsModelIdentifier :  this.props.app.wsModelIdentifier ? this.props.app.wsModelIdentifier : null,
         wsModel :  this.props.app.wsModel ? this.props.app.wsModel : null,
         wsModelFormat :  this.props.app.wsModelFormat ? this.props.app.wsModelFormat : null,
         wsModelExemple :  this.props.app.wsModelExemple ? this.props.app.wsModelExemple : null,
         elementType :  this.props.app.elementType ? this.props.app.elementType : null,
         parameters :  this.props.app.parameters ? this.props.app.parameters : null,

     };

  }

  render() {

    return (
      <div className="page-bar">
        <div className="container">
          <div className="row">

            <div className="col-md-12">
              <a href={routes['elements']} className="btn btn-default"> <i className="fa fa-angle-left"></i> </a>
              <h1>
                {this.props.app.inputs.icon != "" &&
                  <i className={this.props.app.inputs.icon.value}></i>
                }

                {'\u00A0'}

                { this.props.app.inputs.name != "" ? this.props.app.inputs.name : "Nouveau élément" }
              </h1>

              <div className="float-buttons pull-right">
                <a href="" className="btn btn-primary" onClick={this.onSubmitForm.bind(this)}> <i className="fa fa-cloud-upload"></i> &nbsp; {Lang.get('fields.save')} </a>
              </div>

            </div>
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
        submitForm : (data) => {
            return dispatch(submitForm(data));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ElementBar);
