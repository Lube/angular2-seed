import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import {Store} from '@ngrx/store';
import {FETCH} from '../../reducers/repos';

interface AppState {
  org: string,
  repos: Array<string>
}

@Component({
  selector: 'repo-list',
  templateUrl: 'app/components/repo-list/repo-list.html',
  styleUrls: ['app/components/repo-list/repo-list.css'],
  providers: [],
  directives: [ ROUTER_DIRECTIVES ],
  pipes: []
})
export class RepoList {
  repos: Observable<any>
  constructor(public params: RouteParams, public store: Store<AppState>)
  {
    this.repos = store.select('repos');
    this.store.dispatch({type: FETCH, payload: this.params.get('org') })
  }
}

