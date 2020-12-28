import React, {Component} from 'react';
import Dropzone from 'react-dropzone';

class DropZoneField extends Component
{
  constructor(props)
  {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);

    this.state = {
      loading : false,
      file : null,
      base64 : null,
      type : null,
      name : ''
    }

  }

  
  componentWillReceiveProps(nextProps) {
    ////console.log('nextProps ',nextProps);
  }

  handleOnChange(FileObject)
  {
    var FileObject = FileObject[0];
    console.log("FileObject => ",FileObject)

    var self = this;

    this.setState({
      file : FileObject,
      name : FileObject.name,
      type : FileObject.type,
      loading : true
    },self.getBase64.bind(self))

  }

  updateFile() {
    //update all fields
    this.props.onFieldChange({
      name : this.props.field.identifier,
      value : this.state.base64
    });
    this.props.onFieldChange({
      name : '_contentType',
      value : this.state.type
    });
    this.props.onFieldChange({
      name : 'docName',
      value : this.state.name
    });
  }

  /**
  *   Get file info.
  */
 
  getBase64() {
      let reader = new FileReader();
      var self = this;

      reader.readAsDataURL(this.state.file);

      reader.onload = function () {

          var base64Array = reader.result.split(',');

          self.setState({
            base64 : base64Array.length > 0 ? base64Array[1] : null,
            loading : false
          },self.updateFile.bind(self));

      };
      reader.onerror = function (error) {
          console.error('DropZoneField :: ', error);
      };
  }

  handleError(message) {
    console.error("DropZoneField :: "+message);
  }

  removeFile(e){
    e.preventDefault();

    this.setState({
      loading : false,
      file : null,
      base64 : null,
      type : null,
      name : ''
    });

    this.props.onFieldChange({
      name : this.props.field.identifier,
      value : null
    });
    this.props.onFieldChange({
      name : '_contentType',
      value : null
    });
    this.props.onFieldChange({
      name : 'docName',
      value : null
    });
  }

 
  render() {

    const {field} = this.props;
    const errors = this.props.error ? ' has-error' : '';
    let isRequired = field.rules.required !== undefined ?
      field.rules.required : false;

    if(this.props.done){
      return (
        <div className="box box-state-03">
            {this.props.label}
            <span className="icon-wrapper"><i className="fas fa-check-circle"></i></span>
            <p className="text-success"><i className="fas fa-paperclip"></i>{" "}Document envoyé</p>
        </div>
      )
    }
    else if(this.props.value == null || this.props.value == ''){
      return (
        <Dropzone onDrop={this.handleOnChange.bind(this)}>
          {({getRootProps, getInputProps}) => (
            <section >
              <div {...getRootProps()} className={"box box-state-01 "+ (errors)}>
                <input {...getInputProps()} />
                {this.props.label}
                <span className="icon-wrapper"><i className="far fa-file"></i></span>
                <p className="text-file"><i className="fas fa-paperclip"></i>{" "}Déposer le document</p>
              </div>
            </section>
          )}
        </Dropzone>
      )
    }
    else {
      return (
        <div className="box box-state-02">
            {this.props.label}
            <span className="icon-wrapper"><i className="far fa-file"></i></span>
            <p className="text-file" style={{overflowWrap: 'break-word'}}>
              <i className="fas fa-paperclip"></i>{" "}
              {this.props.values['docName']}
              <a href="" className="remove-btn"
                  onClick={this.removeFile.bind(this)}
                >
                <i className="fas fa-trash-alt"></i>
              </a>
            </p>
            <button disabled={this.props.processing} type="submit" className="btn btn-rounded">Envoyer{" "}<i className="far fa-paper-plane"></i></button>
        </div>
      )
    }

    return (
      <div className={"box "+stateClass+" "+ (errors)}>
        {this.props.label}
        <span className="icon-wrapper"><i className="far fa-file"></i></span>
        <p className="text-file" style={{overflowWrap: 'break-word'}}><i className="fas fa-paperclip"></i>{" "}Déposer le document</p>
      </div>
    );

  }

}

export default DropZoneField;
