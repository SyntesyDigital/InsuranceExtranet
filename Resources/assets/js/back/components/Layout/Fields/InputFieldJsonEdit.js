import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/fr';


export default class InputFieldJsonEdit extends Component {

    constructor(props) {
        super(props)
    }

    handleChange(data){

        console.log("InputFieldJsonEdit :: handleChange (e)",data);

        if(!data.error){
            this.props.onChange(this.props.name,data.json);
        }
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
                    placeholder={this.props.placeholder}
                    className={this.props.className}
                    theme="light_mitsuketa_tribute"
                    locale={locale}
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

