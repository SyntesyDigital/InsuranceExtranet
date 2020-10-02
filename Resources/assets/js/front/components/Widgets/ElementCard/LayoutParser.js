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
    mergeSettings(node, settings) {
        const newSettings = node.settings;

        return {
            ...settings,
            ...newSettings
        };
    }

    parseNode(nodes, settings) {

        return nodes.map((node, key) => {

            const alignment = node.settings && node.settings.textAlign ?
                'text-' + node.settings.textAlign : '';

            const border = node.settings && node.settings.hideBorders ?
                '' : 'border-right';

            const box = node.settings && node.settings.boxClass ?
                node.settings.boxClass
                : '';

            const display = node.settings && node.settings.displayInline == true ?
                'display_inline'
                : '';

            const label = node.settings && node.settings.displayLabel == true ?
                'display_label'
                : '';


            switch (node.type) {
                case "row":
                    // console.log("parseNode :: row (node)", node);

                    if (!this.props.checkVisibility(node))
                        return null;

                    return (
                        <Row
                            key={key}
                            className={
                                (" " + alignment) +
                                (" " + box) +
                                (" " + display) +
                                (" " + label)
                            }
                        >
                            {node.children != null &&
                                this.parseNode(
                                    node.children,
                                    this.mergeSettings(node, settings)
                                )
                            }
                        </Row>);
                    break;

                case "col":
                    // console.log("parseNode :: col (node)", node.settings.boxClass);

                    if (!this.props.checkVisibility(node))
                        return null;

                    return (
                        <div
                            key={key}
                            className={
                                "container-fields-default" +
                                (" " + node.colClass) +
                                (" " + border) +
                                (" " + alignment) +
                                (" " + box) +
                                (" " + display) +
                                (" " + label)
                            }
                        >
                            {node.children != null &&
                                this.parseNode(
                                    node.children,
                                    this.mergeSettings(node, settings)
                                )
                            }
                        </div>);
                    break;

                default:

                    if (!this.props.checkVisibility(node.field))
                        return null;

                    return this.props.fieldRender(
                        node,
                        key,
                        this.mergeSettings(node, settings)
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