import { UPDATE_SEARCH } from './actionTypes';

const initialState = {
  searching: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SEARCH:
      return {
        ...state,
        searching: action.payload
      };
    default:
      return state;
  }
}
