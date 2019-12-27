import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default  class SelectField extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {
        return (
            <div className="form-group bmd-form-group sidebar-item">
                <label htmlFor="parent_id" className="bmd-label-floating">
                    Select label
                </label>
                <select className="form-control" id="parent_id" name="parent_id" value={'1'} >
                    <option value="">---</option>
                    <option value="1">Option 1</option>
                </select>
            </div>
        );
    }
}

SidebarTitle.propTypes = {
};
