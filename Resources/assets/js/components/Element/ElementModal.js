import React, {Component} from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux';

import BooleanSettingsField from './Settings/BooleanSettingsField';
import InputSettingsField from './Settings/InputSettingsField';
import CheckboxesSettingsField from './Settings/CheckboxesSettingsField';
import SelectorSettingsField from './Settings/SelectorSettingsField';
import RadioSettingsField from './Settings/RadioSettingsField';
import LinkSettingsField from './Settings/LinkSettingsField';
import FieldsSettings from './Settings/FieldsSettings';


import {
  closeModalSettings,
  onModalSettingsClosed,
  changeFieldSettings
} from './actions/';

class ElementModal extends Component {

  constructor(props) {
    super(props);

    this.handleFieldSettingsChange = this.handleFieldSettingsChange.bind(this);
    this.onModalClose = this.onModalClose.bind(this);


    this.state = {
      id : 'modal-element-settings',
      isOpen : false
    };

  }

  handleFieldSettingsChange(field) {
      this.props.changeFieldSettings(field);
  }

  onModalClose(e) {
    e.preventDefault();

    this.props.closeModalSettings();
  }

  componentWillReceiveProps(nextProps) {
      console.log("ElementModal :: ",nextProps);

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

      TweenMax.to($("#"+this.state.id), 0.5, {
          display: "none",
          opacity: 0,
          ease: Power2.easeInOut,
          onComplete: function() {
              self.setState({
                  isOpen : false
              });
              self.props.onModalSettingsClosed();
          }
      });
  }

  getFormatsList() {

    const field = this.props.app.settingsField;

    if(!field)
      return [];

    return MODELS_FIELDS[field.type].formats.map((item,index) => {
      return {name:Lang.get('fields.'+item),value:item};
    });

  }

  render() {

    const field = this.props.app.settingsField;

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
                      source="rules"
                      onFieldChange={this.handleFieldSettingsChange}
                      label="Champ obligatoire"
                    />

                    <SelectorSettingsField
                      field={field}
                      name="format"
                      source="settings"
                      onFieldChange={this.handleFieldSettingsChange}
                      label="Format"
                      options={this.getFormatsList()}
                    />

                    <BooleanSettingsField
                      field={field}
                      name="unique"
                      source="rules"
                      onFieldChange={this.handleFieldSettingsChange}
                      label="Champ unique"
                    />

                    <InputSettingsField
                      field={field}
                      name="minCharacters"
                      source="rules"
                      onFieldChange={this.handleFieldSettingsChange}
                      label="Caractères minimum"
                      inputLabel="Indique le nombre minimum de caractères"
                    />

                    <InputSettingsField
                      field={field}
                      name="maxCharacters"
                      source="rules"
                      onFieldChange={this.handleFieldSettingsChange}
                      label="Caractères maximum"
                      inputLabel="Indique le nombre maximum de caractères"
                    />

                    <InputSettingsField
                      field={field}
                      name="maxItems"
                      source="rules"
                      onFieldChange={this.handleFieldSettingsChange}
                      label="Nombre maximum d'éléments"
                      inputLabel="Indique le nombre maximum"
                    />


                    <InputSettingsField
                      field={field}
                      name="minItems"
                      source="rules"
                      onFieldChange={this.handleFieldSettingsChange}
                      label="Nombre minimum d'éléments"
                      inputLabel="Indiquez le nombre minimum"
                    />

                    <InputSettingsField
                      field={field}
                      name="fieldHeight"
                      source="settings"
                      onFieldChange={this.handleFieldSettingsChange}
                      label="Hauteur du champ"
                      inputLabel="Indique la hauteur en pixels"
                    />

                    <BooleanSettingsField
                      field={field}
                      name="searchable"
                      source="rules"
                      onFieldChange={this.handleFieldSettingsChange}
                      label="Recherche"
                    />

                    <BooleanSettingsField
                      field={field}
                      name="sortable"
                      source="rules"
                      onFieldChange={this.handleFieldSettingsChange}
                      label="Trie"
                    />

                    <SelectorSettingsField
                      field={field}
                      name="sortableByDefault"
                      source="rules"
                      onFieldChange={this.handleFieldSettingsChange}
                      label="Trié par défaut"
                      options={[
                          {
                              value: "ASC",
                              name: "Ascendant",
                          },
                          {
                              value: "DESC",
                              name: "Descendant",
                          }
                      ]}
                    />

                    <LinkSettingsField
                      field={field}
                      name="hasRoute"
                      source="settings"
                      onFieldChange={this.handleFieldSettingsChange}
                      label="Lien"
                    />

                    <FieldsSettings
                      field={field}
                      name="fields"
                      source="settings"
                      onFieldChange={this.handleFieldSettingsChange}
                      label="Liste des champs"
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
        display: state.app.modalSettingsDisplay,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeModalSettings: () => {
            return dispatch(closeModalSettings());
        },
        onModalSettingsClosed: () => {
            return dispatch(onModalSettingsClosed());
        },
        changeFieldSettings: (field) => {
            return dispatch(changeFieldSettings(field))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ElementModal);
