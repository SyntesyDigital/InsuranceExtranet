import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import BooleanSettingsField from './Settings/BooleanSettingsField';
import InputSettingsField from './Settings/InputSettingsField';
import CheckboxesSettingsField from './Settings/CheckboxesSettingsField';
import SelectorSettingsField from './Settings/SelectorSettingsField';
import RadioSettingsField from './Settings/RadioSettingsField';
import LinkSettingsField from './Settings/LinkSettingsField';
import ModalSettingsField from './Settings/HasModal/ModalSettingsField';
import FieldsSettings from './Settings/FieldsSettings';

import VisibilitySettingsField from './Settings/Visibility/VisibilitySettingsField';
import DefaultSettingsField from './Settings/DefaultValue/DefaultSettingsField';
import BooleanValuesSettingsField from './Settings/BooleanValues/BooleanValuesSettingsField';
import ConditionalFormattingSettingsField from './Settings/ConditionalFormatting/ConditionalFormattingSettingsField';
import ConditionalValueIconSettingsField from './Settings/ConditionalValueIcon/ConditionalValueIconSettingsField';

import MaxDateSettingsField from './Settings/MaxDate/MaxDateSettingsField';
import CurrencySettingsField from './Settings/Currency/CurrencySettingsField';

import {
    closeModalSettings,
    onModalSettingsClosed,
    changeFieldSettings
} from './actions/';

import {
    updateSettingsFromConfig
} from './functions';

class ElementModal extends Component {

    constructor(props) {
        super(props);

        this.handleFieldSettingsChange = this.handleFieldSettingsChange.bind(this);
        this.onModalClose = this.onModalClose.bind(this);


        this.state = {
            id: 'modal-element-settings',
            isOpen: false,
            field : null
        };
    }

    handleFieldSettingsChange(field) {
        this.props.changeFieldSettings(field);
    }

