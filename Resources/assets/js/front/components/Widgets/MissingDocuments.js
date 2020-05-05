import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import Label from './FormTemp/fields/Label';


export default class MissingDocuments extends Component {

    constructor(props) {

        super(props);

        this.state = {
        };

    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="missing-documents-component">
                <Grid
                    className="layout"
                    fluid={true}>
                    <Row>
                        <Col md={12}>
                            <Label
                                text={'PIÈCES MANQUANTES'}
                                textAlign={'left'}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <div class="wrapper">
                                <div class="box box-state-01">
                                    <p>Un exemplaire du devoir de conseil signé</p>
                                    <span className="icon-wrapper"><i class="far fa-file"></i></span>
                                    <p className="text-file"><i class="fas fa-paperclip"></i>{" "}Déposer le document</p>
                                </div>
                                <div class="box box-state-02">
                                    <p>Un exemplaire du devoir de conseil signé</p>
                                    <span className="icon-wrapper"><i class="far fa-file"></i></span>
                                    <p className="text-file"><i class="fas fa-paperclip"></i>{" "}nom_document.pdf</p>
                                    <button type="submit" class="btn btn-rounded">Envoyer{" "}<i class="far fa-paper-plane"></i></button>
                                </div>
                                <div class="box box-state-03">
                                    <p>Un exemplaire du devoir de conseil signé</p>
                                    <span className="icon-wrapper"><i class="fas fa-check-circle"></i></span>
                                    <p className="text-success"><i class="fas fa-paperclip"></i>{" "}Document envoyé</p>
                                </div>
                            </div>
                        </Col>
                        {/* <Col md={12} className="buttons-group text-center">
                            <button type="submit" class="btn btn-rounded">Envoyer{" "}<i class="far fa-paper-plane"></i></button>
                        </Col> */}
                    </Row>
                </Grid>
            </div>
        );
    }
}

if (document.getElementById('missing-documents')) {
    ReactDOM.render(<MissingDocuments />, document.getElementById('missing-documents'));
}
