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

    /**
     * Merge settings along hierarchy. Necessary to final field, for col properties.
     * @param {} node 
     * @param {*} settings 
     */
    mergeSettings(node,settings) {
        const newSettings = node.settings;

        return {
            ...settings,
            ...newSettings
        };
    }

    parseNode(nodes,settings) {


        
        return nodes.map((node, key) => {

            const alignment = node.settings && node.settings.textAlign ? 
                'text-'+node.settings.textAlign : '';

            switch(node.type) {
                case "row":
                    console.log("parseNode :: row (node)",node);

                    return (
                        <Row key={key} className={alignment}>
                            {node.children != null && 
                                this.parseNode(
                                    node.children,
                                    this.mergeSettings(node,settings)
                                )
                            }
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
                            className={"container-fields-default border-right "+(" "+alignment)}
                        >
                            {node.children != null && 
                                this.parseNode(
                                    node.children,
                                    this.mergeSettings(node,settings)
                                )
                            }
                        </Col>);
                    break;

                default:
                    return this.props.fieldRender(
                        node, 
                        key, 
                        this.mergeSettings(node,settings)
                    );
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