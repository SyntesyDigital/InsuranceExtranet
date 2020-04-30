import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import api from '../../api/index.js';
import ExportButton from '../Layout/ExportButton';
import moment from 'moment';
import ModalResultImport from '../ElementsModels/ModalResultImport';

import { ButtonSecondary, ButtonDropdown, BoxWithIcon, ButtonPrimary, BoxAdd, BoxList, PageTitle } from "architect-components-library";
import { saveAs } from 'file-saver';


export default class FormsIndex extends Component {

    constructor(props) {
        super(props);

        this.state = {
            models: [],
            selecting: false,
            selected: [],
            displaySubmit: false,
            displayResultImport: false,
        };
    }

    compare( a, b ) {
        if ( a.name < b.name ){
          return -1;
        }
        if ( a.name > b.name ){
          return 1;
        }
        return 0;
    }

    componentDidMount() {
        var _this = this;

        api.elementModel.getAll()
            .then(function (payload) {



                _this.setState({
                    models: payload.data.elementModels.sort(_this.compare)
                })
            });
    }

    handleEnableSelection(e) {
        e.preventDefault();
        this.setState({
            selected: [],
            displaySubmit: !this.state.displaySubmit,
            selecting: !this.state.selecting
        })
    }

    handleDisableSelection(e) {
        e.preventDefault();
        this.setState({
            displaySubmit: this.state.displaySubmit,
            selecting: this.state.selecting
        })
    }

    export(items, model) {
        const promises = [];

        items.forEach(item => {
            promises.push(api.exportImport.export(item.id, model).then(response => {
                return JSON.parse(response.data.export.payload);
            }));
        });

        Promise.all(promises)
            .then(response => {
                var fileName = 'export.json';

                var fileToSave = new Blob([JSON.stringify(response)], {
                    type: 'application/json',
                    name: fileName
                });

                saveAs(fileToSave, fileName);
            });
    }

    handleSelectAll(e) {
        e.preventDefault();
        this.export(this.state.models, EXPORT_MODELS.ElementModel);
        // this.setState({
        //     selected: [],
        //     displaySubmit: !this.state.displaySubmit,
        //     selecting: !this.state.selecting,
        // })
    }

    handleSubmit(items) {
        this.export(items, EXPORT_MODELS.ElementModel);
    }

    updateSelectedList(e, value) {
        if (e.target.checked) {
            this.setState({
                selected: this.state.selected.concat([value])
            })
        } else {
            this.setState({
                selected: this.state.selected.filter(function (val) { return val !== value })
            })
        }
    }

    openModalResultImport(e){
        if (e !== undefined) {
            e.preventDefault();
        }
        this.setState({
            displayResultImport: true
        });
    }

    handleModalResultImportClose() {
        this.setState({
            displayResultImport: false
        });
    }


    renderModels() {
        return this.state.models.map((item, index) =>
            <BoxWithIcon
                icon={item.icon}
                name={item.name}
                subtitle={moment(item.created_at).format('D/M/YY HH:mm')}
                onSelect={(e) => this.updateSelectedList(e, item)}
                route={routes['extranet.elements-models.forms.update'].replace(':id', item.id)}
                selectable={this.state.selecting}
                id={item.identifier}
            />
        );
    }

    render() {
        return (
            <div className="container grid-page elements-models-page">
                <div className="col-xs-offset-2 col-xs-8 page-content">
                    <PageTitle
                        title={'Formulaires'}
                        icon={'fas fa-cog'}
                        backRoute={routes['extranet.elements-models.index']}
                    >
                        <ButtonPrimary
                            label={'Ajouter'}
                            icon={'fa fa-plus'}
                            route={routes["extranet.elements-models.forms.create"]}
                        />

                        <ButtonDropdown
                            label={"EXPORTER"}
                            list={[
                                {
                                    label: "Exporter Tous",
                                    icon: "fas fa-file-export",
                                    onClick: this.handleSelectAll.bind(this),
                                    className: "",
                                },
                                {
                                    label: "Sélectionner",
                                    icon: "fas fa-file-export",
                                    onClick: this.handleEnableSelection.bind(this),
                                    className: "",
                                },
                            ]}
                        />

                        {this.state.displaySubmit ?
                            <ButtonSecondary
                                label={"Télécharger"}
                                icon={"fas fa-download"}
                                onClick={this.handleSubmit.bind(this, this.state.selected)}
                            />
                            : null}


                        <ModalResultImport
                            id={'modal-result-import'}
                            icon={'fas fa-bars'}
                            size={'medium'}
                            title={'Resultado de la importación'}
                            display={this.state.displayResultImport}
                            zIndex={10000}
                            onModalClose={this.handleModalResultImportClose.bind(this)}
                        />

                        {/* <ExportButton
                            label={"ENVOYER"}
                            icon={"fas fa-upload"}
                            onClick={this.openModalResultImport.bind(this)}
                        /> */}

                    </PageTitle>

                    <BoxList
                        subtitle={'Configuration générale des modèles utilisés dans les éléments'}
                    >
                        {this.renderModels()}

                        <BoxAdd
                            label={'Ajouter'}
                            route={routes["extranet.elements-models.forms.create"]}
                        />



                    </BoxList>


                </div>

            </div>
        );
    }
}

if (document.getElementById('elements-models-forms-index')) {
    ReactDOM.render(<FormsIndex />, document.getElementById('elements-models-forms-index'));
}
