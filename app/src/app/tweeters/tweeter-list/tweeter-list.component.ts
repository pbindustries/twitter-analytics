import {Component, OnInit, ViewChild} from '@angular/core';
import {Tweeter} from '../shared/tweeter.model';
import {TweeterService} from '../shared/tweeter.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {AppConfig} from '../../config/app.config';
import {Router} from '@angular/router';
import {LoggerService} from '../../core/shared/logger.service';

@Component({
  selector: 'app-remove-tweeter-dialog',
  templateUrl: './remove-tweeter.dialog.html',
})

export class RemoveTweeterDialogComponent {
  constructor() {
  }
}

@Component({
  selector: 'app-tweeter-list',
  templateUrl: './tweeter-list.component.html',
  styleUrls: ['./tweeter-list.component.scss']
})

export class TweeterListComponent implements OnInit {

  tweeters: Tweeter[];
  newTweeterForm: FormGroup;
  canVote = false;
  error: string;
  @ViewChild('form') myNgForm; // just to call resetForm method

  constructor(private tweeterService: TweeterService,
              private dialog: MatDialog,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.canVote = TweeterService.checkIfUserCanVote();

    this.newTweeterForm = this.formBuilder.group({
      'name': new FormControl('', [Validators.required]),
      'handle': new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.tweeterService.getTweeters().subscribe((tweeters: Array<Tweeter>) => {
      this.tweeters = tweeters.sort((a, b) => {
        return b.followers - a.followers;
      });
    });
  }

  follow(tweeter: Tweeter) {
    this.tweeterService.follow(tweeter).subscribe(() => {
      this.canVote = TweeterService.checkIfUserCanVote();
    }, (error: Response) => {
      LoggerService.error('maximum votes limit reached', error);
    });
  }

  createNewTweeter(newTweeter: Tweeter) {
    this.tweeterService.createTweeter(newTweeter).subscribe((newTweeterWithId) => {
      this.tweeters.push(newTweeterWithId);
      this.myNgForm.resetForm();
    }, (response: Response) => {
      if (response.status === 500) {
        this.error = 'errorHasOcurred';
      }
    });
  }

  seeTweeterDetails(tweeter): void {
    if (tweeter.default) {
      this.router.navigate([AppConfig.routes.tweeters + '/' + tweeter.id]);
    }
  }

  remove(tweeterToRemove: Tweeter): void {
    const dialogRef = this.dialog.open(RemoveTweeterDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tweeterService.deleteTweeterById(tweeterToRemove.id).subscribe(() => {
          this.tweeterService.showSnackBar('tweeterRemoved');
          this.tweeters = this.tweeters.filter(tweeter => tweeter.id !== tweeterToRemove.id);
        }, (response: Response) => {
          if (response.status === 500) {
            this.error = 'tweeterDefault';
          }
        });
      }
    });
  }
}
