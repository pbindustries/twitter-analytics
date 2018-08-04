import {InjectionToken} from '@angular/core';
import {IAppConfig} from './iapp.config';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: IAppConfig = {
  routes: {
    tweeters: 'tweeters',
    error404: '404'
  },
  votesLimit: 3,
  topTweetersLimit: 4,
  snackBarDuration: 3000,
  repositoryURL: 'https://github.com/pbindustries/elastic-stack-twitter-analyzer'
};
