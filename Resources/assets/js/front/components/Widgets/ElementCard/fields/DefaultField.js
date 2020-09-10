import React, { Component } from 'react';
import PropTypes from 'prop-types';
import iconSvg from './../assets/img/ico_info.svg';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { Row, Col } from 'react-bootstrap';

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: STYLES.elementFile.backgroundColorTooltipDescFile,
        color: STYLES.elementFile.colorTooltipDescFile,
        maxWidth: 220,
        fontSize: STYLES.elementFile.fontSizeTooltipDescFile,
        borderRadius: 0,
        padding: '15px',
    },
}))(Tooltip);

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
                            <HtmlTooltip
                                title={
                                    <span className={'content-desc'}>
                                        {this.props.settings.description ? this.props.settings.description : ''}
                                    </span>
                                }
                            >
                                <Button>
                                    <img
                                        className={'icon-desc-info'}
                                        src={iconSvg}
                                    />
                                </Button>
                            </HtmlTooltip>
                        }
                    </Col>
                    <Col md={!inline ? 12 : 6} style={divValue}>
                        {this.props.icon ? <i className={this.props.icon}></i> : null}
                        <span
                            style={spanStyles} className={valueAlign == 'center' ? 'value-center' : null}
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
