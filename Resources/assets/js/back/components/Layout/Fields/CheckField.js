import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


export default class CheckField extends Component {

    constructor(props) {
        super(props);
        
        this.state = {

            isHovered: false,

        };

        this.toggleHover = this.toggleHover.bind(this);
    }

    // ==============================
    // Handlers
    // ==============================

    handleEdit(e) {
        this.props.onEdit();
    }

    toggleHover() {
        this.setState(prevState => ({ isHovered: !prevState.isHovered }));
    }

    // ==============================
    // Renderers
    // ==============================

    render() {

        const { title, disabled, iconEdit, isEdit } = this.props;

        return (
            <div className="check-field" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} >

                <FormControlLabel
                    disabled={disabled}
                    control={
                        <Checkbox
                            checked={this.props.value}
                            value={this.props.name}
                            color="primary"
                            onChange={this.props.onChange}
                        />
                    }
                    label={title}
                />
                
                {isEdit ? <span className='icon' style={{ margin: '5px' }}>
                        {this.state.isHovered ?
                            <a href="#" onClick={this.handleEdit.bind(this)}><i className={iconEdit} style={{ fontSize: '1em' }} /></a> : null
                        }
                    </span> : null}
                {/*}

                <div className="CheckField" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} >
                    <label>
                        <input
                            type="CheckField"
                            name="optionsCheckFieldes"
                            disabled={disabled}
                            onChange={this.props.onChange}
                            checked={this.props.value}
                        />
                        <span>{title}</span>
                    </label>
                    
                </div>
                */}
            </div>
        );
    }
}

CheckField.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    iconEdit: PropTypes.string,
    isEdit: PropTypes.bool,
    onEdit: PropTypes.func
};
