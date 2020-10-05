import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter';
import ExportButton from './ExportButton';
import TableActions from './TableActions';

import {
    parseNumber,
    parseDate,
    getConditionalFormating,
    hasConditionalFormatting,
    getTextAlign,
    getConditionalIcon,
    hasConditionalIcon,
    hasRoute,
    hasModal,
    cleanIdentifier,
    isGrouped
} from '../functions';

//const selectors = Data.Selectors;

export default class TableComponent extends Component {

    constructor(props) {
        super(props);

        const defaultDataLoadStep = 1000;
        const field = props.field ? JSON.parse(atob(props.field)) : null;
        const elementObject = props.elementObject;
        const model = props.model;
        const pagination = props.pagination ? true : false;
        const itemsPerPage = props.itemsPerPage !== undefined
            && props.itemsPerPage != null
            && props.itemsPerPage != '' ? props.itemsPerPage : 10;
        const exportBtn = props.exportBtn;
        const downloadUrl = props.downloadUrl;

        const maxItems = props.maxItems !== undefined && props.maxItems != "" ? props.maxItems : false;
        const hideEmptyRows = props.hideEmptyRows !== undefined && props.hideEmptyRows != "" ? props.hideEmptyRows : false;

        var pageLimit = maxItems && maxItems < defaultDataLoadStep ? maxItems : defaultDataLoadStep;

        //console.log("TableComponent :: field ",field);
        var excelName = field != null ? this.processText(field.fields, 2) : '';
        // console.log("excelName => ", field, excelName);

        var headerRowsNumber = field != null
            && field.settings.headerRowsNumber !== undefined
            && field.settings.headerRowsNumber != null
            && field.settings.headerRowsNumber != "" ?
            parseInt(field.settings.headerRowsNumber) : 1;

        this.state = {
            pokemons: null,
            id: props.id,
            field: field,
            elementObject: elementObject,
            data: [],
            columns: [],
            pagination: pagination,
            itemsPerPage: itemsPerPage,
            maxItems: maxItems,
            filters: [],
            currPage: 0,
            loading: true,
            loadingData: true,
            filterable: false,
            sortColumnName: null,
            sortColumnType: null,
            defaultDataLoadStep: defaultDataLoadStep,
            model: model,
            exportBtn: exportBtn,
            downloadUrl: props.downloadUrl,
            //iterator
            pageLimit: pageLimit,
            currentPage: 2,
            totalPages: 0,
            csvElements: 0,
            exportPage: 1,
            pageSize: 10,
            hideEmptyRows: hideEmptyRows,
            excelName: excelName,
            headerRowsNumber: headerRowsNumber
        };
    }

    processText(fields, fieldName) {
        return (
            fields !== undefined
                && fields[fieldName] !== undefined
                && fields[fieldName].value != null
                && fields[fieldName].value[LOCALE] !== undefined
                && fields[fieldName].value[LOCALE] != null
                ? fields[fieldName].value[LOCALE]
                : ''
        )
    }

    refreshTable() {

        var self = this;

        this.setState({
            data: [],
            currPage: 0,
            loading: true,
            loadingData: true,
            currentPage: 2,
            totalPages: 0
        }, function () {
            self.query();
        })

    }



    componentDidMount() {

        this.processColumns();
        var self = this;

        console.log("TableComponent :: (id) ", ('#' + this.state.id + ' .modal-link'));

        $(document).on('click', '#' + this.state.id + ' .modal-link', function (e) {

            e.preventDefault();

            var link = $(e.target).closest('.modal-link');
            var url = link.data('modal');

            console.log("TableComponent :: on click! (url) ", url);

            //url has format [element_id]?[params]:[redirect_url]
            var urlArray = url.split(":");
            var elementUrl = urlArray[0];
            var redirectUrl = urlArray[1];
            self.props.onOpenModal(elementUrl, redirectUrl);
        });
    }

