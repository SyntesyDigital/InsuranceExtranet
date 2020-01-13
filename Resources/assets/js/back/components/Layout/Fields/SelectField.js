import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class SelectField extends Component {

    constructor(props){
        super(props)
    }

    handleChange(event)
    {
        let selectedValue = event.target.value;
        this.props.onSelectChange(selectedValue);
    }

    render(){
        const { title } = this.props;
        let arrayOfGroup = this.props.arrayOfGroup;
        let options = arrayOfGroup.map((data) =>
                <option 
                    key={data.id}
                    value={data.id} 
                >
                    {data.name}
                </option>
            );
            
            return (
            <div className="form-group bmd-form-group sidebar-item">
                <label htmlFor="parent_id" className="bmd-label-floating">
                    {title}
                </label>
                <select className="form-control" name="customSearch" onChange={this.handleChange.bind(this)}>
                    <option>Select Item</option>
                    {options}
                </select>
            </div>
        )
    }
}

SelectField.propTypes = {
    title: PropTypes.string
};
