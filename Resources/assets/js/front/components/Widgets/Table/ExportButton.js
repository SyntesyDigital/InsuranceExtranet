import React, { Component } from 'react';

export default class ExportButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            filename: "",
            exportPage: 1,
            downloading: false
        };
    }

    handleExport(e) {
        e.preventDefault();

        this.iterateExport();
    }

    iterateExport() {

        const {
            downloadUrl,
            elementObject,
            totalPages,
            pageLimit
        } = this.props;

        const {
            filename,
            exportPage
        } = this.state;

        //if no data nothing to do
        if (totalPages == null)
            return;

        if (exportPage > totalPages) {
            var url = downloadUrl.replace(':filename', filename);
            // console.log('ExportButton :: peticion terminada (url,filename)', url, filename);

            this.setState({
                downloading: false
            });

            // console.log("ExportButton ::  download url : (url)", url)
            window.location.href = url;

        } else {
            var self = this;
            self.setState({
                downloading: true
            });
            var params = this.props.getQueryParams(pageLimit, exportPage);
            var self = this;
            var filenameUrl = filename != "" ? '/' + filename : "";
            axios.get(ASSETS + 'architect/extranet/export/' + elementObject.id + '/model_values/data/' + pageLimit + filenameUrl + params).then(function (response) {
                self.setState({
                    filename: response.data.filename,
                    exportPage: exportPage + 1,
                    downloading: true
                }, function () {
                    self.iterateExport();
                });

            }).catch(function (error) {
                self.setState({
                    downloading: false
                });
            });
        }
    }

    render() {

        //const disabled = this.props.disabled || this.state.downloading;
        const disabled = this.state.downloading;

        return (
            <div className="excel-btn">
                <a href="#" onClick={this.handleExport.bind(this)} className={disabled ? "disabled" : ""}>
                    <i className="fas fa-download"></i>
                    {this.props.label == "" ? 'Exportation CSV' : this.props.label}
                </a>
            </div>

        );

    }
}
