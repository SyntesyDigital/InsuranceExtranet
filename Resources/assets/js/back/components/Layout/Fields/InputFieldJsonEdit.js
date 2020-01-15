import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';



export default class InputFieldJsonEdit extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { title } = this.props;
        return (
            <div style={{ maxWidth: "1400px", maxHeight: "100%" }}>
                 <label className="bmd-label-floating">
                    {title}
                </label>
                <JSONInput
                    id={this.props.id}
                    className={this.props.className}
                    // placeholder={contentData} // data to display
                    theme="light_mitsuketa_tribute"
                    locale={locale}
                    colors={{
                        string: "#455660" 
                    }}
                    height={this.props.height}
                    width={this.props.width}
                />
            </div>
        )
    }
}

InputFieldJsonEdit.propTypes = {
    title: PropTypes.string,
};
