import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/fr';


export default class InputFieldJsonEdit extends Component {

    constructor(props) {
        super(props)
    }

    handleChange(data){

        //console.log("InputFieldJsonEdit :: handleChange (e)",e);

        this.props.onChange(this.props.name,data.plainText);
    }

    render() {
        const { label } = this.props;
        return (
            <div style={{ maxWidth: "1400px", maxHeight: "100%" }}>
                <label className="bmd-label-floating">
                    {label}
                </label>
                <JSONInput
                    id={this.props.id}
                    value={this.props.value}
                    className={this.props.className}
                    theme="light_mitsuketa_tribute"
                    locale='fr'
                    colors={{
                        string: "#455660"
                    }}
                    height={this.props.height}
                    width={this.props.width}
                    onChange={this.handleChange.bind(this)}
                />
            </div>
        )
    }
}

InputFieldJsonEdit.propTypes = {
    label: PropTypes.string,
};

