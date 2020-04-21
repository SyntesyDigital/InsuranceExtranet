import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Label from './fields/Label';
import CheckField from './fields/CheckField';
import IconField from './fields/IconField';
import DefaultField from './fields/DefaultField';
import ImageField from './fields/ImageField';
import { Grid, Row, Col } from 'react-bootstrap';
import api from './../../../../back/api';
import LayoutParser from './LayoutParser';

export default class ElementCard extends Component {

    // ----------------------------------------------- //
    //      CONSTRUCTOR
    // ----------------------------------------------- //
    constructor(props) {
        super(props);

        var field = JSON.parse(atob(props.field));
        var template = field.settings.template ? field.settings.template : null;

        this.state = {
            field : field,
            element: JSON.parse(atob(props.element)),
            modelValues: [],
            model: JSON.parse(atob(props.model)),
            layout: [],
            template : template,
            dataLoaded : false,
            templateLoaded : template ? false : true
        };
    }

    componentDidMount() {
        this.loadModelValues();
        if(this.state.template != null){
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

    getConditionalFormating(field,value) {

        if(value === undefined)
            return {};

        value = typeof value === 'string' ? value.toLowerCase() : value;
        
        if(field.settings.conditionalFormatting !== undefined && 
          field.settings.conditionalFormatting != null) {
          
          for(var key in field.settings.conditionalFormatting.conditions){
            var condition = field.settings.conditionalFormatting.conditions[key];

            console.log("condition => ",condition);

            var conditionValue = typeof condition.value === 'string' ? 
              condition.value.toLowerCase() : condition.value;
    
            console.log("comparision :: value, conditiaonValue,  value.indexOf(conditionValue) != -1",value, conditionValue, value.indexOf(conditionValue) != -1);

            if(value.indexOf(conditionValue) != -1) {
              //if the string is contained in the string
              return {
                color : condition.color,
                backgroundColor : condition.backgroundColor,
              };
            }
          }
        }
    
        return {};
      }

      getConfig(field) {
        var config = {
            checked : 1,
            unchecked : 0
        };

        if(field.settings.booleanValues !== undefined && 
            field.settings.booleanValues != null){
            config = field.settings.booleanValues;
        }

        return config;
    }
    
    getConfigValue(field,value) {
        var config = this.getConfig(field);

        //console.log("getConfigValue :: (field,config,value) ",field,config,value);

        if(config.checked == value){
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
                if(response.status != 200) {
                    return;
                }

                if(response.data.modelValues !== undefined) {                    
                    self.setState({
                        modelValues: response.data.modelValues,
                        dataLoaded : true
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
                    layout : JSON.parse(response.data.elementTemplate.layout),
                    templateLoaded : true
                });
            });
    }

    

    // ----------------------------------------------- //
    //      RENDERS
    // ----------------------------------------------- //
    fieldRender(node, key, settings) {

        //console.log("fieldRender :: settings merged : (settings) ",settings);

        if(node.type == 'element_field') {
            return this.renderElementField(node.field,settings);
        }

        switch(node.field.type) {
            case 'label':
            case 'text':

                    const textAlign = node.field && node.field.settings && node.field.settings.textAlign ? 
                        'text-'+node.field.settings.textAlign : '';

                    return (
                        <Label
                            key={key}
                            text={node.field.value.fr}
                            textAlign={textAlign}
                        />
                    );
                break;

            case 'icon':
                return (
                    <IconField
                        key={key}
                        icon={'fas fa-' + node.field.value}
                        font={'40px'}
                        color={'#a2a8b3'}
                        circle={true}
                        checked={true}
                    />
                );
                break;
            case 'image':
                return (
                    <ImageField
                        key={key}
                        field={node.field}
                    />
                );
                break;
        }
    }

    renderElementField(field,settings) {
        
        const value = this.getModelFieldValue(field.identifier);
        const fieldSettings = field.settings;
        const conditionalFormating = this.getConditionalFormating(field,value);

        console.log("renderElementField :: (field,conditionalFormating,value)",field,conditionalFormating,value);
        
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


        if(value == null || value == "")
            return null;

        switch(field.type) {
            case 'boolean' :
                return <CheckField
                    label={field.name}
                    value={value}
                    stripped={stripped}
                    key={field.id}
                    checked={this.getConfigValue(field,value)}
                    settings={settings}
                />
                
            default : 
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

        if(!this.state.template){
            return (
                <Grid
                    className="layout"
                    fluid={true}
                >
                    <Row style={{paddingTop:20}}>
                        <Col sm={12} className="container-fields-default"></Col>
                    </Row>
                    <Row>
                        <Col sm={12} className="container-fields-default">
                            {this.renderDefault()}
                        </Col>
                    </Row>
                </Grid>
            )
        }

        return (
            <div>
                <Grid
                    className="layout"
                    fluid={true}
                >
                    {this.state.layout != null && 
                        <LayoutParser 
                            layout={this.state.layout}
                            fieldRender={this.fieldRender.bind(this)}
                        />
                    }
                    {this.state.layout == null && 
                        <div>Aucun modèle configuré</div>
                    }
                </Grid>
            </div>
        );
    }
}


if (document.getElementById('element-card')) {

    document.querySelectorAll('[id=element-card]').forEach(function(el){
        var field = el.getAttribute('field');
        var element = el.getAttribute('element');
        var model = el.getAttribute('model');
        var parameters = el.getAttribute('parameters');
 
        ReactDOM.render(<ElementCard
            field={field}
            element={element}
            model={model}
            parameters={parameters}
        />, el);
    });
 }