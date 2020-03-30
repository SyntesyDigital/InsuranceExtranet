import React, {Component} from 'react';
import { render } from 'react-dom';

import BooleanSettingsField from './Settings/BooleanSettingsField';
import InputSettingsField from './Settings/InputSettingsField';
import CheckboxesSettingsField from './Settings/CheckboxesSettingsField';
import SelectorSettingsField from './Settings/SelectorSettingsField';
import RadioSettingsField from './Settings/RadioSettingsField';

class TypologyModal extends Component {

  constructor(props) {
    super(props);

    this.handleFieldSettingsChange = this.handleFieldSettingsChange.bind(this);

  }

  handleFieldSettingsChange(field) {
      this.props.onSettingsFieldChange(field);
  }

  handleInputSettingsChange(event) {

  }

  getCropsformats() {
      var formats = [];
      IMAGES_FORMATS.map(function(format, k){
          formats.push({
              name : format.name+" ("+format.width+"x"+format.height+")",
              value : format.name
          });
      });

      return formats;
  }

  render() {
    return (
      <div className="custom-modal" id={this.props.id}>
        <div className="modal-background"></div>
          <div className="modal-container">
            {this.props.field != null &&
              <div className="modal-header">

                  <i className={"fa "+this.props.field.icon}></i>
                  <h2>{this.props.field.name} | {Lang.get('header.configuration')}</h2>

                <div className="modal-buttons">
                  <a className="btn btn-default close-button-modal" onClick={this.props.onModalClose}>
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
                      field={this.props.field}
                      name="entryTitle"
                      source="settings"
                      onFieldChange={this.handleFieldSettingsChange}
                      label="Titre"
                    />

                    <BooleanSettingsField
                      field={this.props.field}
                      name="required"
                      source="rules"
                      onFieldChange={this.handleFieldSettingsChange}
                      label="Champ obligatoire"
                    />

                    <BooleanSettingsField
                      field={this.props.field}
                      name="unique"
                      source="rules"
                      onFieldChange={this.handleFieldSettingsChange}
                      label="Champ unique"
                    />

                    <InputSettingsField
                      field={this.props.field}
                      name="minCharacters"
                      source="rules"
                      onFieldChange={this.handleFieldSettingsChange}
                      label="Caractères minimum"
                      inputLabel="Indique le nombre minimum de caractères"
                    />

                    <InputSettingsField
                      field={this.props.field}
                      name="maxCharacters"
                      source="rules"
                      onFieldChange={this.handleFieldSettingsChange}
                      label="Caractères maximum"
                      inputLabel="Indique le nombre maximum de caractères"
                    />

                    <InputSettingsField
                      field={this.props.field}
                      name="maxItems"
                      source="rules"
                      onFieldChange={this.handleFieldSettingsChange}
                      label="Nombre maximum d'éléments"
                      inputLabel="Indique le nombre maximum"
                    />


                    <InputSettingsField
                      field={this.props.field}
                      name="minItems"
                      source="rules"
                      onFieldChange={this.handleFieldSettingsChange}
                      label="Nombre minimum d'éléments"
                      inputLabel="Indiquez le nombre minimum"
                    />

                    <InputSettingsField
                      field={this.props.field}
                      name="fieldHeight"
                      source="settings"
                      onFieldChange={this.handleFieldSettingsChange}
                      label="Hauteur du champ"
                      inputLabel="Indique la hauteur en pixels"
                    />

                    <CheckboxesSettingsField
                      field={this.props.field}
                      name="typologiesAllowed"
                      source="settings"
                      onFieldChange={this.handleFieldSettingsChange}
                      label="Typologies autorisées"
                      options={TYPOLOGIES}
                    />

                    <RadioSettingsField
                      field={this.props.field}
                      name="cropsAllowed"
                      source="settings"
                      onFieldChange={this.handleFieldSettingsChange}
                      label="Tailles autorisées"
                      options={this.getCropsformats()}
                    />

                    {/*
                    <SelectorSettingsField
                      field={this.props.field}
                      name="listAllowed"
                      source="settings"
                      onFieldChange={this.handleFieldSettingsChange}
                      label="Llista seleccionada"
                      options={[
                        {name:"Llista 1",value:1},
                        {name:"Llista 2",value:2}
                      ]}
                    />
                    */}


                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <a href="" className="btn btn-default" onClick={this.props.onModalClose}> Fermer </a> &nbsp;
                {/*
                <a href="" className="btn btn-primary"> Guardar </a>
                */
                }
              </div>

            </div>
        </div>
        }
      </div>
    );
  }

}
export default TypologyModal;
