import {
    UPDATE_LAYOUT
} from "../constants/";

import {
    exploteToObject, 
    changeItemChildren
} from './helpers';

// ==============================
// Actions ROW
// ==============================

export function addRow(layout) {
    layout = (layout == undefined || layout == null) ? [] : layout;
    layout.push({
        type: 'row',
        settings: exploteToObject(ROW_SETTINGS),
        children: [{
            type: 'col',
            settings: exploteToObject(COL_SETTINGS),
            colClass: 'col-xs-12',
            children: []
        }]
    });

    return {
        type: UPDATE_LAYOUT,
        payload: layout
    };
}

export function deleteRow(pathToIndex, layout) {

    layout = removeItem(layout, -1, pathToIndex);

    return {
        type: UPDATE_LAYOUT,
        payload: layout
    };
}

export function pullUpItem(pathToIndex, layout) {

    layout = changeItemChildren(layout, -1, pathToIndex, function (children, index) {

        if (children.length > 1 && index > 0) {
            var temp = children[index - 1];
            children[index - 1] = children[index];
            children[index] = temp;
        }

        return children;
    });

    return { type: UPDATE_LAYOUT, payload: layout }
}


export function pullDownItem(pathToIndex, layout) {
    layout = changeItemChildren(layout, -1, pathToIndex, function (children, index) {

        if (children.length > 1 && index < children.length - 1) {
            var temp = children[index + 1];
            children[index + 1] = children[index];
            children[index] = temp;
        }

        return children;
    });

    return { type: UPDATE_LAYOUT, payload: layout }
}
