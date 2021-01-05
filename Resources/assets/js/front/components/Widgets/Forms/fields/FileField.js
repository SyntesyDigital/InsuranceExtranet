import React, { Component } from 'react';
import { FilePicker } from 'react-file-picker';
import Dropzone from 'react-dropzone';
import CustomIcon from './../../../Common/CustomIcon';
import {
    isDefined
} from "./../functions";

class FileField extends Component {
    constructor(props) {
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);

        const maxSize = SITE_CONFIG_GENERAL.UPLOAD_MAX_SIZE !== undefined
            && SITE_CONFIG_GENERAL.UPLOAD_MAX_SIZE.value !== null ?
            parseInt(SITE_CONFIG_GENERAL.UPLOAD_MAX_SIZE.value)
            : 10;

        const format = isDefined(props.field.settings) &&
            isDefined(props.field.settings.format) ?
            props.field.settings.format : 'button';

        this.state = {
            loading: false,
            file: null,
            base64: null,
            type: null,
            name: '',
            maxSize: maxSize,
            format: format
        }
    }

    componentWillReceiveProps(nextProps) {
        ////console.log('nextProps ',nextProps);
    }

    handleOnChange(FileObject) {

        //only dropzone return array as FileObject
        if (this.state.format == "dropzone") {
            if (FileObject.length == 0)
                return;

            var FileObject = FileObject[0];
        }

        var self = this;

        this.setState({
            file: FileObject,
            name: FileObject.name,
            type: FileObject.type,
            loading: true
        }, self.getBase64.bind(self))

    }

    updateFile() {

        //update all fields
        this.props.onFieldChange({
            name: this.props.field.identifier,
            value: this.state.base64
        });
        this.props.onFieldChange({
            name: '_contentType',
            value: this.state.type
        });
        this.props.onFieldChange({
            name: '_docName',
            value: this.state.name
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
                base64: base64Array.length > 0 ? base64Array[1] : null,
                loading: false
            }, self.updateFile.bind(self));

        };
        reader.onerror = function (error) {
            // console.error('FileField :: ', error);
        };
    }

    handleError(message) {
        // console.error("FileField :: " + message);
    }

    removeFile(e) {
        e.preventDefault();

        this.setState({
            loading: false,
            file: null,
            base64: null,
            type: null,
            name: ''
        });

        this.props.onFieldChange({
            name: this.props.field.identifier,
            value: null
        });
        this.props.onFieldChange({
            name: '_contentType',
            value: null
        });
        this.props.onFieldChange({
            name: '_docName',
            value: null
        });


    }

    renderFilePicker() {

        const errors = this.props.error ? ' has-error' : '';

        return (
            <>
                {(this.props.value == null || this.props.value == '') &&

                    <FilePicker
                        extensions={['jpg', 'jpeg', 'png', 'doc', 'pdf', 'docx', 'csv', 'xlsx', 'xls']}
                        maxSize={this.state.maxSize}
                        onChange={this.handleOnChange.bind(this)}
                        onError={this.handleError.bind(this)}
                    >
                        <button className="btn btn-default" href="#" type="button">
                            <i className="fas fa-paperclip"></i> {STYLES.elementForm.textBtnAddFileForm}
                        </button>
                    </FilePicker>
                }

                {this.props.value != null && this.props.value != '' &&
                    <div className="row uploaded-file">
                        <div className="col-xs-10" style={{ overflowWrap: 'break-word' }}>
                            {this.props.values['_docName']}
                        </div>
                        <div className="col-xs-2">
                            <a href="" className="btn btn-link btn-danger"
                                onClick={this.removeFile.bind(this)}
                            >
                                <i className="fas fa-trash-alt"></i>
                            </a>
                        </div>
                    </div>
                }
            </>
        )
    }

    renderDropZone() {

        const errors = this.props.error ? ' has-error' : '';

        if (this.props.value == null || this.props.value == '') {
            return (
                <Dropzone
                    onDrop={this.handleOnChange.bind(this)}
                    //maxSize={this.state.maxSize*1024}
                >
                    {({ getRootProps, getInputProps }) => (
                        <section >
                            <div {...getRootProps()} className={"box box-state-01 " + (errors)}>
                                <input {...getInputProps()} />
                                {this.props.label}
                                <span className="icon-wrapper">
                                    <i className="far fa-file"></i>
                                </span>
                                <div className="text-file"
                                    dangerouslySetInnerHTML={{
                                        __html: STYLES.elementForm.textDropzone ?
                                            STYLES.elementForm.textDropzone :
                                            'Déposer le document'
                                    }}
                                >
                                    {/* <i className="fas fa-paperclip"></i>{" "} */}
                                </div>
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
                    <p className="text-file" style={{ overflowWrap: 'break-word' }}>
                        <i className="fas fa-paperclip"></i>{" "}
                        {this.props.values['_docName']}
                        <a href="" className="remove-btn"
                            onClick={this.removeFile.bind(this)}
                        >
                            {STYLES.elementForm.iconState02Dropzone &&
                                <CustomIcon
                                    icon={STYLES.elementForm.iconState02Dropzone}
                                />
                            }
                            {/* <i className="fas fa-trash-alt"></i> */}
                        </a>
                    </p>
                </div>
            )
        }

    }

    render() {

        const format = this.state.format;

        const { field } = this.props;
        const errors = this.props.error ? ' has-error' : '';
        let isRequired = field.rules.required !== undefined ?
            field.rules.required : false;

        let isHideLabel = field.settings.hidelabel !== undefined ?
            field.settings.hidelabel : false;

        let isLabelInline = field.settings.labelInline !== undefined ?
            field.settings.labelInline : false;

        var colClassLabel = isLabelInline ?
            'field-container-col col-xs-5' :
            'field-container-col col-xs-12';

        var colClassInput = isLabelInline ?
            'field-container-col col-xs-7' :
            'field-container-col col-xs-12';

        //required can be set also directly with modals
        if (this.props.isModal !== undefined && this.props.isModal &&
            field.required !== undefined) {
            isRequired = field.required;
        }

        let textFieldClass = ["text-field"];
        if (this.state.addClassBordered || this.props.value != "") {
            textFieldClass.push('bordered');
        }

        return (

            <div className={"form-group bmd-form-group file-field " + (errors)}>
                <div className={'row field-container'}>
                    <div className={colClassLabel}>
                        {!isHideLabel &&
                            <label className="bmd-label-floating">
                                {field.name}
                                {isRequired &&
                                    <span className="required">&nbsp; *</span>
                                }
                            </label>
                        }
                    </div>
                    <div className={colClassInput}>
                        <div>
                            {format == "button" &&
                                this.renderFilePicker()
                            }
                            {format == "dropzone" &&
                                this.renderDropZone()
                            }

                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default FileField;
