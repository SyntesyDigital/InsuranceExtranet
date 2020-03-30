import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Grid, Row, Col } from 'react-bootstrap';

export default class LayoutParser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            layout: this.props.layout
        };
    }

    parseNode(nodes) {
        return nodes.map((node, key) => {
            switch(node.type) {
                case "row":
                    return (
                        <Row key={key}>
                            {this.parseNode(node.children)}
                        </Row>);
                    break;

                case "col":
                    let classes = node.colClass.split(' ');
                    return (
                        <Col 
                            key={key} 
                            sm={classes[0] !== undefined ? parseInt(classes[0]) : 12} 
                            sm={classes[1] !== undefined ? parseInt(classes[1]) : 12} 
                            className="container-fields-default border-right"
                        >
                            {this.parseNode(node.children)}
                        </Col>);
                    break;

                default:
                    return this.props.fieldRender(node);
                    break;
            }
        });
    }

    render() {
        return (
            <div>
                {this.parseNode(this.props.layout)}
            </div>
        );
    }



}