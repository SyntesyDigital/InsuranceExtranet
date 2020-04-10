import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import CheckField from '../ElementCard/fields/CheckField'; // FIXME
import YesNoField from './fields/YesNoField';
import TextField from './fields/TextField';
import { Grid, Row, Col } from 'react-bootstrap';

export default class ModalAddDocument extends Component {

    constructor(props) {
        super(props);
        this.state = {
            optionsBooleanButton: 'Oui'
        }
    }

    // ==============================
    // Handlers
    // ==============================

    handleCancel() {
        console.log("handleCancel :: ");
    }

    handleRadioButtonChange(value, e) {
        console.log("handleRadioButtonChange :: (e,value)", e, value);
    }

    handleFieldChange(name, value) {
        console.log("handleFieldChange :: (name,value)", name, value);
        const state = this.state;
        state[name] = value;
        this.setState(state);
    }

    handleSubmit() {
        console.log("handleSubmit :: ");
    }

    // ==============================
    // Renderers
    // ==============================

    render() {
        return (
            <Modal
                id={this.props.id}
                title={this.props.title}
                display={this.props.display}
                zIndex={10000}
                onModalClose={this.props.onModalClose}
                onCancel={this.handleCancel.bind(this)}
                onSubmit={this.handleSubmit.bind(this)}
                size={'small'}
                deleteButton={false}
                cancelButton={false}
            >
                <div className="row">
                    <div className="col-xs-12 field-col">
                        <Grid
                            className="layout"
                            fluid={true}>
                            <Row>
                                <Col md={12}>
                                    <TextField
                                        label={'Nom du baileur *'}
                                        value={this.props.value}
                                        name={'nombaileur'}
                                        onChange={this.handleFieldChange.bind(this)}
                                        isFilled={true}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
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
                                    <TextField
                                        label={'Nom du baileur *'}
                                        value={this.props.value}
                                        name={'nombaileur'}
                                        onChange={this.handleFieldChange.bind(this)}
                                        isFilled={true}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
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
                                    <TextField
                                        label={'Nom du baileur *'}
                                        value={this.props.value}
                                        name={'nombaileur'}
                                        onChange={this.handleFieldChange.bind(this)}
                                        isFilled={true}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <YesNoField
                                        arrayOfOptions={this.props.arrayOfOptions}
                                        name={'optionsBooleanButton'}
                                        value={this.state.optionsBooleanButton}
                                        onChange={this.handleFieldChange.bind(this)}
                                        text={'Fumé ou tapoté ces deux dernières années ? *'}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <CheckField
                                        text={'Je confirme que ce candidat locataire n’a pas le statut de diplomate, n’est pas une association, et justifie de revenus versés et déclarés à l’étranger *'}
                                    />
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </div>
            </Modal>
        );
    }
}

ModalAddDocument.propTypes = {
    id: PropTypes.string.isRequired,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    display: PropTypes.bool.isRequired,
    zIndex: PropTypes.number.isRequired,
    size: PropTypes.string.isRequired,

    onSubmit: PropTypes.func,
    onCancel: PropTypes.func
};

