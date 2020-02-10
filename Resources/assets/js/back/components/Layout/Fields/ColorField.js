import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss'

export default class ColorField extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            displayColorPicker: false,
        };

    }

    handleClick(){
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    }

    handleClose(){
        this.setState({ displayColorPicker: false })
    }

    handleOnChange(event)
    {
        const {field} = this.props;

        this.props.onChange(this.props.name,event.hex);
    }

    render() {

        let {label,value,name} = this.props;

        value !== undefined ? value : '#000';

        const styles = reactCSS({
            'default': {
                color: {
                    background: value
                }
            }
        });

        const inline = this.props.inline !== undefined && this.props.inline ? true : false;

        return (

        <div className={"form-group bmd-form-group color-field "+(inline ? 'inline' : '')}>
            <label className="bmd-label-floating">
                {label}
            </label>

            <div className="color-field-swatch"  onClick={ this.handleClick.bind(this) }>
                <div className="color-field-color" style={ styles.color } />
            </div>
            { this.state.displayColorPicker &&
                <div className="color-field-popover" >
                <div className="color-field-cover"  onClick={ this.handleClose.bind(this) }/>
                <SketchPicker
                    name={name}
                    color={ value }
                    onChange={ this.handleOnChange.bind(this) } />
                </div>
            }
        </div>
        );
    }
}

ColorField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    inline: PropTypes.bool,
};