    getQueryParams(limit, page) {
        var params = '?';

        if (this.state.model.DEF1 != null)
            params += this.state.model.DEF1 + "&";

        params += 'perPage=' + limit + '&page=' + page;

        if (this.state.sortColumnName) {
            params += '&orderBy=' + this.state.sortColumnName + '&orderType=' + this.state.sortColumnType;
        }

        return params;
    }

    nothing(e) {
        e.preventDefault();
    }

    query() {
        var self = this;
        const {
            elementObject, itemsPerPage, maxItems,
            defaultDataLoadStep, pageLimit
        } = this.state;

        var params = this.getQueryParams(pageLimit, 1);

        //add url params
        if (this.props.parameters != '')
            params += "&" + this.props.parameters;

        axios.get(ASSETS + 'architect/extranet/' + elementObject.id + '/model_values/data/' + pageLimit + params)
            .then(function (response) {
                if (response.status == 200
                    && response.data.modelValues !== undefined) {
                    //console.log("ModelValues  :: componentDidMount => ",response.data.modelValues);
                    // console.log("CompleteObject  :: componentDidMount => ",response.data.totalPage);
                    // en completeObject rengo el total de registros, por pagina, pagina, total de paginas, desde y hasta

                    var dataProcessed = self.processData(response.data.modelValues);

                    var pageSize = self.state.maxItems ? parseInt(self.state.maxItems) : parseInt(self.state.itemsPerPage);
                    //console.log('DATA PAGINATION', self.state.pagination);
                    //console.log('HIDEEMPTY', self.state.hideEmptyRows);
                    //console.log('DATA PROCESED', dataProcessed.length);
                    //console.log('PAGE SIXZE', pageSize);

                    if (!self.state.pagination && self.state.hideEmptyRows == '1' && dataProcessed.length < pageSize) {
                        pageSize = dataProcessed.length;
                    }

                    self.setState({
                        data: [...self.state.data, ...dataProcessed],
                        totalPages: response.data.totalPage,
                        pageSize: pageSize,
                        loading: false
                    }, function () {
                        if (!maxItems) {
                            self.iterateAllPages();
                        } else {
                            self.setState({
                                loadingData: false,
                            });
                        }
                    });

                }

            }).catch(function (error) {
                console.log(error);
                self.setState({
                    loading: false
                });
            });
    }

    iterateAllPages() {

        const {
            elementObject, totalPages, currentPage,
            pageLimit
        } = this.state;
        if (currentPage > totalPages) {
            //process data and add to main data
            this.setState({
                loadingData: false
            })
        }
        else {
            //process page
            var params = this.getQueryParams(pageLimit, currentPage);
            var self = this;

            axios.get(ASSETS + 'architect/extranet/' + elementObject.id + '/model_values/data/' + pageLimit + params)
                .then(function (response) {
                    if (response.status == 200
                        && response.data.modelValues !== undefined) {
                        const { currentPage } = self.state;
                        //add data to
                        var dataProcessed = self.processData(response.data.modelValues);

                        self.setState({
                            data: [...self.state.data, ...dataProcessed],
                            currentPage: currentPage + 1,
                            loadingData: true
                        }, function () {
                            self.iterateAllPages();
                        });

                    }

                }).catch(function (error) {
                    console.log(error);
                    self.setState({
                        loadingData: false
                    });
                });
        }

    }

    /**
     * Process actions object with row information
     * 
     * @param {*} actions 
     * @param {*} row 
     */
    renderActions(actions, row) {
        return <TableActions 
            actions={actions}
            row={row}
        />;
    }

