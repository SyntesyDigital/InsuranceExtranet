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
        this.props.onChange(this.props.name, value);
        this.setState({
            range: value
        })
        if(this.state.range <= (this.props.minValue + 20 )) { 
            this.setState({
                active: 'hidden-label-right'
            });
        }else if ((this.state.range >= (this.props.maxValue - 20 ))){
            this.setState({
                active: 'hidden-label-left'
            });
        }else {
            this.setState({
                active: ''
            })
       }
    }

    render() {
        const rangeLabels = {
            0: this.props.minValue + '€',
            1000: this.props.maxValue + '€'
        }

        return (
            <div className="range-field">
                <div className={`row container-range ${this.state.active}`}>
                    <div className="col-md-2 container-label">
                        <p>{this.props.label}</p>
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

RangeField.propTypes = {
    label: PropTypes.string,
    maxValue: PropTypes.string,
    minValue: PropTypes.string,
    onChange: PropTypes.func
};
