import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Label from './fields/Label';
import CheckField from './fields/CheckField';
import IconField from './fields/IconField';
import DefaultField from './fields/DefaultField';
import { Grid, Row, Col } from 'react-bootstrap';


export default class FileComponentTemp extends Component {

    constructor(props) {
        super(props);
    }

    handleChange(e) {
        var checked = e.target.checked;
        console.log(checked)
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
                        <Col md={6}>
                            <DefaultField
                                label={'Ref'}
                                value={'AGRE1012'}
                                valueBackgroundColor={'#f8f9fa'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                            <DefaultField
                                label={'Date Agrément'}
                                value={'09-12-2019'}
                                valueBackgroundColor={'#fff'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                            <DefaultField
                                label={'Ref'}
                                value={'AGRE1012'}
                                valueBackgroundColor={'#f8f9fa'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                            <DefaultField
                                label={'Nom de l’assuré'}
                                value={'09-12-2019'}
                                valueBackgroundColor={'#fff'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                            <DefaultField
                                label={'Ref'}
                                value={'AGRE1012'}
                                valueBackgroundColor={'#f8f9fa'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                        </Col>
                        <Col md={6}>
                            <DefaultField
                                label={'Ref'}
                                value={'AGRE1012'}
                                valueBackgroundColor={'#f8f9fa'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                            <DefaultField
                                label={'Date Agrément'}
                                value={'09-12-2019'}
                                valueBackgroundColor={'#fff'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                            <DefaultField
                                label={'Ref'}
                                value={'AGRE1012'}
                                valueBackgroundColor={'#f8f9fa'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                            <DefaultField
                                label={'Nom de l’assuré'}
                                value={'09-12-2019'}
                                valueBackgroundColor={'#fff'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                            <DefaultField
                                label={'Ref'}
                                value={'AGRE1012'}
                                valueBackgroundColor={'#f8f9fa'}
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
                        <Col md={6}>
                            <DefaultField
                                label={'Ref'}
                                value={'AGRE1012'}
                                valueBackgroundColor={'#f8f9fa'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                            <DefaultField
                                label={'Date Agrément'}
                                value={'09-12-2019'}
                                valueBackgroundColor={'#fff'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                            <DefaultField
                                label={'Ref'}
                                value={'AGRE1012'}
                                valueBackgroundColor={'#f8f9fa'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                        </Col>
                        <Col md={6}>
                            <DefaultField
                                label={'Ref'}
                                value={'AGRE1012'}
                                valueBackgroundColor={'#f8f9fa'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                            <DefaultField
                                label={'Date Agrément'}
                                value={'09-12-2019'}
                                valueBackgroundColor={'#fff'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                            <DefaultField
                                label={'Ref'}
                                value={'AGRE1012'}
                                valueBackgroundColor={'#f8f9fa'}
                                stripped={true}
                                labelAlign={'left'}
                                valueAlign={'left'}
                                inline={true}
                            />
                        </Col>
                    </Row>
                    <CheckField
                        text={'Je confirme que ce candidat locataire n’a pas le statut de diplomate, n’est pas une association, et justifie de revenus versés et déclarés à l’étranger'}
                        onChange={this.handleChange}
                    />
                    <Label
                        text={'LOCATAIRE 2'}
                        textAlign={'center'}
                    />
                    <Row>
                        <Col md={6}>
                            <DefaultField
                                label={'Ref'}
                                value={'AGRE1012'}
                                valueBackgroundColor={'#f8f9fa'}
                                stripped={true}
                                labelAlign={'right'}
                                valueAlign={'left'}
                                inline={true}
                            />
                            <DefaultField
                                label={'Date Agrément'}
                                value={'09-12-2019'}
                                valueBackgroundColor={'#fff'}
                                stripped={true}
                                labelAlign={'right'}
                                valueAlign={'left'}
                                inline={true}
                            />
                            <DefaultField
                                label={'Ref'}
                                value={'AGRE1012'}
                                valueBackgroundColor={'#f8f9fa'}
                                stripped={true}
                                labelAlign={'right'}
                                valueAlign={'left'}
                                inline={true}
                            />
                        </Col>
                        <Col md={6}>
                            <DefaultField
                                label={'Ref'}
                                value={'AGRE1012'}
                                valueBackgroundColor={'#f8f9fa'}
                                stripped={true}
                                labelAlign={'right'}
                                valueAlign={'left'}
                                inline={true}
                            />
                            <DefaultField
                                label={'Date Agrément'}
                                value={'09-12-2019'}
                                valueBackgroundColor={'#fff'}
                                stripped={true}
                                labelAlign={'right'}
                                valueAlign={'left'}
                                inline={true}
                            />
                            <DefaultField
                                label={'Ref'}
                                value={'AGRE1012'}
                                valueBackgroundColor={'#f8f9fa'}
                                stripped={true}
                                labelAlign={'right'}
                                valueAlign={'left'}
                                inline={true}
                            />
                        </Col>
                    </Row>
                    <CheckField
                        text={'Je confirme que ce candidat locataire n’a pas le statut de diplomate, n’est pas une association, et justifie de revenus versés et déclarés à l’étranger'}
                        onChange={this.handleChange}
                    />
                </Grid>
                <IconField
                    icon={'fas fa-building'}
                    font={'40px'}
                    color={'#a2a8b3'}
                    circle={true}
                    checked={true}
                />
                <DefaultField
                    label={'RESULTAT'}
                    value={'REFUS - A SOUMETTRE'}
                    valueColor={'#fc7c7c'}
                    stripped={true}
                    labelAlign={'center'}
                    valueAlign={'center'}
                    inline={true}
                />
            </div>
        );
    }
}

if (document.getElementById('elementFileTemp')) {
    ReactDOM.render(<FileComponentTemp />, document.getElementById('elementFileTemp'));
}


