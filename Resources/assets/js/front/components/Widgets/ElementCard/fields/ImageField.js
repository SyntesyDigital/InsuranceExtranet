import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ImageField extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: null,
            className: null,
            url: "",
            alt: "",
            title: "",
            defaultCrop: "medium"
        };
    }

    componentDidMount() {
        this.processProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.processProps(nextProps);
    }

    processProps(props) {
        var crop = this.state.defaultCrop;
        if (props.field.settings != null
            && props.field.settings.cropsAllowed !== undefined
            && props.field.settings.cropsAllowed != null
        ) {
            crop = props.field.settings.cropsAllowed;
        }

        var url = null;
        if (props.field.value !== undefined && props.field.value != null) {
            if (props.field.value.urls[crop] !== undefined) {
                url = props.field.value.urls[crop];
            }
        }

        this.setState({
            url: url,
            crop: crop
        });
    }

    render() {
        return (
            <img
                id={this.state.id}
                className={this.state.className}
                src={ASSETS + this.state.url}
                width={this.props.width !== undefined ? this.props.width : 'auto'}
                height={this.props.height !== undefined ? this.props.height : 'auto'}
            />
        );
    }
}
export default ImageField;
