import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Label from './fields/Label';
import CheckField from './fields/CheckField';
import IconField from './fields/IconField';
import DefaultField from './fields/DefaultField';
import { Grid, Row, Col } from 'react-bootstrap';
import api from './../../../../back/api';
import LayoutParser from './LayoutParser';

export default class ElementCard extends Component {

    // ----------------------------------------------- //
    //      CONSTRUCTOR
    // ----------------------------------------------- //
    constructor(props) {
        super(props);

        this.state = {
            element: JSON.parse(atob(props.element)),
            modelValues: [],
            model: JSON.parse(atob(props.model)),
            layout: []
        };
    }

    componentDidMount() {
        this.loadModelValues();
        this.loadTemplate();
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
        return this.state.modelValues.map(values => {
            return values[fieldname];
        });
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
                        modelValues: response.data.modelValues
                    });
                }
            }).catch(function (error) {
                console.log(error);
            });
    }

    loadTemplate() {
        api.elementTemplates.get(48)
            .then(response => {
                this.setState({
                    layout : JSON.parse(response.data.elementTemplate.layout)
                });
            });
    }

    // ----------------------------------------------- //
    //      RENDERS
    // ----------------------------------------------- //
    fieldRender(node) {

        if(node.type == 'element_field') {
            return (
                <DefaultField
                    label={node.field.name}
                    value={this.getModelFieldValue(node.field.identifier)}
                    stripped={true}
                    labelAlign={'left'}
                    valueAlign={'left'}
                    inline={true}
                />
            );
        }

        switch(node.field.type) {
            case 'label':
            case 'text':
                    return (
                        <Label
                            text={node.field.value.fr}
                            textAlign={'center'}
                        />
                    );
                break;

            case 'checkfield':
                return (
                    <CheckField
                        text={node.field.value.fr}
                        checked={true}
                    />
                );
                break;
            case 'icon':
                return (
                    <IconField
                        icon={'fas fa-' + node.field.value}
                        font={'40px'}
                        color={'#a2a8b3'}
                        circle={true}
                        checked={true}
                    />
                );
                break;
            case 'image':
                return 'image';
                break;
        }
    }


    render() {
        return (
            <div>
                <Grid
                    className="layout"
                    fluid={true}
                >
                    <LayoutParser 
                        layout={this.state.layout}
                        fieldRender={this.fieldRender.bind(this)}
                    />

                    <Label
                        text={'FICHE AGRÉMENT'}
                        textAlign={'center'}
                    />
                    <Row>
                        <Col md={6} sm={6} className="container-fields-default border-right">
                            <DefaultField
                                label={'Ref'}
                                value={'AGRE1012'}
                                stripped={true}
                                labelAlign={'center'}
                                valueAlign={'center'}
                                inline={true}
                                valueBackgroundColor={'red'}
                                valueColor={'yelow'}
                            />
                            <DefaultField
                                label={'Date Agrément'}
                                value={'09-12-2019'}
                                stripped={true}
                                labelAlign={'center'}
                                valueAlign={'center'}
                                inline={true}
                                valueBackgroundColor={'green'}
                                valueColor={'white'}
                            />
                            <DefaultField
                                label={'Ref'}
                                value={'AGRE1012'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                            <DefaultField
                                label={'Nom de l’assuré'}
                                value={'09-12-2019'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                            <DefaultField
                                label={'Ref'}
                                value={'AGRE1012'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                        </Col>
                        <Col md={6} sm={6} className="container-fields-default">
                            <DefaultField
                                label={'Ref'}
                                value={'AGRE1012'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                            <DefaultField
                                label={'Date Agrément'}
                                value={'09-12-2019'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                            <DefaultField
                                label={'Ref'}
                                value={'AGRE1012'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                            <DefaultField
                                label={'Nom de l’assuré'}
                                value={'09-12-2019'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                            <DefaultField
                                label={'Ref'}
                                value={'AGRE1012'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                        </Col>
                    </Row>
                    <Label
                        text={'LOCATAIRE 1'}
                        textAlign={'center'}
                    />
                    <Row>
                        <Col md={6} sm={6} className="container-fields-default border-right">
                            <DefaultField
                                label={'Ref'}
                                value={'AGRE1012'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                            <DefaultField
                                label={'Date Agrément'}
                                value={'09-12-2019'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                            <DefaultField
                                label={'Ref'}
                                value={'AGRE1012'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                        </Col>
                        <Col md={6} sm={6} className="container-fields-default">
                            <DefaultField
                                label={'Ref'}
                                value={'AGRE1012'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                            <DefaultField
                                label={'Date Agrément'}
                                value={'09-12-2019'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                            <DefaultField
                                label={'Ref'}
                                value={'AGRE1012'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                        </Col>
                    </Row>
                    <CheckField
                        text={'Je confirme que ce candidat locataire n’a pas le statut de diplomate, n’est pas une association, et justifie de revenus versés et déclarés à l’étranger'}
                        onChange={this.handleChange.bind(this)}
                    />
                    <Label
                        text={'LOCATAIRE 2'}
                        textAlign={'center'}
                    />
                    <Row>
                        <Col md={6} sm={6} className="container-fields-default border-right">
                            <DefaultField
                                label={'Ref'}
                                value={'AGRE1012'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                            <DefaultField
                                label={'Date Agrément'}
                                value={'09-12-2019'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                            <DefaultField
                                label={'Ref'}
                                value={'AGRE1012'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                        </Col>
                        <Col md={6} sm={6} className="container-fields-default">
                            <DefaultField
                                label={'Ref'}
                                value={'AGRE1012'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                            <DefaultField
                                label={'Date Agrément'}
                                value={'09-12-2019'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                            <DefaultField
                                label={'Ref'}
                                value={'AGRE1012'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                        </Col>
                    </Row>
                    <CheckField
                        text={'Je confirme que ce candidat locataire n’a pas le statut de diplomate, n’est pas une association, et justifie de revenus versés et déclarés à l’étranger'}
                        onChange={this.handleChange.bind(this)}
                    />
                </Grid>
                <Grid
                    fluid={true}
                >
                    <Row>
                        <Col md={12}>
                            <IconField
                                icon={'fas fa-building'}
                                font={'40px'}
                                color={'#a2a8b3'}
                                circle={true}
                                checked={true}
                            />
                        </Col>
                    </Row>
                </Grid>
                <DefaultField
                    label={'RESULTAT'}
                    value={'REFUS - A SOUMETTRE'}
                    valueColor={'#c05252'}
                    valueBackgroundColor={'#fc7c7c'}
                    labelAlign={'center'}
                    valueAlign={'center'}
                    inline={true}
                    stripped={false}
                />
            </div>
        );
    }
}


if (document.getElementById('element-card')) {

    document.querySelectorAll('[id=element-card]').forEach(function(el){
        var element = el.getAttribute('element');
        var model = el.getAttribute('model');
        var parameters = el.getAttribute('parameters');
 
        ReactDOM.render(<ElementCard
            element={element}
            model={model}
            parameters={parameters}
        />, el);
    });
 }