import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TextField from './fields/TextField'
import { Grid, Row, Col } from 'react-bootstrap';
import Label from './fields/Label';
import RadioField from './fields/RadioField';
import YesNoField from './fields/YesNoField';
import YesNoFieldSwitch from '../Forms/fields/YesNoFieldSwitch';
import CheckField from '../ElementCard/fields/CheckField'; // FIXME
import ListField from './fields/ListField';
import CarField from './fields/CarField';
import ModalAddDocument from './ModalAddDocument';
import Stepper from '../Stepper';
import RangeField from '../Forms/fields/RangeField';
import { Separator } from "architect-components-library";
import SearchTopBar from '../SearchTopBar/SearchTopBar';

const steps = [{ title: 'Adresse / Surface' }, { title: 'Détail du risque' }, { title: 'Antécedent' }, { title: 'Projet' }, { title: 'Souscripteur' }, { title: 'Validation' }]

export default class FormComponentTemp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeStep: 2,
            items: [
                {
                    name: 'field01',
                    value: 'Field-01'
                },
                {
                    name: 'field02',
                    value: 'Field-02'
                },
                {
                    name: 'field03',
                    value: 'Field-03'
                },
            ],

            options: [
                {
                    name: 'option01',
                    value: 'Option 1'
                },
                {
                    name: 'option02',
                    value: 'Option 2'
                },
                {
                    name: 'option03',
                    value: 'Option 3'
                },
            ],

            optionsBoolean: [
                {
                    name: 'oui',
                    value: 'Oui'
                },
                {
                    name: 'non',
                    value: 'Non'
                },
            ],

            optionsButton: 'Option 1',

            optionsBooleanButton: 'Oui',

            displayAddDocument: false,

            rangeField: 50,

            rangeField2: 500,

            rangeField3: 1500
        };
    }

    // ==============================
    // Handlers
    // ==============================

    handleAddGroup(e) {
        e.preventDefault();
        console.log("handleAddGroup :: ");
        this.setState({
            displayAddDocument: true
        });
    }

    handleRemoveFields() {
        console.log("handleRemoveObject :: ");
    }

    handleEditFields() {
        console.log("handleEditFields");
    }

    handleFieldChange(name, value) {
        console.log("handleFieldChange :: ", name, value);
        const state = this.state;
        state[name] = value;
        this.setState(state);
    }

    handleModalClose() {
        console.log("handleModalClose :: ");
        this.setState({
            displayAddDocument: false
        });
    }

    // ==============================
    // Renderers
    // ==============================

    render() {
        return (
            <div className="form-component-temp">
                <SearchTopBar></SearchTopBar>
                <ModalAddDocument
                    id={'modal-add-document'}
                    title={'AJOUTER DOCUMENT'}
                    zIndex={10000}
                    size={'small'}
                    display={this.state.displayAddDocument}
                    onModalClose={this.handleModalClose.bind(this)}
                    deleteButton={false}
                    arrayOfOptions={this.state.optionsBoolean}
                />
                <Grid
                    className="layout"
                    fluid={true}>
                    <Row>
                        <Col md={12}>
                            <Label
                                text={'Fiche agrément'}
                                textAlign={'left'}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <TextField
                                label={'Nom du baileur *'}
                                value={this.props.value}
                                name={'nombaileur'}
                                onChange={this.handleFieldChange.bind(this)}
                            />
                        </Col>
                        <Col md={6}>
                            <TextField
                                label={'Prénom du bailleur *'}
                                value={this.props.value}
                                name={'nombaileur'}
                                onChange={this.handleFieldChange.bind(this)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <TextField
                                label={'Nom du baileur *'}
                                value={this.props.value}
                                name={'nombaileur'}
                                onChange={this.handleFieldChange.bind(this)}
                            />
                        </Col>
                        <Col md={3}>
                            <TextField
                                label={'Prénom du bailleur *'}
                                value={this.props.value}
                                name={'nombaileur'}
                                onChange={this.handleFieldChange.bind(this)}
                            />
                        </Col>
                        <Col md={3}>
                            <TextField
                                label={'Prénom du bailleur *'}
                                value={this.props.value}
                                name={'nombaileur'}
                                onChange={this.handleFieldChange.bind(this)}
                            />
                        </Col>
                        <Col md={3}>
                            <TextField
                                label={'Prénom du bailleur *'}
                                value={this.props.value}
                                name={'nombaileur'}
                                onChange={this.handleFieldChange.bind(this)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <TextField
                                label={'Prénom du bailleur *'}
                                value={this.props.value}
                                name={'nombaileur'}
                                onChange={this.handleFieldChange.bind(this)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <div className="col-md-12 buttons-group text-center">
                            <button type="submit" className="btn btn-primary btn-rounded btn-1">
                                Valider
                            </button>
                        </div>
                    </Row>
                </Grid>

                <Grid
                    className="layout"
                    fluid={true}
                >
                    <Row>
                        <Col md={12}>
                            <Label
                                text={'Calcul agrément'}
                                textAlign={'left'}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <TextField
                                label={'Nom du baileur *'}
                                value={this.props.value}
                                name={'nombaileur'}
                                onChange={this.handleFieldChange.bind(this)}
                            />
                        </Col>
                        <Col md={6}>
                            <TextField
                                label={'Prénom du bailleur *'}
                                value={this.props.value}
                                name={'nombaileur'}
                                onChange={this.handleFieldChange.bind(this)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <TextField
                                label={'Nom du baileur *'}
                                value={this.props.value}
                                name={'nombaileur'}
                                onChange={this.handleFieldChange.bind(this)}
                            />
                        </Col>
                        <Col md={4}>
                            <TextField
                                label={'Prénom du bailleur *'}
                                value={this.props.value}
                                name={'nombaileur'}
                                onChange={this.handleFieldChange.bind(this)}
                            />
                        </Col>
                        <Col md={4}>
                            <TextField
                                label={'Prénom du bailleur *'}
                                value={this.props.value}
                                name={'nombaileur'}
                                onChange={this.handleFieldChange.bind(this)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <RadioField
                                label={'Radio buttons'}
                                arrayOfOptions={this.state.options}
                                name={'optionsButton'}
                                value={this.state.optionsButton}
                                onChange={this.handleFieldChange.bind(this)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <label class="bmd-label-floating" style={{position: "relative", top: "30px"}}>Radio buttons yes/no</label>
                            <YesNoField
                                arrayOfOptions={this.state.optionsBoolean}
                                name={'optionsBooleanButton'}
                                value={this.state.optionsBooleanButton}
                                onChange={this.handleFieldChange.bind(this)}
                                text={'Fumé ou tapoté ces deux dernières années ? *'}
                            />
                        </Col>
                    </Row>
                </Grid>
                <Grid
                    className="layout"
                    fluid={true}

                >
                    <Row>
                        <Col md={6}>
                            <YesNoFieldSwitch
                                label={'Protection juridique'}
                                label1={'Non'}
                                label2={'Oui'}
                                onChange={this.handleFieldChange.bind(this)}
                                name={'checkedA'}
                                identifier={'checkedA'}
                            />
                            <YesNoFieldSwitch
                                label={'Autres dommages non dénommés'}
                                label1={'Non'}
                                label2={'Oui'}
                                onChange={this.handleFieldChange.bind(this)}
                                name={'checkedB'}
                                identifier={'checkedB'}
                            />
                        </Col>
                        <Col md={6}>
                            
                        </Col>
                    </Row>
                </Grid>
                <Grid
                    className="layout"
                    fluid={true}

                >
                    <Row>
                        <Col md={12}>
                            <Label
                                text={'Etapes'}
                                textAlign={'left'}
                            />
                            <Stepper
                                steps={steps}
                                activeStep={this.state.activeStep}
                                showNumber={true}
                            />
                        </Col>
                    </Row>
                    <Separator height={50} />
                    <Row>
                        <Col md={12}>
                            <Label
                                text={'Jauges'}
                                textAlign={'left'}
                            />
                            <RangeField
                                label={'Lorem Ipsum is simply dummy text of the printin'}
                                minValue={10}
                                maxValue={500}
                                value={this.state.rangeField}
                                onChange={this.handleFieldChange.bind(this)}
                                name={'rangeField'}
                            />
                             <RangeField
                                label={'Lorem Ipsum is simply dummy '}
                                minValue={10}
                                maxValue={1000}
                                value={this.state.rangeField2}
                                onChange={this.handleFieldChange.bind(this)}
                                name={'rangeField2'}
                            />
                             <RangeField
                                label={'Lorem ip'}
                                minValue={10}
                                maxValue={1000}
                                value={this.state.rangeField3}
                                onChange={this.handleFieldChange.bind(this)}
                                name={'rangeField3'}
                            />
                        </Col>
                    </Row>
                    <Separator height={50} />
                </Grid>


                <Grid
                    className="layout"
                    fluid={true}
                >
                </Grid>
            </div >
        );
    }
}

if (document.getElementById('elementFormTemp')) {
    ReactDOM.render(<FormComponentTemp />, document.getElementById('elementFormTemp'));
}

