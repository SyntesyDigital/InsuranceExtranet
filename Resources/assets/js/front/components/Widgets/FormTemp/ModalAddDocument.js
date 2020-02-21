import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import Label from './fields/Label';
import CheckField from '../FileTemp/fields/CheckField';
// import RadioField from './fields/RadioField';
import TextField from './fields/TextField';
import { Grid, Row, Col } from 'react-bootstrap';


export default class ModalAddDocument extends Component {

    constructor(props) {
        super(props);
        this.state = {

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
                icon={this.props.icon}
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
                            <Label
                                text={'Ajouter Dcoument'}
                                textAlign={'left'}
                            />
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
                                <Col md={6}>
                                    <p>Fumé ou tapoté ces deux dernières années ? *</p>
                                </Col>
                                <Col md={6}>
                                   
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

