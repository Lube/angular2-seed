import {Component} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {Http} from 'angular2/http';
import {DETAIL} from '../../reducers/repos';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

interface AppState {
  org: string,
  repos: Array<string>
}

@Component({
  selector: 'repo-detail',
  templateUrl: 'app/components/repo-detail/repo-detail.html',
  styleUrls: ['app/components/repo-detail/repo-detail.css'],
  providers: [],
  directives: [ ROUTER_DIRECTIVES ],
  pipes: []
})
export class RepoDetail {
  repo: Observable<any>
  constructor(public params: RouteParams, public store: Store<AppState>)
  {
    this.repo = store.select('repo_selected');
    this.store.dispatch({type: DETAIL, payload: {org: this.params.get('org'), repo: this.params.get('name')}})
  }
}
