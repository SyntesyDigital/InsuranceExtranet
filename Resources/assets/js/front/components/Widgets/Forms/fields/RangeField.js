import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

export default class RangeField extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            active: '',
            range: null
        }
    }

    handleChange(value) {
        console.log("handleChange :: ", value)
        // this.props.onChange(this.props.name, value);
        this.setState({
            range: value
        })
        if (this.state.range <= (this.props.minValue + 20)) {
            this.setState({
                active: 'hidden-label-right'
            });
        } else if ((this.state.range >= (this.props.maxValue - 20))) {
            this.setState({
                active: 'hidden-label-left'
            });
        } else {
            this.setState({
                active: ''
            })
        };
    }

    render() {
        const rangeLabels = {
            0: this.props.minValue + '€',
            1000: this.props.maxValue + '€'
        }

        const { field } = this.props;

        const errors = this.props.error ? 'is-invalid' : '';

        let isRequired = field.rules.required !== undefined ?
            field.rules.required : false;

        let isHidden = field.settings.hidden !== undefined && field.settings.hidden != null ?
            field.settings.hidden : false;

        let isHideLabel = field.settings.hidelabel !== undefined ?
            field.settings.hidelabel : false;

        return (
            <div className={"range-field"}>
                <div className={`row container-range ${this.state.active}`}>
                    <div className="col-md-2 container-label">
                        <p>
                            {this.props.label}
                            {isRequired &&
                                <span className="required">&nbsp; *</span>
                            }
                        </p>
                    </div>
                    <div className="col-md-8">
                        <Slider
                            min={this.props.minValue}
                            max={this.props.maxValue}
                            value={this.props.value}
                            labels={rangeLabels}
                            handleLabel={this.props.value + '€'}
                            onChange={this.handleChange.bind(this)}
                        />
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
