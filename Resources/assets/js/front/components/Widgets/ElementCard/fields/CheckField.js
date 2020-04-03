import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';;

export default class CheckField extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { 
            label, 
            stripped,
            checked,
            valueAlign
        } = this.props;
    
        const divStyle = {
            overflow: 'hidden',
          }
        const divValue = {
            textAlign: valueAlign,
            padding: '8px',
          }
        const labelStyle = {
            padding: '8px',
            marginBottom: '0'
        };
        const checkStyle = {
            padding: '8px',
            marginBottom: '0',
            paddingTop:'12px'
        };

        return (
            <div style={divStyle} className={(stripped ? 'stripped' : null)}>
                <Row>
                    <Col sm={1} style={checkStyle} className="text-right">
                        {checked && 
                            <i className="fas fa-check-square"></i>
                        }
                        {!checked && 
                            <i className="far fa-square"></i>
                        }
                    </Col>
                    <Col sm={11} style={divValue}>
                        <span style={labelStyle}>{label}</span>
                    </Col>
                </Row>
            </div>
        );
    }
}

CheckField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    stripped: PropTypes.bool,
};
