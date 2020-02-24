import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TextField from './fields/TextField'
import { Grid, Row, Col } from 'react-bootstrap';
import Label from './fields/Label';
import RadioField from './fields/RadioField';
import CheckField from '../FileTemp/fields/CheckField';
import ListField from './fields/ListField';
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

            displayAddDocument: false
        };
    }

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
        console.log("handleFieldChange :: ", name, value)
    }

    handleModalClose() {
        console.log("handleModalClose :: ");
        this.setState({
            displayAddDocument: false
        });
    }


    render() {
        return (
            <div className="form-component-temp">
                <ModalAddDocument
                    id={'modal-edit-fields'}
                    icon={'fas fa-file'}
                    zIndex={10000}
                    display={this.state.displayAddDocument}
                    onModalClose={this.handleModalClose.bind(this)}
                    deleteButton={false}
                />
                <Grid
                    className="layout"
                    fluid={true}>
                    <Row>
                        <Label
                            text={'CALCUL AGRÉMENT'}
                            textAlign={'left'}
                        />
                    </Row>
                    <Row>
                        <Col md={6}>
                            <TextField
                                label={'Nom du baileur *'}
                                value={this.props.value}
                                name={'nombaileur'}
                                onChange={this.handleFieldChange.bind(this)}
                                isFilled={true}
                            />
                        </Col>
                        <Col md={6}>
                            <TextField
                                label={'Prénom du bailleur *'}
                                value={this.props.value}
                                name={'nombaileur'}
                                onChange={this.handleFieldChange.bind(this)}
                                isFilled={true}
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
                                isFilled={true}
                            />
                        </Col>
                        <Col md={4}>
                            <TextField
                                label={'Prénom du bailleur *'}
                                value={this.props.value}
                                name={'nombaileur'}
                                onChange={this.handleFieldChange.bind(this)}
                                isFilled={true}
                            />
                        </Col>
                        <Col md={4}>
                            <TextField
                                label={'Prénom du bailleur *'}
                                value={this.props.value}
                                name={'nombaileur'}
                                onChange={this.handleFieldChange.bind(this)}
                                isFilled={true}
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
                                isFilled={true}
                            />
                        </Col>
                        <Col md={3}>
                            <TextField
                                label={'Prénom du bailleur *'}
                                value={this.props.value}
                                name={'nombaileur'}
                                onChange={this.handleFieldChange.bind(this)}
                                isFilled={true}
                            />
                        </Col>
                        <Col md={3}>
                            <TextField
                                label={'Prénom du bailleur *'}
                                value={this.props.value}
                                name={'nombaileur'}
                                onChange={this.handleFieldChange.bind(this)}
                                isFilled={true}
                            />
                        </Col>
                        <Col md={3}>
                            <TextField
                                label={'Prénom du bailleur *'}
                                value={this.props.value}
                                name={'nombaileur'}
                                onChange={this.handleFieldChange.bind(this)}
                                isFilled={true}
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
                                isFilled={true}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Label
                            text={'FICHE AGRÉMENT'}
                            textAlign={'left'}
                        />
                    </Row>
                    <Row>
                        <Col md={6}>
                            <TextField
                                label={'Nom du baileur *'}
                                value={this.props.value}
                                name={'nombaileur'}
                                onChange={this.handleFieldChange.bind(this)}
                                isFilled={true}
                            />
                        </Col>
                        <Col md={6}>
                            <TextField
                                label={'Prénom du bailleur *'}
                                value={this.props.value}
                                name={'nombaileur'}
                                onChange={this.handleFieldChange.bind(this)}
                                isFilled={true}
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
                                isFilled={true}
                            />
                        </Col>
                        <Col md={3}>
                            <TextField
                                label={'Prénom du bailleur *'}
                                value={this.props.value}
                                name={'nombaileur'}
                                onChange={this.handleFieldChange.bind(this)}
                                isFilled={true}
                            />
                        </Col>
                        <Col md={3}>
                            <TextField
                                label={'Prénom du bailleur *'}
                                value={this.props.value}
                                name={'nombaileur'}
                                onChange={this.handleFieldChange.bind(this)}
                                isFilled={true}
                            />
                        </Col>
                        <Col md={3}>
                            <TextField
                                label={'Prénom du bailleur *'}
                                value={this.props.value}
                                name={'nombaileur'}
                                onChange={this.handleFieldChange.bind(this)}
                                isFilled={true}
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
                                isFilled={true}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <CheckField
                                text={'Je confirme que ce candidat locataire n’a pas le statut de diplomate, n’est pas une association, et justifie de revenus versés et déclarés à l’étranger'}
                                onChange={this.handleChange}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <div className="col-md-12 buttons-group">
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
                        <Label
                            text={'CALCUL AGRÉMENT'}
                            textAlign={'left'}
                        />
                    </Row>
                    <Row>
                        <Col md={6}>
                            <TextField
                                label={'Nom du baileur *'}
                                value={this.props.value}
                                name={'nombaileur'}
                                onChange={this.handleFieldChange.bind(this)}
                                isFilled={true}
                            />
                        </Col>
                        <Col md={6}>
                            <TextField
                                label={'Prénom du bailleur *'}
                                value={this.props.value}
                                name={'nombaileur'}
                                onChange={this.handleFieldChange.bind(this)}
                                isFilled={true}
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
                                isFilled={true}
                            />
                        </Col>
                        <Col md={4}>
                            <TextField
                                label={'Prénom du bailleur *'}
                                value={this.props.value}
                                name={'nombaileur'}
                                onChange={this.handleFieldChange.bind(this)}
                                isFilled={true}
                            />
                        </Col>
                        <Col md={4}>
                            <TextField
                                label={'Prénom du bailleur *'}
                                value={this.props.value}
                                name={'nombaileur'}
                                onChange={this.handleFieldChange.bind(this)}
                                isFilled={true}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <RadioField
                                label={'Radio buttons'}
                                arrayOfOptions={this.state.options}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <RadioField
                                arrayOfOptions={this.state.optionsBoolean}
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
                        <Label
                            text={'DOCUMENTS'}
                            textAlign={'left'}
                        />
                    </Row>
                    <Row>
                        <ListField
                            // key={index}
                            identifier={'id_identifier'}
                            // index={index}
                            icon={'fa fa-file'}
                            arrayOfFields={this.state.items}
                            onEdit={this.handleEditFields.bind(this)}
                            onRemove={this.handleRemoveFields.bind(this)}
                            onAdd={this.handleAddGroup.bind(this)}
                        />
                    </Row>
                </Grid>
            </div>
        );
    }
}

if (document.getElementById('elementFormTemp')) {
    ReactDOM.render(<FormComponentTemp />, document.getElementById('elementFormTemp'));
}

