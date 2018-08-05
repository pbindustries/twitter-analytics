import {Component, OnInit} from '@angular/core';
import {Tweeter} from '../shared/tweeter.model';
import {TweeterService} from '../shared/tweeter.service';
import {AppConfig} from '../../config/app.config';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tweeter-top',
  templateUrl: './tweeter-top.component.html',
  styleUrls: ['./tweeter-top.component.scss']
})
export class TweeterTopComponent implements OnInit {

  tweeters: Tweeter[] = null;
  canVote = false;

  constructor(private tweeterService: TweeterService,
              private router: Router) {
    this.canVote = TweeterService.checkIfUserCanVote();
  }

  ngOnInit() {
    this.tweeterService.getTweeters().subscribe((tweeters) => {
      this.tweeters = tweeters.sort((a, b) => {
        return b.followers - a.followers;
      }).slice(0, AppConfig.topTweetersLimit);
    });
  }

  follow(tweeter: Tweeter): Promise<any> {
    return new Promise((resolve, reject) => {
      this.tweeterService.follow(tweeter).subscribe(() => {
        this.canVote = TweeterService.checkIfUserCanVote();
        resolve(true);
      }, (error) => {
        reject(error);
      });
    });
  }

  seeTweeterDetails(tweeter): void {
    if (tweeter.default) {
      this.router.navigate([AppConfig.routes.tweeters + '/' + tweeter.id]);
    }
  }
}
