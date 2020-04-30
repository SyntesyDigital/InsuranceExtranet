import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Modal from '../Layout/Modal'

const styles = {
    display: 'inline-block',
}
export default class ExportButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            display: false,
        }
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
        this.setState({
            display: false
        });
    }

    render() {
        return (
            <div style={styles}>
                <Modal
                    id={'modal-result-import'}
                    icon={'fas fa-download'}
                    title={'Resultado de la importación'}
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
                            <p className="success">Éxito <i class="fas fa-check"></i></p>
                            <p className="error">Error <i class="fas fa-times"></i></p>
                            <p>Se han importado :</p> 
                            <ul>
                                <li>4 Elementos</li>
                                <li>5 Modelos Satisfactoriamente.</li>
                            </ul>
                            <p>Items no importados por repetición :</p> 
                            <ul>
                                <li>3 Elementos </li>
                                <li>3 Elementos </li>
                            </ul>
                        </div>
                    </div>
                </Modal>
                <a href={this.props.route} className="btn btn-default" onClick={this.openModal.bind(this)}>
                    <i className={this.props.icon}></i>
                    &nbsp;&nbsp;
                    {this.props.label}
                </a>
            </div>
            
        );
    }
}

ExportButton.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.string,
    onClick: PropTypes.func,
    route: PropTypes.string,
    importApi: PropTypes.string,
    onSuccess: PropTypes.func,
    onError: PropTypes.func
};


if (document.getElementById('export-button')) {
    ReactDOM.render(<ExportButton />, document.getElementById('export-button'));
}