    renderCell(field, identifier, row) {

        var value = row.original[identifier];

        if (field.type == "date") {
            //console.log("renderCell => ",field,row);
            value = parseDate(value, field);
        }
        if (field.type == "number") {
            value = parseNumber(value, field, row.original, this.props.parameters);
        }
        if (field.type == "text") {
            switch (field.settings.format) {
                case 'password':
                    value = '******';
                    break;
            }
        }

        var icon = getConditionalIcon(field, value);
        var hasIcon = hasConditionalIcon(icon);
        var style = getConditionalFormating(field, value);
        var hasColor = hasConditionalFormatting(style);
        var textAlign = getTextAlign(field);

        if (field.type == "file" || field.type == "file_ws_fusion") {
            return <div className={"file-container" + ' ' + textAlign} dangerouslySetInnerHTML={{ __html: row.original[identifier] }} />
        }
        // has route
        else if (hasRoute(field)) {

            return <div className={(hasIcon ? 'has-icon' : '')}>
                <div
                    className={textAlign}
                >
                    <a href="" href={row.original[identifier + "_url"]}>
                        {hasIcon ? <i className={icon.icon}></i> : null}
                        &nbsp; {row.original[identifier]}
                    </a>
                </div>
            </div>
        }
        // has modal
        else if (hasModal(field)) {

            return <div
                className={textAlign}
                dangerouslySetInnerHTML={{
                    __html: '<a href="" class="modal-link" data-modal="' + (row.original[identifier + "_url"]) + '">' +
                        row.original[identifier] +
                        '</a>'
                }}

            />
        }
        // default
        else {

            if(hasIcon){
                //consider with icone not possible to have html link
                return <div className={('has-icon')}>
                    <div
                        className={(hasColor ? 'has-color' : '') + ' ' + textAlign}
                        style={style}
                    >
                        <i className={icon.icon}></i> &nbsp;
                        {value}
                    </div>
                </div>
            }
            else {
                //if no icon, it's possible that value come with html. 
                return <div className={(hasIcon ? 'has-icon' : '')}>
                    {hasIcon ? <i className={icon.icon}></i> : null}
                    <div
                        className={(hasColor ? 'has-color' : '') + ' ' + textAlign}
                        style={style}
                        dangerouslySetInnerHTML={{ __html: value }}
                    />
                </div>
            }
        }
    }

    /**
     * Function to process all element fields and group it as a global definition
     * @param {*} columns 
     */
    processActionColumn(columns) {

        //check for all object of type action and grouped to return action definition
        const { elementObject } = this.state;
        var definition = {};

        var actions = {
            list : [],
            grouped : []
        };

        for (var index in elementObject.fields) {
            //if object field is an action continue to next field
            var field = elementObject.fields[index];

            if(field.type != "action")
                continue;

            var action = {
                icon : getConditionalIcon(field, ''),
                name : field.name,
                modalLink : hasModal(field),
                field : field,
                identifier : cleanIdentifier(field.identifier)
            };

            if(isGrouped(field)){
                actions.grouped.push(action);
            }
            else {
                actions.list.push(action);
            }

        }

        //if no actions to proced, return same columns
        if(actions.list.length == 0 && actions.grouped.length == 0){
            return columns;
        }

        definition = {
            accessor: 'actions',
            Header: 'Actions',
            sortable: false,
            filterable: false,
            className: 'actions-col',
            Cell: this.renderActions.bind(this, actions),
        };

        columns.push(definition);

        return columns;
    }

    processColumns() {

        const { elementObject } = this.state;

        var anySearchable = false;
        var columns = [];
        var sortColumnName = null;
        var sortColumnType = null;
        var columnWidth = null;
        var definition = {};

        for (var index in elementObject.fields) {

            //if object field is an action continue to next field
            if(elementObject.fields[index].type == "action")
                continue;

            if (elementObject.fields[index].rules.searchable && !anySearchable) {
                anySearchable = true;
            }

            var identifier = cleanIdentifier(elementObject.fields[index].identifier);
            if (elementObject.fields[index].rules.sortableByDefault) {
                sortColumnName = identifier;
                sortColumnType = elementObject.fields[index].rules.sortableByDefault;
            }

            definition = {
                accessor: identifier,
                Header: elementObject.fields[index].name,
                sortable: elementObject.fields[index].rules.sortable,
                filterable: elementObject.fields[index].rules.searchable,
                filterMethod: this.filterMethod.bind(this, identifier),
                filterAll: true,
                Cell: this.renderCell.bind(this, elementObject.fields[index], identifier),
            };

            if (elementObject.fields[index].settings.columnWidth !== undefined &&
                elementObject.fields[index].settings.columnWidth != null &&
                elementObject.fields[index].settings.columnWidth != "") {

                definition.width = parseInt(elementObject.fields[index].settings.columnWidth);
            }

            columns.push(definition);
        }


        //process actions
        columns = this.processActionColumn(columns);

        this.setState({
            columns: columns,
            filterable: anySearchable,
            sortColumnName: sortColumnName,
            sortColumnType: sortColumnType
        }, this.query.bind(this)
        );
    }

