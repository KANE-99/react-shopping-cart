import { UPDATE_SEARCH } from './actionTypes';



export const updateSearch = (searchBy = "") => ({
  type: UPDATE_SEARCH,
  payload: searchBy
});
