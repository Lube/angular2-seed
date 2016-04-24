//repos.ts
import {Reducer, Action} from '@ngrx/store';

export const FETCH = 'FETCH';
export const UPDATE = 'UPDATE';
export const DETAIL = 'DETAIL';
export const UPDATE_SELECTED = 'UPDATE_SELECTED';

export const reducer: Reducer<any> = (state:any = {repos: [], org: "angular", repo_selected: null}, action:Action) => {
    switch (action.type) {
        case FETCH:
            return {repos : state.repos, org: action.payload, repo_selected : state.repo_selected  };

        case UPDATE:
            return {repos : action.payload, org : state.org, repo_selected : state.repo_selected };

        case DETAIL:
            return {repos : state.repos, org : state.org, repo_selected : state.repo_selected };

        case UPDATE_SELECTED:
            return {repos : state.repos, org : state.org, repo_selected : action.payload  };

        default:
            return state;
    }
}
