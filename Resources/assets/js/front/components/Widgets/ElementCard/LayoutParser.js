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
                    let sm = /col-xs-(.*?)(?:\s|$)/g.exec(node.colClass);
                    let md = /col-sm-(.*?)(?:\s|$)/g.exec(node.colClass);

                    return (
                        <Col 
                            key={key} 
                            sm={sm ? parseInt(sm[1]) : 12}
                            md={md ? parseInt(md[1]) : 12}
                            className={"container-fields-default"}
                        >
                            {this.parseNode(node.children)}
                        </Col>);
                    break;

                default:
                    return this.props.fieldRender(node, key);
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