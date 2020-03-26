import {
    UPDATE_ITEM,
    ITEM_SELECT,
    ITEM_CANCEL,
    ITEM_POSITION_BEFORE
} from "../constants/";

import {
    changeRow
} from './helpers';

// ==============================
// Actions MODAL SELECT
// ==============================

export function itemSelected(item, pathToIndex, position, layout) {
    return {
        type: UPDATE_ITEM,
        payload: (position != null && position == ITEM_POSITION_BEFORE)
            ? changeRow(layout, -1, pathToIndex, item, true) //put object to the begining
            : changeRow(layout, -1, pathToIndex, item) //start array with this object
    };
};


export function selectItem(pathToIndex, position) {
    return {
        type: ITEM_SELECT, 
        payload: {
            pathToIndex: pathToIndex,
            position: position
        }
    };
};

export function cancelItem() {
    return { 
        type: ITEM_CANCEL 
    };
};
