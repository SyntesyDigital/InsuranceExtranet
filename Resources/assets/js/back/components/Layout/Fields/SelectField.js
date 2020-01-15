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

        const selectStyle = {
            backgroundImage: 'linear-gradient(45deg, transparent 50%, gray 50%), linear-gradient(135deg, gray 50%, transparent 50%), linear-gradient(to right, #ccc, #ccc)',
            backgroundPosition: 'calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em',
            backgroundSize: '5px 5px, 5px 5px, 1px 1.5em',
            backgroundRepeat: 'no-repeat',
            borderBottom: '1px solid #ccc',
        };

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
                <select className="form-control" name="customSearch" onChange={this.handleChange.bind(this)} style={selectStyle}>
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