    onModalClose(e) {
        e.preventDefault();

        this.props.closeModalSettings();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.display != this.props.display){
            if (this.props.display) {
                this.openModal();
            }
            else {
                this.closeModal();
            }
        }
    }

    updateField() {
        return updateSettingsFromConfig(
            this.props.app.settingsField,
            this.props.app.element.type);
    }

    openModal() {
        $("#" + this.state.id).css({
            display: "block"
        });
        TweenMax.to($("#" + this.state.id), 0.5, {
            opacity: 1,
            ease: Power2.easeInOut
        });


        this.setState({
            isOpen: true,
            field : this.updateField()  //process field from last updates
        });

    }

    closeModal() {
        var self = this;

        TweenMax.to($("#" + this.state.id), 0.5, {
            display: "none",
            opacity: 0,
            ease: Power2.easeInOut,
            onComplete: function () {
                self.setState({
                    isOpen: false,
                    field : null
                });
                self.props.onModalSettingsClosed();
            }
        });
    }

    getFormatsList() {

        const field = this.props.app.settingsField;

        if (!field || MODELS_FIELDS[field.type] === undefined)
            return [];

        return MODELS_FIELDS[field.type].formats.map((item, index) => {
            return { name: Lang.get('fields.' + item), value: item };
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

    render() {

        const field = this.state.field;

        console.log("field :: ElementModal", field);

        return (
            <div className="custom-modal" id={this.state.id}>
                <div className="modal-background"></div>
                <div className="modal-container">
                    {field != null &&
                        <div className="modal-header">

                            <i className={"fa " + field.icon}></i>
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
                                <div className="col-xs-12 col-md-8 col-md-offset-2">

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

                                    {field != null && field.rules != null && field.rules.minCharacters !== undefined &&
                                        <InputSettingsField
                                            field={field}
                                            name="minCharacters"
                                            source="rules"
                                            onFieldChange={this.handleFieldSettingsChange}
                                            label="Caractères minimum"
                                            inputLabel="Indique le nombre minimum de caractères"
                                        />
                                    }

                                    {field != null && field.rules != null && field.rules.maxCharacters !== undefined &&
                                        <InputSettingsField
                                            field={field}
                                            name="maxCharacters"
                                            source="rules"
                                            onFieldChange={this.handleFieldSettingsChange}
                                            label="Caractères maximum"
                                            inputLabel="Indique le nombre maximum de caractères"
                                        />
                                    }

                                    <BooleanSettingsField
                                        field={field}
                                        name="bordered"
                                        source="settings"
                                        onFieldChange={this.handleFieldSettingsChange}
                                        label="Bordered"
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


                                    <ModalSettingsField
                                        field={field}
                                        name="hasModal"
                                        source="settings"
                                        onFieldChange={this.handleFieldSettingsChange}
                                        label="Lien avec modal"
                                    />

                                    <ModalSettingsField
                                        field={field}
                                        name="addElement"
                                        source="settings"
                                        onFieldChange={this.handleFieldSettingsChange}
                                        label="Formulaire à ajouter"
                                    />

                                    <BooleanSettingsField
                                        field={field}
                                        name="preview"
                                        source="settings"
                                        onFieldChange={this.handleFieldSettingsChange}
                                        label="Preview"
                                    />

                                    <FieldsSettings
                                        field={field}
                                        name="fields"
                                        source="settings"
                                        onFieldChange={this.handleFieldSettingsChange}
                                        label="Liste des champs"
                                    />

                                    <VisibilitySettingsField
                                        field={field}
                                        name="conditionalVisibility"
                                        source="settings"
                                        inputLabel="Définir l'état par défaut."
                                        onFieldChange={this.handleFieldSettingsChange}
                                        label="Afficher selon conditions"
                                        parameters={this.props.app.parameters}
                                        fields={this.props.app.fields}
                                    />

                                    <DefaultSettingsField
                                        field={field}
                                        name="defaultValue"
                                        source="settings"
                                        label="Valeur par défaut"
                                        inputLabel="Définir le valeur"
                                        onFieldChange={this.handleFieldSettingsChange}
                                    />

                                    {field != null && field.settings != null && field.settings.booleanValues !== undefined &&
                                        <BooleanValuesSettingsField
                                            field={field}
                                            name="booleanValues"
                                            source="settings"
                                            label="Valeurs booléennes"
                                            value={field.settings.booleanValues}
                                            onFieldChange={this.handleFieldSettingsChange}
                                        />
                                    }

                                    {field != null && field.settings != null && field.settings.conditionalFormatting !== undefined &&
                                        <ConditionalFormattingSettingsField
                                            field={field}
                                            name="conditionalFormatting"
                                            source="settings"
                                            label="Mise en forme conditionnelle"
                                            value={field.settings.conditionalFormatting}
                                            onFieldChange={this.handleFieldSettingsChange}
                                        />
                                    }

                                    {field != null && field.settings != null && field.settings.group !== undefined &&

                                        <BooleanSettingsField
                                            field={field}
                                            name="group"
                                            source="settings"
                                            onFieldChange={this.handleFieldSettingsChange}
                                            label="Groupe"
                                        />
                                    }

                                    {field != null && field.settings != null && field.settings.conditionalIcon !== undefined &&
                                        <ConditionalValueIconSettingsField
                                            field={field}
                                            name="conditionalIcon"
                                            source="settings"
                                            label="Icone conditionelle"
                                            value={field.settings.conditionalIcon}
                                            onFieldChange={this.handleFieldSettingsChange}
                                        />
                                    }

                                    {field != null && field.settings != null && field.settings.operation !== undefined &&
                                        <InputSettingsField
                                            field={field}
                                            name="operation"
                                            source="settings"
                                            onFieldChange={this.handleFieldSettingsChange}
                                            label="Operation"
                                            inputLabel="Indique la opération"
                                        />

                                    }

                                    {field != null && field.settings != null && field.settings.description !== undefined &&
                                        <InputSettingsField
                                            field={field}
                                            name="description"
                                            source="settings"
                                            onFieldChange={this.handleFieldSettingsChange}
                                            label="Description"
                                            inputLabel="Indiquer la description"
                                        />
                                    }       

                                    {field != null && field.settings != null && field.settings.currency !== undefined &&
                                        <CurrencySettingsField
                                            field={field}
                                            name="currency"
                                            source="settings"
                                            onFieldChange={this.handleFieldSettingsChange}
                                            label="Divise"
                                            parameters={this.props.app.parameters}
                                            fields={this.props.app.fields}
                                        />

                                    }


                                    {field != null && field.settings != null && field.settings.readonly !== undefined &&
                                        <BooleanSettingsField
                                            field={field}
                                            name="readonly"
                                            source="settings"
                                            onFieldChange={this.handleFieldSettingsChange}
                                            label="Readonly"
                                        />
                                    }

                                    {field != null && field.settings != null && field.settings.iframe !== undefined && 
                                        <BooleanSettingsField
                                            field={field}
                                            name="iframe"
                                            source="settings"
                                            label="Preview with Iframe"
                                            onFieldChange={this.handleFieldSettingsChange}
                                        />
                                    }

                                    {field != null && field.settings != null && field.settings.hidden !== undefined && 
                                        <BooleanSettingsField
                                            field={field}
                                            name="hidden"
                                            source="settings"
                                            label="Hidden"
                                            onFieldChange={this.handleFieldSettingsChange}
                                        />
                                    }

                                    {field != null && field.rules != null && field.rules.maxDate !== undefined &&
                                        <MaxDateSettingsField
                                            field={field}
                                            name="maxDate"
                                            source="rules"
                                            label="Date maximum"
                                            parameters={this.props.app.parameters}
                                            //value={field.rules.maxDate}
                                            onFieldChange={this.handleFieldSettingsChange}
                                        />
                                    }

                                    {field != null && field.rules != null && field.rules.minDate !== undefined &&
                                        <MaxDateSettingsField
                                            field={field}
                                            name="minDate"
                                            source="rules"
                                            label="Date minimum"
                                            parameters={this.props.app.parameters}
                                            //value={field.rules.maxDate}
                                            onFieldChange={this.handleFieldSettingsChange}
                                        />
                                    }

                                    {field != null && field.rules != null && field.rules.minNumber !== undefined &&
                                        <InputSettingsField
                                            field={field}
                                            name="minNumber"
                                            source="rules"
                                            onFieldChange={this.handleFieldSettingsChange}
                                            label="Nombre minimum"
                                            inputLabel="Indique la valeur minimum"
                                        />
                                    }

                                    {field != null && field.rules != null && field.rules.maxNumber !== undefined &&
                                        <InputSettingsField
                                            field={field}
                                            name="maxNumber"
                                            source="rules"
                                            onFieldChange={this.handleFieldSettingsChange}
                                            label="Nombre maximum"
                                            inputLabel="Indique la valeur maximum"
                                        />
                                    }

                                    <BooleanSettingsField
                                        field={field}
                                        name="hideCurrency"
                                        source="settings"
                                        onFieldChange={this.handleFieldSettingsChange}
                                        label="Cacher la devise"
                                    />

                                    <SelectorSettingsField
                                        field={field}
                                        name="textAlign"
                                        source="settings"
                                        onFieldChange={this.handleFieldSettingsChange}
                                        label={'Alignement du texte'}
                                        options={this.getAlignmentOptions()}
                                    />

                                    {field != null && field.settings != null && field.settings.columnWidth !== undefined &&
                                        <InputSettingsField
                                            field={field}
                                            name="columnWidth"
                                            source="settings"
                                            onFieldChange={this.handleFieldSettingsChange}
                                            label="Largeur de colonne"
                                            inputLabel="Indique le nombre"
                                        />
                                    }

                                    {field != null && field.settings != null && field.settings.autosuggest !== undefined &&
                                        <BooleanSettingsField
                                            field={field}
                                            name="autosuggest"
                                            source="settings"
                                            label="Disable autosuggest"
                                            onFieldChange={this.handleFieldSettingsChange}
                                        />
                                    }

                                    <BooleanSettingsField
                                        field={field}
                                        name="isFile"
                                        source="settings"
                                        onFieldChange={this.handleFieldSettingsChange}
                                        label="Action de type fichier"
                                    />

                                    <BooleanSettingsField
                                        field={field}
                                        name="isFileWSFusion"
                                        source="settings"
                                        onFieldChange={this.handleFieldSettingsChange}
                                        label="Action de type fichier Fusion"
                                    />

                                    {field != null && field.settings != null && field.settings.placeholder !== undefined && 
                                        <InputSettingsField
                                            field={field}
                                            name="placeholder"
                                            source="settings"
                                            label="Placeholder"
                                            onFieldChange={this.handleFieldSettingsChange}
                                        />
                                    }

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
