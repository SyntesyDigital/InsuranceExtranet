import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CardField extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="col-md-4">
                    <div className="container-img">
                        <input className="top-left" type="checkbox" name="" value="" onChange={this.props.onChange}/>
                        <input className="top-middle" type="checkbox" name="" value="" onChange={this.props.onChange}/>
                        <input className="top-retroviseur" type="checkbox" name="" value="" onChange={this.props.onChange}/>
                        <input className="top-right" type="checkbox" name="" value="" onChange={this.props.onChange}/>
                        <input className="middle-right" type="checkbox" name="" value="" onChange={this.props.onChange}/>
                        <input className="quart-middle" type="checkbox" name="" value="" onChange={this.props.onChange}/>
                        <input className="parebrise-middle" type="checkbox" name="" value="" onChange={this.props.onChange}/>
                        <input className="middle-middle" type="checkbox" name="" value="" onChange={this.props.onChange}/>
                        <input className="quart-middle-paravrise" type="checkbox" name="" value="" onChange={this.props.onChange}/>
                        <input className="middle-right" type="checkbox" name="" value="" onChange={this.props.onChange}/>
                        <input className="bottom-right" type="checkbox" name="" value="" onChange={this.props.onChange}/>
                        <input className="bottom-retroviseur" type="checkbox" name="" value="" onChange={this.props.onChange}/>
                        <input className="bottom-middle" type="checkbox" name="" value="" onChange={this.props.onChange}/>
                        <input className="bottom-left" type="checkbox" name="" value="" onChange={this.props.onChange}/>
                    </div>
                </div>
                <div className="col-md-8">
                </div>
            </div>
        );
    }
}

CardField.propTypes = {
    text: PropTypes.string.isRequired,
    textAlign: PropTypes.string,
};
