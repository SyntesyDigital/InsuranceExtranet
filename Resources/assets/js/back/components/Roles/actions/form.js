import {
  INIT_STATE,
} from "../constants/";

import {
  getData,
} from "../api/";


export function initState(payload) {

  console.log("init state!");
  getData()
    .then(function(data){
      console.log("get data result => ",data);
    })

  return { type: INIT_STATE, payload }
};


