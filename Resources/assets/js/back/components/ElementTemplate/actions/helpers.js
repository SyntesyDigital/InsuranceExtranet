
// ==============================
// Helpers
// ==============================

export function exploteToObject(fields) {

    if (fields == null) {
        return null;
    }

    var result = {};

    for (var i = 0; i < fields.length; i++) {
        result[fields[i]] = null;
    }

    return result;
}

export function getFieldArrayIndex(fields, identifier) {

    for (var i = 0; i < fields.length; i++) {
        if (fields[i].identifier == identifier) {
            return i;
        }
    }

    return -1;
}

export function changeRow(layout, currentIndex, pathToIndex, data, before) {
    
    currentIndex++;

    if (currentIndex == pathToIndex.length - 1) {

        if (layout[pathToIndex[currentIndex]].children === undefined
            || layout[pathToIndex[currentIndex]].children == null) {
            layout[pathToIndex[currentIndex]].children = [];
        }

        if (before !== undefined && before) {
            layout[pathToIndex[currentIndex]].children.unshift(data);
        } else {
            layout[pathToIndex[currentIndex]].children.push(data);
        }

        return layout;
    }

    layout[pathToIndex[currentIndex]].children = changeRow(
        layout[pathToIndex[currentIndex]].children,
        currentIndex,
        pathToIndex,
        data,
        before
    );

    return layout;
}

/**
*   Method to add a new element to a field value array. Use for images and contents.
*/
export function addItem(layout, currentIndex, pathToIndex, data) {

    currentIndex++;

    if (currentIndex == pathToIndex.length - 1) {

        if (layout[pathToIndex[currentIndex]].field.value === undefined ||
            layout[pathToIndex[currentIndex]].field.value == null) {
            layout[pathToIndex[currentIndex]].field.value = [];
        }

        layout[pathToIndex[currentIndex]].field.value.push(data);
        return layout;
    }
    else {

        layout[pathToIndex[currentIndex]].children = addItem(
            layout[pathToIndex[currentIndex]].children,
            currentIndex,
            pathToIndex,
            data
        );

        return layout;
    }
}

export function removeItem(layout, currentIndex, pathToIndex) {
    currentIndex++;

    if (currentIndex == pathToIndex.length - 1) {
        layout.splice([pathToIndex[currentIndex]], 1);
        return layout;
    }
    else {

        layout[pathToIndex[currentIndex]].children = removeItem(
            layout[pathToIndex[currentIndex]].children,
            currentIndex,
            pathToIndex
        );

        return layout;
    }
}


export function changeItemChildren(layout, currentIndex, pathToIndex, callback) {
    currentIndex++;

    if (currentIndex == pathToIndex.length - 1) {
        layout = callback(layout, pathToIndex[currentIndex]);
        return layout;
    }
    else {

        layout[pathToIndex[currentIndex]].children = changeItemChildren(
            layout[pathToIndex[currentIndex]].children,
            currentIndex,
            pathToIndex,
            callback
        );

        return layout;
    }
}

export function changeRowColWithCallback(layout, currentIndex, pathToIndex, data, callback) {
    currentIndex++;

    if (currentIndex == pathToIndex.length - 1) {
        layout[pathToIndex[currentIndex]] = callback(
            layout[pathToIndex[currentIndex]], data
        );

        return layout;
    }

    layout[pathToIndex[currentIndex]].children = changeRowColWithCallback(
        layout[pathToIndex[currentIndex]].children,
        currentIndex,
        pathToIndex,
        data,
        callback
    );

    return layout;
}

export function changeCols(layout, currentIndex, pathToIndex, data) {
    currentIndex++;

    if (currentIndex == pathToIndex.length - 1) {
        layout[pathToIndex[currentIndex]].children = data;
        return layout;
    }

    layout[pathToIndex[currentIndex]].children = changeCols(
        layout[pathToIndex[currentIndex]].children,
        currentIndex,
        pathToIndex,
        data
    );

    return layout;
}

/**
*   Method to change the value of a vield by its path to Index.
*/
export function changeItem(layout, currentIndex, pathToIndex, data) {
    currentIndex++;

    if (currentIndex == pathToIndex.length - 1) {
        layout[pathToIndex[currentIndex]].field.value = data;
        return layout;
    }

    layout[pathToIndex[currentIndex]].children = changeItem(
        layout[pathToIndex[currentIndex]].children,
        currentIndex,
        pathToIndex,
        data
    );

    return layout;
}

/**
*   Method to change the content value of the link
*/
export function changeItemWithCallback(layout, currentIndex, pathToIndex, data, callback) {
    currentIndex++;

    if (currentIndex == pathToIndex.length - 1) {
        layout[pathToIndex[currentIndex]].field = callback(
            layout[pathToIndex[currentIndex]].field, data
        );
        return layout;
    }

    layout[pathToIndex[currentIndex]].children = changeItemWithCallback(
        layout[pathToIndex[currentIndex]].children,
        currentIndex,
        pathToIndex,
        data,
        callback
    );

    return layout;
}
