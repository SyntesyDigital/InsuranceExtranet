import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import {
  cancelSettings,
  changeFieldSettings
} from './../actions/';

import InputSettingsField from './../Settings/InputSettingsField';
import BooleanSettingsField from './../Settings/BooleanSettingsField';
import SelectorSettingsField from './../Settings/SelectorSettingsField';
import VisibilitySettingsField from './../Page/Settings/Visibility/VisibilitySettingsField';


class ModalEditClass extends Component {

  constructor(props) {
    super(props);

    // //console.log(" ModalEditClass :: construct ",props);

    this.mounted = false;

    this.state = {
      field: null
    };

    this.onModalClose = this.onModalClose.bind(this);
  }

  componentDidMount() {

    if (this.props.modalSettings.displayModal) {
      this.modalOpen();
    }

    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  /**
  *   Widget configuration can be changed because some settings or $rule
  *   added directly to PHP. It's necessary to update the json stored in BBDD
  *   to update the avialabe settings, and modifiy if necessary
  */
 updateSettingsFromConfig(field) {

  var config = null;

  if(field.data.type == "row"){
    config = ROW_SETTINGS;
  }
  else if(field.data.type == "col"){
    config = COL_SETTINGS;
  }
  else {
    return field;
  }

  console.log("ModalEditClass :: updateSettingsFromConfig (config) ",config);

  if (config !== undefined) {
    for (var id in config) {
      var setting = config[id];
      if (field.data.settings[setting] === undefined) {
        field.data.settings[setting] = null;
      }
    }
  }

  return field;
}

  componentWillReceiveProps(nextProps) {

    console.log(" ModalEditClass :: componentWillReceiveProps ", nextProps);

    var field = null;

    if (nextProps.modalSettings.displayModal) {
      this.modalOpen();
      field = nextProps.modalSettings.item;

      field = this.updateSettingsFromConfig(field);

    } else {
      this.modalClose();
    }

    ////console.log("ModalEditClass :: componentWillReceiveProps :: =>",field);

    if (this.mounted) {
      this.setState({
        field: field
      });
    }

  }

  onModalClose(e) {
    e.preventDefault();
    this.props.cancelSettings();
  }

  modalOpen() {
    TweenMax.to($("#modal-edit-class"), 0.5, { opacity: 1, display: "block", ease: Power2.easeInOut });
  }

  modalClose() {

    var self = this;
    TweenMax.to($("#modal-edit-class"), 0.5, {
      display: "none", opacity: 0, ease: Power2.easeInOut, onComplete: function () {
        /*
        self.setState({
          field : null
        });
        */
      }
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const field = this.state.field;

    this.props.changeFieldSettings(field, this.props.app.layout);

  }

  /*************** SETTINGS **********************/

  handleFieldSettingsChange(field) {

    //console.log("ModalEditClass :: handleFieldSettingsChange => ", field);

    const stateField = this.state.field;

    stateField.data[field.source][field.name] = field.value;

    this.setState({
      field: stateField
    });
  }

  getAlignmentOptions() {
    return [
      {
        value: "",
        name: 'gauche',
      },
      {
        value: "center",
        name: "centre",
      },
      {
        value: "right",
        name: "droite",
      }
    ];
  }

  getBoxClassOptions(){
    return [
      {
        value: "",
        name: 'Sélectionnez',
      },
      {
        value: "box-class-1",
        name: 'box-class-1',
      },
      {
        value: "box-class-2",
        name: "box-class-2",
      },
      {
        value: "box-class-3",
        name: "box-class-3",
      },
      {
        value: "reduced",
        name: "reduced",
      },
      {
        value: "icon-box",
        name: "icon-box",
      },
    ];
  }

  renderSettings() {

    //console.log("renderSettings!",this.state.field);

    const data = this.state.field != null ? this.state.field.data : null;

    return (
      <div>

        <h6>{Lang.get('modals.configuration')}</h6>

        <InputSettingsField
          field={data}
          name="htmlId"
          source="settings"
          onFieldChange={this.handleFieldSettingsChange.bind(this)}
          label="Html ID"
          inputLabel={Lang.get('modals.indica_html')}
        />

        <InputSettingsField
          field={data}
          name="htmlClass"
          source="settings"
          onFieldChange={this.handleFieldSettingsChange.bind(this)}
          label="Html Class"
          inputLabel={Lang.get('modals.indica_css')}
        />

        <BooleanSettingsField
          field={data}
          name="hasContainer"
          source="settings"
          onFieldChange={this.handleFieldSettingsChange.bind(this)}
          label={Lang.get('modals.has_container')}
        />

        <SelectorSettingsField
          field={data}
          name="textAlign"
          source="settings"
          onFieldChange={this.handleFieldSettingsChange.bind(this)}
          label={'Alignement du texte'}
          options={this.getAlignmentOptions()}
        />

        <SelectorSettingsField
          field={data}
          name="labelAlign"
          source="settings"
          onFieldChange={this.handleFieldSettingsChange.bind(this)}
          label={'Alignement du libellé'}
          options={this.getAlignmentOptions()}
        />

        <SelectorSettingsField
          field={data}
          name="valueAlign"
          source="settings"
          onFieldChange={this.handleFieldSettingsChange.bind(this)}
          label={'Alignement du valeur'}
          options={this.getAlignmentOptions()}
        />

        <SelectorSettingsField
          field={data}
          name="display"
          source="settings"
          onFieldChange={this.handleFieldSettingsChange.bind(this)}
          label={'Disposition'}
          options={[
            {
              value: "",
              name: 'Label/Valeur en ligne',
            },
            {
              value: "block",
              name: "Label/Valeur superposés",
            }
          ]}
        />

        <BooleanSettingsField
          field={data}
          name="stripped"
          source="settings"
          onFieldChange={this.handleFieldSettingsChange.bind(this)}
          label={'Annuler ligne de couleur intercalé'}
        />

        <BooleanSettingsField
          field={data}
          name="hideBorders"
          source="settings"
          onFieldChange={this.handleFieldSettingsChange.bind(this)}
          label={'Cacher les bords'}
        />

        <SelectorSettingsField
          field={data}
          name="boxClass"
          source="settings"
          onFieldChange={this.handleFieldSettingsChange.bind(this)}
          label={'Style conteneur'}
          options={this.getBoxClassOptions()}
        />

        <BooleanSettingsField
          field={data}
          name="displayInline"
          source="settings"
          onFieldChange={this.handleFieldSettingsChange.bind(this)}
          label={Lang.get('modals.display_inline')}
        />

        <BooleanSettingsField
          field={data}
          name="displayLabel"
          source="settings"
          onFieldChange={this.handleFieldSettingsChange.bind(this)}
          label={Lang.get('modals.display_label')}
        />

        <VisibilitySettingsField
          field={data}
          name="conditionalVisibility"
          source="settings"
          inputLabel="Définir l'état par défaut."
          onFieldChange={this.handleFieldSettingsChange.bind(this)}
          label="Afficher selon conditions"
          parameters={this.props.parameters}
          fields={this.props.fields}
        />
        
        <InputSettingsField
          field={data}
          name="stage"
          source="settings"
          onFieldChange={this.handleFieldSettingsChange.bind(this)}
          label="Étape"
          inputLabel={'Sélectionnez la étape. ( visibilité automatique )'}
        />

      </div>
    );
  }

  render() {

    return (
      <div>

        <div className="custom-modal" id="modal-edit-class" style={{ zIndex: this.props.zIndex }}>
          <div className="modal-background"></div>


          <div className="modal-container">

            {this.state.field != null &&
              <div className="modal-header">
                <h2>{this.state.field.data.type == 'row' ? 'Fila' : 'Columna'} | {Lang.get('modals.edition')}</h2>
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
                  <div className="col-xs-6 col-xs-offset-3">
                    {this.renderSettings()}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <a href="" className="btn btn-default" onClick={this.onModalClose}> {Lang.get('modals.cancel')} </a> &nbsp;
                  <a href="" className="btn btn-primary" onClick={this.onSubmit.bind(this)}> {Lang.get('modals.accept')} </a> &nbsp;
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
    app: state.app,
    modalSettings: state.modalSettings
  }
}

const mapDispatchToProps = dispatch => {
  return {
    cancelSettings: () => {
      return dispatch(cancelSettings());
    },
    changeFieldSettings: (field, layout) => {
      return dispatch(changeFieldSettings(field, layout));
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditClass);
