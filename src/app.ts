import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';

import {provideStore, usePreMiddleware, usePostMiddleware, Middleware} from "@ngrx/store";
import {instrumentStore} from '@ngrx/devtools';
import {installSagaMiddleware} from 'store-saga';

import {reducer} from './app/reducers/repos';
import sagas from './app/sagas/repos';

import {SeedApp} from './app/seed-app';

const actionLog: Middleware = action => {
    return action.do(val => {
        console.warn('DISPATCHED ACTION: ', val)
    });
};

const stateLog: Middleware = state => {
    return state.do(val => {
        console.log('NEW STATE: ', val)
    });
};

bootstrap(SeedApp, [
  provideStore(reducer, {}),
  usePreMiddleware(actionLog),
  usePostMiddleware(stateLog),
  installSagaMiddleware(...sagas),
  instrumentStore(),
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy})
])
.catch(err => console.error(err));

