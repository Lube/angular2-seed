import {Http} from 'angular2/http';
import {Router} from 'angular2/router';
import {Observable} from 'rxjs';
import {createSaga} from 'store-saga';
import {FETCH, UPDATE, DETAIL, UPDATE_SELECTED} from './../reducers/repos';

const BASE_WEB_URL = 'https://api.github.com/';

const fetchEffect = createSaga(function sagaFactory(http: Http) {
  return function fetchSaga(iteration$: Observable<any>) {
    return iteration$
      .filter(iteration => iteration.action.type === FETCH)
      .map(iteration => iteration.action.payload)
      .mergeMap(payload => {
        return http.get(BASE_WEB_URL + 'orgs/' + payload + '/repos')
          .map(res => {
            return {
              type: UPDATE,
              payload: res.json()
            }
          })
          .catch(err => {
            return Observable.of({
              type: UPDATE,
              payload: []
            });
          });
      });
  };

}, [Http]);

const fetchSingleEffect = createSaga(function sagaFactory(http: Http) {
  return function fetchSingleSaga(iteration$: Observable<any>) {
    return iteration$
      .filter(iteration => iteration.action.type === DETAIL)
      .map(iteration => iteration.action.payload)
      .mergeMap(payload => {
        return http.get(BASE_WEB_URL + 'repos/' + payload.org + '/' + payload.repo)
          .map(res => {
            return {
              type: UPDATE_SELECTED,
              payload: res.json()
            }
          })
          .catch(err => {
            return Observable.of({
              type: UPDATE_SELECTED,
              payload: {}
            });
          });
      });
  };

}, [Http]);

export default [
  fetchEffect,
  fetchSingleEffect
]
