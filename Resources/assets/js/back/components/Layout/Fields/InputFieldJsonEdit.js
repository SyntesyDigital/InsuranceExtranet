import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/fr';


export default class InputFieldJsonEdit extends Component {

    constructor(props) {
        super(props)
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
                    value='{}'
                    className={this.props.className}
                    placeholder={this.props.data}
                    theme="light_mitsuketa_tribute"
                    locale='fr'
                    colors={{
                        string: "#455660"
                    }}
                    height={this.props.height}
                    width={this.props.width}
                    onChange={this.props.onChange}
                />
            </div>
        )
    }
}

InputFieldJsonEdit.propTypes = {
    label: PropTypes.string,
};

