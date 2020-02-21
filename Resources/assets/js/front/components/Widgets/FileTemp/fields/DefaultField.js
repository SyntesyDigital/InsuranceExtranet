import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';


export default class DefaultField extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { label, value, valueColor, valueBackgroundColor, stripped, labelAlign, valueAlign, inline } = this.props;

    const gridStyle = {
      backgroundColor: valueBackgroundColor
    }
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
      marginBottom: '15px'
    };
    const valueStyles = {
      backgroundColor: valueColor,
      textAlign: labelAlign,
      paddingTop: '10px',
      paddingBottom: '10px',
      paddingLeft: '15px',
      paddingRight: '15px',
      borderRadius: '5px',
      display: 'inline-block'
    };

    return (
      <div style={divStyle}>
        <Grid
          style={gridStyle}
          fluid={true}>
          <Row>
            <Col md={labelAlign == 'center' ? 12 : 6} style={divLabel}>
              <label style={labelStyle}>{label}</label>
            </Col>
            <Col md={labelAlign == 'center' ? 12 : 6} style={divValue}>
              <span style={valueColor ? valueStyles : null}>{value}</span>
            </Col>
          </Row>
        </Grid>
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
  inline: PropTypes.bool
};
