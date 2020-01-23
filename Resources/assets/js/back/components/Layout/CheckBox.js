import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CheckBox extends Component {

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
            <div>
                <div className="checkbox" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} >
                    <label>
                        <input
                            type="checkbox"
                            name="optionsCheckboxes"
                            disabled={disabled}
                            onChange={this.props.onChange}
                            checked={this.props.value}
                        />
                        <span>{title}</span>
                    </label>
                    {isEdit ? <span className='icon' style={{ margin: '5px' }}>
                        {this.state.isHovered ?
                            <a href="#" onClick={this.handleEdit.bind(this)}><i className={iconEdit} style={{ fontSize: '1em' }} /></a> : null
                        }
                    </span> : null}
                </div>
            </div>
        );
    }
}

CheckBox.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    iconEdit: PropTypes.string,
    isEdit: PropTypes.bool,
    onEdit: PropTypes.func
};
