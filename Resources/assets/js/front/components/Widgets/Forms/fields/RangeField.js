import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import LabelTooltip from './../../../Common/LabelTooltip';

export default class RangeField extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            active: '',
        }
    }

    handleChange(value) {

        this.props.onFieldChange({
            name: this.props.field.identifier,
            value: value
        });

        if (value <= (this.props.minValue + 20)) {
            this.setState({
                active: 'hidden-label-right'
            });
        } else if ((value >= (this.props.maxValue - 20))) {
            this.setState({
                active: 'hidden-label-left'
            });
        } else {
            this.setState({
                active: ''
            });
        };
    }

    getNumberFromRules(key) {
        const { rules } = this.props.field;

        if (rules[key] !== undefined && rules[key] != null && rules[key] != '') {
            return rules[key];
        }

        return '';
    }

    getMinValue() {
        var min = parseInt(this.getNumberFromRules('minNumber'));
        return min;
    }

    getMaxValue() {
        var max = parseInt(this.getNumberFromRules('maxNumber'));
        return max;
    }

    render() {

        const rangeLabels = {
            0: this.getMinValue() + '€',
            1000: this.getMaxValue() + '€'
        }

        const { field } = this.props;

        const errors = this.props.error ? 'is-invalid' : '';

        let isRequired = field.rules.required !== undefined ?
            field.rules.required : false;

        let isHidden = field.settings.hidden !== undefined && field.settings.hidden != null ?
            field.settings.hidden : false;

        let hasDescription = field.settings.description !== undefined ?
            field.settings.description : false;

        let isHideLabel = field.settings.hidelabel !== undefined ?
            field.settings.hidelabel : false;

        let isLabelInline = field.settings.labelInline !== undefined ?
            field.settings.labelInline : false;

        var colClassLabel = isLabelInline ?
            'field-container-col col-xs-5' :
            'field-container-col col-xs-12';

        var colClassInput = isLabelInline ?
            'field-container-col col-xs-7' :
            'field-container-col col-xs-12';

        return (
            <div className={"form-group bmd-form-group " + (errors) + " " + (isHidden ? ' hidden' : '')}>
                <div className={"range-field"}>
                    <div className={`row field-container container-range ${this.state.active}`}>
                        <div className={`container-label ${colClassLabel}`}>
                            {!isHideLabel &&
                                <label className={'bmd-label-floating'}>
                                    {field.name}
                                    {isRequired &&
                                        <span className="required">&nbsp; *</span>
                                    }
                                    {hasDescription &&
                                        <LabelTooltip
                                            description={field.settings.description ?
                                                field.settings.description : ''}
                                        />
                                    }
                                </label>
                            }
                        </div>
                        <div className={colClassInput}>
                            <Slider
                                min={this.getMinValue()}
                                max={this.getMaxValue()}
                                value={this.props.value}
                                labels={rangeLabels}
                                handleLabel={this.props.value + '€'}
                                onChange={this.handleChange.bind(this)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

RangeField.defaultProps = {
    minValue: 10,
    maxValue: 500,
    value: 50
};

RangeField.propTypes = {
    label: PropTypes.string,
    maxValue: PropTypes.number,
    minValue: PropTypes.number,
    onChange: PropTypes.func
};
