import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TextField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addClassBordered: false,
        }
    }

    // ==============================
    // Handlers
    // ==============================

    handleOnChange(e) {
        this.props.onChange(this.props.name, e.target.value);
    }

    handleBlur(e){
        if (e.target.value != '') {
            this.setState({ 
                addClassBordered: true 
            });
        }else{
            this.setState({ 
                addClassBordered: false 
            });
        }
    }

    handleFocus(e){
        if (e.target.value != '') {
            this.setState({ 
                addClassBordered: false
            });
        }else{
            this.setState({ 
                addClassBordered: true
            });
        }
    }  
    
    // ==============================
    // Renderers
    // ==============================

    render() {
        const { label, error } = this.props;
        let textFieldClass = ["text-field"];
        if (this.state.addClassBordered) {
            textFieldClass.push('bordered');
        }
        return (
            <div className={"form-group bmd-form-group" + (error ? ' has-error' : '')}>
                <label className="bmd-label-floating">
                    {label}
                </label>
                <input
                    type="text"
                    className={"form-control " + (textFieldClass.join(' '))}
                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.handleOnChange.bind(this)}
                    onBlur={this.handleBlur.bind(this)}
                    onFocus={this.handleFocus.bind(this)}
                />
            </div>
        );
    }
}

TextField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    isFilled: PropTypes.bool,
    onChange: PropTypes.func
};
