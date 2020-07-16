import React, { Component } from 'react';

class ImageField extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
          url : "",
          alt : "",
          title : ""
        };

    }

    componentDidMount() {
      this.processProps(this.props);
    }

    processProps(props) {

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
      }

      this.setState({
        url : url,
        alt : alt,
        title : title
      });
    }

    componentWillReceiveProps(nextProps) {
      this.processProps(nextProps);
    }

    render() {

      const width = this.props.width !== undefined ? this.props.width : 'auto';
      const height = this.props.height !== undefined ? this.props.height : 'auto';
      const styles = {
        backgroundImage : `url(${ASSETS+this.state.url})`,
        width: width,
        height: height,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        margin: '0 auto'
      }

      return (
        <div
          className={'thumbnail-image'}
          style={styles}
        >
        </div>
      );

    }
}
export default ImageField;
