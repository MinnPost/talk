/* @flow */

import {fromJS} from 'immutable';

/**
 * Action name constants
 */

export const FETCH_CONFIG_REQUEST = 'FETCH_CONFIG_REQUEST';
export const FETCH_CONFIG_FAILED = 'FETCH_CONFIG_FAILED';
export const FETCH_CONFIG_SUCCESS = 'FETCH_CONFIG_SUCCESS';

/**
 * Action creators
 */

export function fetchConfig () {
  return (dispatch) => {
    dispatch({type: FETCH_CONFIG_REQUEST});
    console.log('Fetching settings');
    return fetch('/api/v1/settings')
      .then(
        response => {
          return response.ok ? response.json()
          : Promise.reject(`${response.status} ${response.statusText}`);
        }
      )
      .then((json) => {
        console.log(json);
        return dispatch({type: FETCH_CONFIG_SUCCESS, config: fromJS(json)});
      }).catch((error) => {
        console.log(error);
        dispatch({type: FETCH_CONFIG_FAILED, error});
      });
  };
}
