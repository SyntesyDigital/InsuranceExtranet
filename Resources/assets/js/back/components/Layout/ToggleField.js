import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default  class ToggleField extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {
        const {title, disabled, checked} = this.props;
        return (
            <div>
                <div className="togglebutton">
                    <label>
                        {title}
                        <input type="checkbox" name="name" checked={checked} disabled={disabled} />
                    </label>
                </div>
                <div className="togglebutton">
                    <label>
                        {title}
                        <input type="checkbox" name="name" checked={checked} disabled={disabled} />
                    </label>
                </div>
                <div className="togglebutton">
                    <label>
                        {title}
                        <input type="checkbox" name="name" checked={checked} disabled={disabled} />
                    </label>
                </div>
            </div>
            
        );
    }
}

ToggleField.propTypes = {
    title: PropTypes.string,
    disabled: PropTypes.bool,
    checked: PropTypes.bool
};
