import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import api from '../../api/index.js';
import ExportButton from '../Layout/ExportButton';

import { ButtonSecondary, ButtonDropdown, BoxWithIcon, ButtonPrimary, BoxAdd, BoxList, PageTitle } from "architect-components-library";

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

    componentDidMount() {
        var _this = this;

        api.elementModel.getAll()
            .then(function (payload) {
                _this.setState({
                    models: payload.data.elementModels
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

    handleSelectAll(e) {
        e.preventDefault();
        console.log("handleSelectAll :: ")
        // this.setState({
        //     selected: [],
        //     displaySubmit: !this.state.displaySubmit,
        //     selecting: !this.state.selecting,
        // })
    }

    handleSubmit(items) {
        console.log("handleSubmit:: ", items)
    }

    updateSelectedList(e, value) {
        console.log(e.target.checked)
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

    renderModels() {
        return this.state.models.map((item, index) =>
            <BoxWithIcon
                icon={item.icon}
                name={item.name}
                subtitle={'22/01/08'}
                onSelect={(e) => this.updateSelectedList(e, item)}
                route={routes['extranet.elements-models.forms.update'].replace(':id', item.id)}
                selectable={this.state.selecting}
                id={item.identifier}
            />
        );
    }

    render() {

        console.log(this.state);

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
                                icon={"fas fa-cloud-upload-alt"}
                                onClick={this.handleSubmit.bind(this, this.state.selected)}
                            />
                            : null}

                        <ExportButton
                            label={"IMPORTER"}
                            icon={"fas fa-upload"}
                            importApi={'url'}
                            onSuccess={''}
                            onError={''}
                        />

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
