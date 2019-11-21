import {
    GET_SURVEYS,
    ADD_SURVEY,
    DELETE_SURVEY,
    SURVEY_LOADING
  } from '../actions/types';
  
  const initialState = {
    surveys: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_SURVEYS:
        return {
          ...state,
          surveys: action.payload,
          loading: false
        };
      case DELETE_SURVEY:
        return {
          ...state,
          surveys: state.surveys.filter(survey => survey._id !== action.payload)
        };
      case ADD_SURVEY:
        return {
          ...state,
          surveys: [action.payload, ...state.surveys]
        };
      case SURVEY_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }