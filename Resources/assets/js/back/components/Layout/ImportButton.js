import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Layout/Modal';
import { FilePicker } from 'react-file-picker'
import api from './../../api/index.js';

const styles = {
    display: 'inline-block',
}
export default class ImportButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            display: false,
            loading : false,
            file : null,
            base64 : null,
            type : null,
            name : '',
            result : null
        }
    }

    handleOnChange(FileObject) {

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
        //name : this.props.field.identifier,
        //value : this.state.base64
        //var json = JSON.parse(window.atob(this.state.base64));
        var json = window.atob(this.state.base64);
        this.props.onJsonUploaded(json);
        var self = this;

        api.exportImport.import({
                payload : json
            })
            .then(response => {
                console.log("updateFile : response => ",response.data);
                self.setState({
                    result : JSON.parse(response.data.import.payload),
                    display : true
                });

                //return JSON.parse(response.data.export.payload);
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
        toastr.error(message);
        console.error("FileField :: "+message);
    }

    openModal(e){
        if (e !== undefined) {
            e.preventDefault();
        }
        this.setState({
            display: true
        });
    }

    closeModal() {
        window.location.reload();
    }

    renderResult() {
        var result = {};
        if(this.state.result == null)
            return null;

        for(var index in this.state.result) {
            var importItem = this.state.result[index];
            for(var key in importItem){
                if(result[key] === undefined)
                    result[key] = parseInt(importItem[key]);
                    
                result[key] += parseInt(importItem[key]); 
            }
        }

        var list = [];
        for(var key in result){
            var name = key.split("\\");
            list.push(
                <li> {name[name.length-1]} : {result[key]} </li>
            )
        }
        return list;
    }

    render() {
        return (
            <div style={styles}>
                <Modal
                    id={'modal-result-import'}
                    icon={'fas fa-download'}
                    title={'Résultat de l\'importation'}
                    display={this.state.display}
                    zIndex={10000}
                    size={'medium'}
                    onModalClose={this.closeModal.bind(this)}
                    submitButton={false}
                    cancelButton={false}
                    deleteButton={false}
                >
                    <div className="row rightbar-page">
                        <div className="col-md-4 col-xs-12">
                            <p className="success">
                                <i className="fas fa-check"></i>&nbsp;
                                Succès 
                            </p>
                            <ul>
                                {this.renderResult()}
                            </ul>
                        </div>
                    </div>
                </Modal>

                <FilePicker
                    extensions={['json']}
                    onChange={this.handleOnChange.bind(this)}
                    onError={this.handleError.bind(this)}
                >
                    <a className="btn btn-default" href="#">
                        <i className={this.props.icon}></i>
                        &nbsp;&nbsp;
                        {this.props.label}
                    </a>
                </FilePicker>
            </div>
            
        );
    }
}

ImportButton.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.string,
    onClick: PropTypes.func,
    route: PropTypes.string,
    importApi: PropTypes.string,
    onSuccess: PropTypes.func,
    onError: PropTypes.func
};