    processData(data) {

        for (var key in data) {
            for (var subkey in data[key]) {
                //remove . on keys to allow filter
                var newSubkey = cleanIdentifier(subkey);
                var dataValue = data[key][subkey];

                //if value has ';' that means it has a link
                if (typeof dataValue === 'string' && dataValue.indexOf(';') != -1) {
                    var valueArray = dataValue.split(';');
                    data[key][newSubkey + '_url'] = valueArray[1];
                    dataValue = valueArray[0];
                }

                data[key][newSubkey] = dataValue;
            }
        }

        return data;
    }

    filterMethod(identifier, filter, rows) {
        return matchSorter(rows, filter.value, {
            keys: [{
                key: identifier,
                threshold: matchSorter.rankings.CONTAINS
            }]
        });
    }

    handlePageSizeChange(pageSize, pageIndex) {
        this.setState({
            pageSize: pageSize,
            currPage: pageIndex,
        });
    }

    handlePageChange(pageIndex) {
        this.setState({
            currPage: pageIndex,
        });
    }

    handleFilterChange(){
        this.setState({
            currPage: 0,
        });
    }

    renderTable() {
        const { data, elementObject, itemsPerPage, maxItems, downloading, loadingData } = this.state;
        var originalPageSize = maxItems ? parseInt(maxItems) : parseInt(this.state.itemsPerPage);

        return (
            <div id={this.state.id}>
                {this.props.exportBtn &&

                    <ExportButton
                        disabled={loadingData}
                        label={this.state.excelName}
                        downloadUrl={this.props.downloadUrl}
                        elementObject={this.state.elementObject}
                        totalPages={this.state.totalPages}
                        pageLimit={this.state.pageLimit}
                        getQueryParams={this.getQueryParams.bind(this)}
                        parameters={this.props.parameters}
                    />
                }

                <div className={(this.props.exportBtn ? 'react-table-container m-top' : 'react-table-container')
                    + ' ' + ('header-rows-' + this.state.headerRowsNumber)}>
                    <ReactTable
                        page={this.state.currPage}
                        data={this.state.data}
                        columns={this.state.columns}
                        showPagination={this.state.pagination}
                        defaultSorted={[
                            {
                                id: this.state.sortColumnName,
                                desc: this.state.sortColumnType == 'DESC' ? true : false
                            }
                        ]}
                        defaultPageSize={maxItems ? parseInt(maxItems) : parseInt(this.state.itemsPerPage)}
                        pageSize={this.state.pageSize}
                        loading={this.state.loading}
                        filterable={true}
                        //className="-striped -highlight"
                        className=""
                        previousText={<span><i className="fa fa-caret-left"></i> &nbsp; Précédente</span>}
                        nextText={<span>Suivante &nbsp; <i className="fa fa-caret-right"></i></span>}
                        loadingText={'Chargement...'}
                        noDataText={'Aucune donnée trouvée'}
                        pageText={'Page'}
                        ofText={'de'}
                        rowsText={'lignes'}

                        onPageChange={this.handlePageChange.bind(this)}
                        onPageSizeChange={this.handlePageSizeChange.bind(this)}
                        onFilteredChange={this.handleFilterChange.bind(this)} 
                    />
                </div>

            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderTable()}
            </div>

        );

    }
}
