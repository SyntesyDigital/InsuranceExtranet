import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BoxAddGroup from '../BoxAddGroup';
import KeyValueField from './KeyValueField';
import SidebarTitle from '../SidebarTitle';

export default class KeyValuesField extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items : props.value ? 
                this.processItems(props.value) : 
                []
        };
    }

    /**
     * Process _num=message&_test2=test to object with key and values
     * @param {*} url 
     */
    url2object(url) {
        var object = [];
        var urlArray = url.split('&');
        for(var key in urlArray){
            var item = urlArray[key].split("=");
            object.push({
                "key" : item[0],
                "value" : item[1]
            })
        }
        return object;
    }
    
    processItems(value) {
        var items = value !== undefined && value != '' && 
            value != null ? 

        value : '[]';

        if(items.indexOf('=') != -1){
            //old version
            items = this.url2object(items);
        }
        else if(items.indexOf('[') != -1){
            items = JSON.parse(items);
        }
        else {
            items = [];
        }

        return items;
    }

    componentDidUpdate(prevProps, prevState) {

        //if value is different
        if(prevProps.value != this.props.value) {
    
          var items = this.processItems(this.props.value);
        
          this.setState({
            items : items
          });
        }
        
      }
    
    handleOnChange(e) {
        this.props.onChange(this.props.name,e.target.value);
    }

    handleAddItem() {
        const items = this.state.items;
        items.push({
            "key" : "",
            "value" : ""
        });

        this.setState({
            items : items
        },function(){
            this.props.onChange(this.props.name,JSON.stringify(this.state.items));
        });
    }

    handleChangeItem(name,value,index) {
        const items = this.state.items;
        items[index] = value;
        this.setState({
            items : items
        },function(){
            this.props.onChange(this.props.name,JSON.stringify(this.state.items));
        });
    }

    handleRemoveItem(index) {
        const items = this.state.items;
        items.splice(index,1);
        this.setState({
            items : items
        },function(){
            this.props.onChange(this.props.name,JSON.stringify(this.state.items));
        });

        
    }

    renderItems() {
        return this.state.items.map((item,index) => 
            <KeyValueField 
                index={index}
                key={index}
                keyPrefix={this.props.keyPrefix}
                keyLabel={this.props.keyLabel}
                valueLabel={this.props.valueLabel}
                keyValue={item.key}
                value={item.value}
                onChange={this.handleChangeItem.bind(this)}
                onRemove={this.handleRemoveItem.bind(this)}
            />
        );
    }

    render() {
        const { label, error } = this.props;
        return (
            <div className={"form-group bmd-form-group" + (error ? ' has-error' : '')}>
                <SidebarTitle
                    title={label}
                />

                {this.renderItems()}
                
                <BoxAddGroup
                    title="ajouter"
                    onClick={this.handleAddItem.bind(this)}
                />
                
            </div>
        );
    }
}

KeyValuesField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange : PropTypes.func
};
