import {map, startWith} from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import {LoggerService} from '../shared/logger.service';
import {Tweeter} from '../../tweeters/shared/tweeter.model';
import {FormControl} from '@angular/forms';
import {TweeterService} from '../../tweeters/shared/tweeter.service';
import {Router} from '@angular/router';
import {AppConfig} from '../../config/app.config';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  providers: [
    LoggerService
  ]
})

export class SearchBarComponent implements OnInit {

  defaultTweeters: Array<Tweeter>;
  tweeterFormControl: FormControl;
  filteredTweeters: any;

  constructor(private tweeterService: TweeterService,
              private router: Router) {
    this.defaultTweeters = [];
    this.tweeterFormControl = new FormControl();
  }

  ngOnInit() {
    this.tweeterService.getTweeters().subscribe((tweeters: Array<Tweeter>) => {
      this.defaultTweeters = tweeters.filter(tweeter => tweeters['default']);

      this.tweeterFormControl.valueChanges.pipe(
        startWith(null),
        map(value => this.filterTweeters(value)))
        .subscribe(tweetersFiltered => {
          this.filteredTweeters = tweetersFiltered;
        });
    });
  }

  filterTweeters(val: string): Tweeter[] {
    return val ? this.defaultTweeters.filter(tweeter => tweeter.name.toLowerCase().indexOf(val.toLowerCase()) === 0 && tweeter['default'])
      : this.defaultTweeters;
  }

  searchTweeter(tweeter: Tweeter): Promise<boolean> {
    LoggerService.log('Moved to tweeter with id: ' + tweeter.id);
    return this.router.navigate([AppConfig.routes.tweeters + '/' + tweeter.id]);
  }
}
