import React, {Component} from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux';

import BooleanSettingsField from './../Settings/BooleanSettingsField';
import SelectorSettingsField from './../Settings/SelectorSettingsField';

import {
  closeElementParametersSettings,
  onElementParametersClosed,
  changeElementParametersSettings
} from './../actions/';

class ElementParametersModal extends Component {

  constructor(props) {
    super(props);

    this.handleFieldSettingsChange = this.handleFieldSettingsChange.bind(this);
    this.onModalClose = this.onModalClose.bind(this);


    this.state = {
      id : 'element-parameters-modal',
      isOpen : false
    };

  }

  handleFieldSettingsChange(field) {
      console.log("handleFieldSettingsChange :: ",field);

      const parameter = this.props.elementParameters.field;

      parameter.settings[field.name] = field.value;

      this.props.changeFieldSettings(parameter);
  }

  onModalClose(e) {
    e.preventDefault();

    this.props.closeElementParametersSettings();
  }

  componentWillReceiveProps(nextProps) {
      console.log("ElementParametersModal :: ",nextProps);

      if(nextProps.display != this.state.isOpen){
          if(nextProps.display){
            this.openModal();
          }
          else {
            this.closeModal();
          }
      }
  }

  openModal() {
      $("#"+this.state.id).css({
          display: "block"
      });
      TweenMax.to($("#"+this.state.id), 0.5, {
          opacity: 1,
          ease: Power2.easeInOut
      });
      this.setState({
          isOpen : true
      });

  }

  closeModal() {
      var self = this;

      console.log("ElementParametersModal :: closeModal");

      TweenMax.to($("#"+this.state.id), 0.5, {
          display: "none",
          opacity: 0,
          ease: Power2.easeInOut,
          onComplete: function() {
              self.setState({
                  isOpen : false
              });
              self.props.onElementParametersClosed();
          }
      });
  }


  getParameterTypes() {

    return PARAMETERS.types.map((item,index) => {
      return {
          value: item,
          name: item,
      };
    });
  }

  render() {

    const field = this.props.elementParameters.field;

    console.log("ElementParameterModal :: field ",field);

    return (
      <div className="custom-modal" id={this.state.id}>
        <div className="modal-background"></div>
          <div className="modal-container">
            {field != null &&
              <div className="modal-header">

                  <i className={"fa "+field.icon}></i>
                  <h2>{field.name} | {Lang.get('header.configuration')}</h2>

                <div className="modal-buttons">
                  <a className="btn btn-default close-button-modal" onClick={this.onModalClose}>
                    <i className="fa fa-times"></i>
                  </a>
                </div>
              </div>
            }
            <div className="modal-content">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">

                    <BooleanSettingsField
                      field={field}
                      name="required"
                      source="settings"
                      onFieldChange={this.handleFieldSettingsChange}
                      label="Paramètre obligatoire"
                    />

                    <SelectorSettingsField
                      field={field}
                      name="type"
                      source="settings"
                      onFieldChange={this.handleFieldSettingsChange}
                      label="Paramètre type"
                      options={this.getParameterTypes()}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <a href="" className="btn btn-default" onClick={this.onModalClose}> Fermer </a> &nbsp;
              </div>

            </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
    return {
        app: state.app,
        elementParameters: state.elementParameters,
        display: state.elementParameters.display,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeElementParametersSettings: () => {
            return dispatch(closeElementParametersSettings());
        },
        onElementParametersClosed: () => {
            return dispatch(onElementParametersClosed());
        },
        changeFieldSettings: (field) => {
            return dispatch(changeElementParametersSettings(field))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ElementParametersModal);
