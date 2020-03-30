import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Label from './fields/Label';
import CheckField from './fields/CheckField';
import IconField from './fields/IconField';
import DefaultField from './fields/DefaultField';
import { Grid, Row, Col } from 'react-bootstrap';
import api from './../../../../back/api';

export default class ElementCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            //field : field,
            element: JSON.parse(atob(props.element)),
            modelValues: [],
            model: JSON.parse(atob(props.model)),
            layout: []
        };
    }

    handleChange(e) {
        // console.log('handleChange :: ', e.target.checked)
    }

    componentDidMount() {
        this.loadValues();
        this.loadTemplate();
    }

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

    loadValues(page, filters) {
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

    render() {
        return (
            <div>
                <Grid
                    className="layout"
                    fluid={true}
                >
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