//import * as api from '../api/index.js';
import * as api from '../../api/index.js';

import {FETCH_BY_SEARCH,FETCH_ALL,START_LOADING,END_LOADING} from './actionTypes';
//var fs = require('fs');



export const getUsersBySearch = (searchQuery) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data: { data } } = await api.fetchUsersBySearch(searchQuery);
      console.log(data);
      //fs.writeFileSync('file.json', JSON.stringify(data));
      dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };

  // export const getUser = (searchQuery) => async (dispatch) => {
  //   try {
  //     //dispatch({ type: START_LOADING });
  //     const { data: { data } } = await api.fetchUsersBySearch(searchQuery);
  //     console.log(data)
  //     dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
  //     //dispatch({ type: END_LOADING });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };