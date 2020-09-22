import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import LabelTooltip from '../../../Common/LabelTooltip';

export default class DefaultField extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { label, value, valueColor, valueBackgroundColor, stripped, labelAlign, valueAlign, inline } = this.props;

        const divStyle = {
            overflow: 'hidden',
        }
        const divLabel = {
            textAlign: labelAlign
        }
        const divValue = {
            textAlign: valueAlign
        }
        const labelStyle = {
            padding: '8px',
            marginBottom: '0'
        };
        const spanStyles = {
            backgroundColor: valueBackgroundColor,
            textAlign: labelAlign,
            color: valueColor,
            borderRadius: '5px',
            padding: '8px',
            marginBottom: '0',
            maxWidth: '100%',
            display: 'inline-block',
        };

        let hasDescription = this.props.settings.description !== undefined ?
            this.props.settings.description : false;

        return (
            <div style={divStyle} className={(stripped ? 'stripped' : null)}>
                <Row>
                    <Col md={!inline ? 12 : 6} style={divLabel}>
                        <label style={labelStyle}
                            dangerouslySetInnerHTML={{ __html: label }}
                        >
                        </label>
                        {hasDescription && 
                            <LabelTooltip 
                                description={this.props.settings.description ? 
                                    this.props.settings.description : ''}
                            />
                        }
                    </Col>
                    <Col md={!inline ? 12 : 6} style={divValue}>
                        {this.props.icon ? <i className={this.props.icon}></i> : null}
                        <span
                            style={spanStyles}
                            ref={(node) => {
                                if (node) {
                                    node.style.setProperty("background-color", valueBackgroundColor, "important");
                                }
                            }}
                            className={valueAlign == 'center' ? 'value-center' : null}
                            dangerouslySetInnerHTML={{ __html: value }}
                        >
                        </span>
                    </Col>
                </Row>
            </div>
        );
    }
}

DefaultField.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    valueColor: PropTypes.string,
    valueBackgroundColor: PropTypes.string,
    stripped: PropTypes.bool,
    labelAlign: PropTypes.string,
    valueAlign: PropTypes.string,
    inline: PropTypes.bool,
    icon: PropTypes.string
};
