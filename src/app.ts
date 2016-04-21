import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';

import {provideStore} from '@ngrx/store';
import {instrumentStore} from '@ngrx/devtools';

import {counter} from './app/reducers/counter';

import {SeedApp} from './app/seed-app';


bootstrap(SeedApp, [
  provideStore({counter}, {counter: 0}),
  instrumentStore(),
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy})
])
.catch(err => console.error(err));

