import {Component} from 'angular2/core';
import {Github} from '../../services/github';
import {Observable} from 'rxjs/Observable';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import {Store} from '@ngrx/store';
import {INCREMENT, DECREMENT, RESET} from '../../reducers/counter';

interface AppState {
  counter: number;
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
  counter: Observable<number>;
  constructor(public github: Github, public params: RouteParams, public store: Store<AppState>) 
  {
    this.counter = store.select('counter');
  }
  
  public increment()
  {
      this.store.dispatch({ type: INCREMENT });
  }

  public decrement()
  {
      this.store.dispatch({ type: DECREMENT });
  }

  public reset()
  {
      this.store.dispatch({ type: RESET });
  }

  ngOnInit() {
    this.repos = this.github.getReposForOrg(this.params.get('org'));
  }
}

