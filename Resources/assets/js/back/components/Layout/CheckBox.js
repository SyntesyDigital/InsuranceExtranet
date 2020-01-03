import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './../../../../sass/backend/layout/_checkbox.scss';

export default class CheckBox extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            isHovered: false,

        };

        this.toggleHover = this.toggleHover.bind(this);
    }

    toggleHover() {
        this.setState(prevState => ({ isHovered: !prevState.isHovered }));
    }

    openModal(e) {
        if (e !== undefined) {
            e.preventDefault();
        }

        this.setState({
            display: true
        });
    }

    handleModalClose() {
        this.setState({
            display: false
        });
    }

    render() {

        const { title, disabled } = this.props;

        return (
            <div>
                <div className="checkbox" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} >
                    <label>
                        <input type="checkbox" name="optionsCheckboxes" disabled={disabled} onChange={this.props.onChange}/>
                        <span>{title}</span>
                    </label>
                    <span className='icon' style={{ margin: '5px' }}>
                        {this.state.isHovered ?
                            <a href="#" onClick={this.props.onClick}><i className="far fa-edit" style={{ fontSize: '1em' }} /></a> : null
                        }
                    </span>
                </div>
            </div>
        );
    }
}

CheckBox.propTypes = {
    title: PropTypes.string,
    disabled: PropTypes.bool
};
