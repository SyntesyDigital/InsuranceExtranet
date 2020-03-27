import {
  ITEM_CANCEL,
  ITEM_SELECT

} from "../constants/";


export function selectItem(pathToIndex,position) {

  return { type: ITEM_SELECT, payload : {
      pathToIndex : pathToIndex,
      position : position
  }};
};

export function cancelItem() {

  return { type: ITEM_CANCEL };
};
