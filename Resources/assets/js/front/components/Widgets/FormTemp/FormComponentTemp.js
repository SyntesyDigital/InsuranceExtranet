import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TextField from './fields/TextField'
import { Grid, Row, Col } from 'react-bootstrap';
import Label from './fields/Label';
import RadioField from './fields/RadioField';
import YesNoField from './fields/YesNoField';
import CheckField from '../FileTemp/fields/CheckField';
import ListField from './fields/ListField';
import CarField from './fields/CarField';
import ModalAddDocument from './ModalAddDocument';


export default class FormComponentTemp extends Component {

    constructor(props) {
        super(props);

        this.state = {

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

            displayAddDocument: false
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
                                text={'CALCUL AGRÉMENT'}
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
                        <Col md={12}>
                            <Label
                                text={'FICHE AGRÉMENT'}
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
                        <Col md={12}>
                            <CheckField
                                text={'Je confirme que ce candidat locataire n’a pas le statut de diplomate, n’est pas une association, et justifie de revenus versés et déclarés à l’étranger'}
                                onChange={this.handleFieldChange.bind(this)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <div className="col-md-12 buttons-group text-center">
                            <button type="submit" className="btn btn-primary btn-rounded">
                                <i className="fas fa-sign-in-alt"></i> Valider
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
                                text={'CALCUL AGRÉMENT'}
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
                        <Col md={12}>
                            <Label
                                text={'DOMMAGES'}
                                textAlign={'left'}
                            />
                            <CarField
                                onChange={this.handleFieldChange.bind(this)}
                                name={'carfield'}
                            />
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
                                text={'DOCUMENTS'}
                                textAlign={'left'}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <ListField
                            identifier={'box-add-document'}
                            icon={'fa fa-file'}
                            arrayOfFields={this.state.items}
                            onEdit={this.handleEditFields.bind(this)}
                            onRemove={this.handleRemoveFields.bind(this)}
                            onAdd={this.handleAddGroup.bind(this)}
                        />
                    </Row>
                </Grid>
            </div >
        );
    }
}

if (document.getElementById('elementFormTemp')) {
    ReactDOM.render(<FormComponentTemp />, document.getElementById('elementFormTemp'));
}

