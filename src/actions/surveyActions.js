import axios from 'axios';
import { returnErrors } from './errorActions';
import { GET_SURVEYS, ADD_SURVEY, DELETE_SURVEY, SURVEY_LOADING } from './types';
import { tokenConfig } from './authActions';

export const getSurveys = () => dispatch => {
  dispatch(setSurveysLoading());
  axios
    .get('/surveys/')
    .then(res =>
      dispatch({
        type: GET_SURVEYS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addSurvey = survey => (dispatch, getState) => {
  axios
    .post('/surveys/add/', survey, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_SURVEY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteSurvey = id => (dispatch, getState) => {
  axios
    .delete(`/surveys/delete/${id}/`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_SURVEY,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setSurveysLoading = () => {
  return {
    type: SURVEY_LOADING
  };
};