import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Label from './fields/Label';
import CheckField from './fields/CheckField';
import IconField from './fields/IconField';
import DefaultField from './fields/DefaultField';
import ImageField from './fields/ImageField';
import RichTextField from './fields/RichTextField';
import IframeFile from './fields/IframeFile';
import { Grid, Row, Col } from 'react-bootstrap';
import api from './../../../../back/api';
import LayoutParser from './LayoutParser';
import {
    parseNumber
} from '../functions';
import {
    parameteres2Array,
    isVisible
} from '../Forms/functions';

export default class CardComponent extends Component {

    // ----------------------------------------------- //
    //      CONSTRUCTOR
    // ----------------------------------------------- //
    constructor(props) {
        super(props);

        var field = props.field ? props.field : null;
        var template = field && field.settings.template ? field.settings.template : null;

        this.state = {
            field: field,
            element: props.element,
            modelValues: [],
            model: props.model,
            layout: [],
            template: template,
            dataLoaded: false,
            templateLoaded: template ? false : true,
            parameters: parameteres2Array(props.parameters),
            icon: null
        };
    }

    componentDidMount() {
        this.loadModelValues();
        if (this.state.template != null) {
            this.loadTemplate(this.state.template);
        }
    }

    // ----------------------------------------------- //
    //      HANDLERS
    // ----------------------------------------------- //
    handleChange(e) {
        // console.log('handleChange :: ', e.target.checked)
    }

    // ----------------------------------------------- //
    //      GETTERS
    // ----------------------------------------------- //
    getUrlParameters() {
        //concat parameters, first constant parameters
        var parameters = this.state.model.DEF1 != null ?
            this.state.model.DEF1 : '';

        if (parameters != '')
            parameters += "&";

        //then
        parameters += this.props.parameters;

        return parameters;
    }

    getModelFieldValue(fieldname) {
        return this.state.modelValues[0] !== undefined &&
            this.state.modelValues[0][fieldname] ? this.state.modelValues[0][fieldname] : "";
    }

    getConditionalFormating(field, value) {

        if (value === undefined)
            return {};

        value = typeof value === 'string' ? value.toLowerCase() : value;

        if (field.settings.conditionalFormatting !== undefined &&
            field.settings.conditionalFormatting != null) {

            for (var key in field.settings.conditionalFormatting.conditions) {
                var condition = field.settings.conditionalFormatting.conditions[key];

                console.log("condition => ", condition);

                var conditionValue = typeof condition.value === 'string' ?
                    condition.value.toLowerCase() : condition.value;

                console.log("comparision :: value, conditiaonValue,  value.indexOf(conditionValue) != -1", value, conditionValue, value.indexOf(conditionValue) != -1);

                if (value.indexOf(conditionValue) != -1) {
                    //if the string is contained in the string
                    return {
                        color: condition.color,
                        backgroundColor: condition.backgroundColor,
                    };
                }
            }
        }

        return {};
    }

    getConditionalIcon(field, value) {
        if (value === undefined)
            return {};

        value = typeof value === 'string' ? value.toLowerCase() : value;

        if (field.settings.conditionalIcon !== undefined &&
            field.settings.conditionalIcon != null) {

            for (var key in field.settings.conditionalIcon.conditions) {
                var condition = field.settings.conditionalIcon.conditions[key];
                var conditionValue = typeof condition.value === 'string' ?
                    condition.value.toLowerCase() : condition.value;

                if (value.indexOf(conditionValue) != -1) {
                    return {
                        icon: condition.icon,
                    };
                }
            }
        }
        return {};
    }

    getConfig(field) {
        var config = {
            checked: 1,
            unchecked: 0
        };

        if (field.settings.booleanValues !== undefined &&
            field.settings.booleanValues != null) {
            config = field.settings.booleanValues;
        }

        return config;
    }

    getConfigValue(field, value) {
        var config = this.getConfig(field);

        //console.log("getConfigValue :: (field,config,value) ",field,config,value);

        if (config.checked == value) {
            return true;
        }
        else {
            return false;
        }
    }

    // ----------------------------------------------- //
    //      LOADERS
    // ----------------------------------------------- //
    loadModelValues(page, filters) {
        let self = this;
        let parameters = this.getUrlParameters();
        let url = ASSETS + 'architect/extranet/' + this.state.element.id + '/model_values/data?' + parameters;

        axios.get(url)
            .then(function (response) {
                if (response.status != 200) {
                    return;
                }

                if (response.data.modelValues !== undefined) {
                    self.setState({
                        modelValues: response.data.modelValues,
                        dataLoaded: true
                    });
                }
            }).catch(function (error) {
                console.log(error);
            });
    }

    loadTemplate(template) {
        api.elementTemplates.get(template)
            .then(response => {
                this.setState({
                    layout: JSON.parse(response.data.elementTemplate.layout),
                    templateLoaded: true
                });
            });
    }


    /**
     * Function to check if item is visible or not depending on the values and the parameters
     * @param {*} settings 
     */
    checkVisibility(field) {

        var visibility = isVisible(
            field,
            this.state.parameters,
            this.state.modelValues[0]
        );

        //console.log("checkVisibility :: (field,parameters,values,return)",field,this.state.parameters,this.state.modelValues[0],visibility)

        return visibility;
    }


    // ----------------------------------------------- //
    //      RENDERS
    // ----------------------------------------------- //
    fieldRender(node, key, settings) {

        console.log("fieldRender :: settings merged : (node, key, settings) ", node, key, settings);

        if (node.type == 'element_field') {
            return this.renderElementField(node.field, settings);
        }

        switch (node.field.type) {
            case 'label':
            case 'text':

                const textAlign = node.field && node.field.settings && node.field.settings.textAlign ?
                    'text-' + node.field.settings.textAlign : '';

                const border = node.field && node.field.settings && node.field.settings.hideBorders ?
                    true : false;

                return (
                    <Label
                        key={key}
                        text={node.field.value.fr}
                        textAlign={textAlign}
                        border={border}
                    />
                );

            case 'icon':
                return (
                    <IconField
                        key={key}
                        icon={node.field.value}
                        font={STYLES.elementForm.iconFontSizeElement}
                        color={STYLES.elementForm.iconColorElement}
                        circle={true}
                        checked={true}
                    />
                );

            case 'image':
                return (
                    <ImageField
                        key={key}
                        field={node.field}
                    />
                );

            case 'richtext':
                return (
                    <RichTextField
                        key={key}
                        field={node.field}
                    />
                );              
                break;
        }
    }

    removeTags(value){
        return value.toString().replace(/(<([^>]+)>)/gi, "");
    }

    isDefined(value){
        return value != null && value !== undefined && value !== ''
    }

    renderElementField(field, settings) {

        var value = this.getModelFieldValue(field.identifier);
        const fieldSettings = field.settings;
        const conditionalFormating = this.getConditionalFormating(field, value);
        const conditionalIcon = this.getConditionalIcon(field, value);
        
        console.log("renderElementField :: (field,conditionalFormating,value)", field, conditionalFormating, value);

        settings = {
            ...fieldSettings,
            ...settings
        };

        const stripped = settings.stripped ? false : true;
        const inline = settings.display && settings.display == "block" ? false : true;
        const labelAlign = settings.labelAlign ? settings.labelAlign : "";
        const valueAlign = settings.valueAlign ? settings.valueAlign : "";
        const color = conditionalFormating.color ? conditionalFormating.color : null;
        const backgroundColor = conditionalFormating.backgroundColor ? conditionalFormating.backgroundColor : null;
        const icon = conditionalIcon.icon ? conditionalIcon.icon : null;
        console.log('VALOR LINK', value, 'valuetostring ->' , value.toString().replace(/(<([^>]+)>)/gi, ""));

        
        if (!this.isDefined(value)){
            return null;
        }
    
        switch (field.type) {
            case 'boolean':
                return <CheckField
                    label={field.name}
                    value={value}
                    stripped={stripped}
                    key={field.id}
                    checked={this.getConfigValue(field, value)}
                    settings={settings}
                />

            case 'file':
                if (field.settings.iframe !== undefined && field.settings.iframe != null && field.settings.iframe == true) {
                    return <IframeFile 
                                link={value}
                                stripped={stripped}
                                key={field.id}
                                settings={settings}
                            />
                }

            case 'number':
                return <DefaultField
                    label={field.name}
                    value={parseNumber(value, field, this.state.modelValues[0], this.props.parameters)}
                    stripped={stripped}
                    labelAlign={labelAlign}
                    valueAlign={valueAlign}
                    inline={inline}
                    key={field.id}
                    valueColor={color}
                    valueBackgroundColor={backgroundColor}
                    settings={settings}
                />

            case 'text':
                //if then remove tags, string is null, hidden fields
                //value = this.removeTags(value);
                if (!this.isDefined(value)){
                    return null;
                }
                if (field.settings.format == "password") {
                    return <DefaultField
                        label={field.name}
                        value={'******'}
                        stripped={stripped}
                        labelAlign={labelAlign}
                        valueAlign={valueAlign}
                        inline={inline}
                        key={field.id}
                        valueColor={color}
                        valueBackgroundColor={backgroundColor}
                        settings={settings}
                    />
                }
                if (field.settings.conditionalIcon !== undefined &&
                    field.settings.conditionalIcon != null) {
                    return <DefaultField
                        label={field.name}
                        value={value}
                        stripped={stripped}
                        labelAlign={labelAlign}
                        valueAlign={valueAlign}
                        inline={inline}
                        key={field.id}
                        valueColor={color}
                        valueBackgroundColor={backgroundColor}
                        settings={settings}
                        icon={icon}
                    />
                }
            default:
                return <DefaultField
                    label={field.name}
                    value={value}
                    stripped={stripped}
                    labelAlign={labelAlign}
                    valueAlign={valueAlign}
                    inline={inline}
                    key={field.id}
                    valueColor={color}
                    valueBackgroundColor={backgroundColor}
                    settings={settings}
                />
        }
    }


    renderDefault() {
        return this.state.element.fields.map((item) => {
            return this.renderElementField(item);
        });

    }

    render() {

        if (!this.state.template) {
            return (
                <div className="layout">
                    <Row style={{ paddingTop: 20 }}>
                        <Col sm={12} className="container-fields-default"></Col>
                    </Row>
                    <Row>
                        <Col sm={12} className="container-fields-default">
                            {this.renderDefault()}
                        </Col>
                    </Row>
                </div>
            )
        }

        return (
            <div>
                <div className="layout">
                    {this.state.layout != null &&
                        <LayoutParser
                            layout={this.state.layout}
                            fieldRender={this.fieldRender.bind(this)}
                            checkVisibility={this.checkVisibility.bind(this)}
                        />
                    }
                    {this.state.layout == null &&
                        <div>Aucun modèle configuré</div>
                    }
                </div>
            </div>
        );
    }
}