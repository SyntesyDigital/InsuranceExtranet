import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BoxAddLarge extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { identifier, title } = this.props;

        const divStyle = {
            cursor: 'pointer',
            textAlign: 'center',
            border: '1px dashed #ccc'
        };


        return (
            <div>
                <div id={"heading" + identifier} style={divStyle} >
                    <a href="#" className="btn btn-default" onClick={this.props.onClick}>
                        <span className="field-name">
                            <i className="fas fa-plus-circle"></i> {title}
                        </span>
                    </a>
                </div>
            </div>
        );
    }
}

BoxAddLarge.propTypes = {
    identifier: PropTypes.string.isRequired,
    title: PropTypes.string,
    hideTab: PropTypes.bool,

    onAdd: PropTypes.func
};
