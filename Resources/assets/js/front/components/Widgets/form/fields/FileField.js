import React, {Component} from 'react';
import { render } from 'react-dom';
import { FilePicker } from 'react-file-picker'

class FileField extends Component
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
    //console.log('nextProps ',nextProps);
  }

  handleOnChange(FileObject)
  {

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
          console.error('FileField :: ', error);
      };
  }

  handleError(message) {
    console.error("FileField :: "+message);
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
    const errors = this.props.error ? 'is-invalid' : '';
    const isRequired = field.rules.required !== undefined ?
      field.rules.required : false;


    return (

      <div className="row element-form-row">
        <div className="col-sm-4">
          <label>{field.name}
          {isRequired &&
            <span className="required">&nbsp; *</span>
          }
          </label>
        </div>
        <div className="col-sm-6">
          {(this.props.value == null || this.props.value == '') &&

            <FilePicker
              extensions={['jpg', 'jpeg', 'png','doc','pdf','docx']}
              onChange={this.handleOnChange.bind(this)}
              onError={this.handleError.bind(this)}
            >
              <a className="btn btn-default" href="#">
                <i className="fas fa-paperclip"></i> télécharger le fichier
              </a>
            </FilePicker>
          }

          {this.props.value != null && this.props.value != '' &&
            <div className="row">
              <div className="col-xs-10" style={{overflowWrap: 'break-word'}}>
                {this.props.values['docName']}
              </div>
              <div className="col-xs-2">
                <a href="#" className="btn btn-link btn-danger"
                  onClick={this.removeFile.bind(this)}
                >
                  <i className="fas fa-trash-alt"></i>
                </a>
              </div>
            </div>
          }


        </div>
      </div>
    );
  }

}

export default FileField;
