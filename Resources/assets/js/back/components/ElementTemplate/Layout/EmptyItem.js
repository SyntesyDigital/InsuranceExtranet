import React, { Component } from 'react';
import { render } from 'react-dom';

class EmptyItem extends Component {

    constructor(props) {
        super(props);
    }

    onSelectItem(e) {
        e.preventDefault();
        this.props.onSelectItem(this.props.pathToIndex);
    }

    render() {
        return (
            <div className="row empty-item">
                <a href="" className="btn btn-link" onClick={this.onSelectItem.bind(this)}>
                    <i className="fa fa-plus"></i>
                </a>
            </div>
        );
    }
}

export default EmptyItem;
