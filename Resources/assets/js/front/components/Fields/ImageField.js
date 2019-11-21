import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class ImageField extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
          id : null,
          className : null,
          url : "",
          alt : "",
          title : ""
        };

    }

    componentDidMount() {
      this.processProps(this.props);
    }

    processProps(props) {

      console.log("ImageField :: props => ",props);

      var crop = "medium";
      if(props.field.settings != null && props.field.settings.cropsAllowed !== undefined
        && props.field.settings.cropsAllowed != null ){

            crop = props.field.settings.cropsAllowed;
      }

      var url = null;
      var alt = "";
      var title = "";
      if(props.field.values !== undefined && props.field.values != null){
        if(props.field.values.urls[crop] !== undefined){
          url = props.field.values.urls[crop];
        }
        //alt = props.field.values.metadata.fields.alt[LOCALE].value;
        //title = props.field.values.metadata.fields.title[LOCALE].value;
      }

      this.setState({
        url : url,
        alt : alt,
        title : title
      });
    }

    componentWillReceiveProps(nextProps) {
      console.log("ImageField :: componentWillRecieveProps :: props => ",nextProps);

      this.processProps(nextProps);
    }

    render() {

      //alt={this.state.alt}
      //title={this.state.title}
      const width = this.props.width !== undefined ? this.props.width : 'auto';
      const height = this.props.height !== undefined ? this.props.height : 'auto';

      return (
        <img
          id={this.state.id}
          className={this.state.className}
          src={ASSETS+this.state.url}
          width={width}
          height={height}
        />
      );

    }
}
export default ImageField;
