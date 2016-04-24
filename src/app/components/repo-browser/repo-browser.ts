import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {RepoList} from '../repo-list/repo-list';
import {RepoDetail} from '../repo-detail/repo-detail';

@Component({
  selector: 'repo-browser',
  templateUrl: 'app/components/repo-browser/repo-browser.html',
  styleUrls: ['app/components/repo-browser/repo-browser.css'],
  directives: [ ROUTER_DIRECTIVES ],
  pipes: []
})
@RouteConfig([
	{path: '/:org',       component: RepoList,   name: 'RepoList'},
	{path: '/:org/:name', component: RepoDetail, name: 'RepoDetail' },
])
export class RepoBrowser {

  constructor(private router:Router) {}

  searchForOrg(orgName: string)
  {
    this.router.navigate(['RepoList', {org: orgName}])
  }

}
