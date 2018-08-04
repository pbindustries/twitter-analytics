import {browser, by, element} from 'protractor';

export class HomePage {
  static navigateTo(): any {
    return browser.get('/');
  }

  static getNumberTweeters(): any {
    return element.all(by.css('#tweeters-list mat-card')).count();
  }
}
