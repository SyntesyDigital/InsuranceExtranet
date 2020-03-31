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
                    sm = sm ? sm[1] : 12;
                    md = md ? md[1] : 12;

                    return (
                        <Col 
                            key={key} 
                            sm={sm}
                            md={md}
                            className={"container-fields-default"}
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