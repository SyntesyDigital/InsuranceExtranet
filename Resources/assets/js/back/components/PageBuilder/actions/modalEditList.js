import {
  EDIT_ITEM_LIST_SELECT,
  EDIT_ITEM_LIST_CANCEL,

} from "../constants/";

export function editItemList(item) {

  return { type: EDIT_ITEM_LIST_SELECT, payload : item };
};

export function cancelEditItemList() {

  return { type: EDIT_ITEM_LIST_CANCEL };
};
