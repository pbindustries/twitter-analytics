import {Component, OnInit} from '@angular/core';
import {Tweeter} from '../shared/tweeter.model';
import {TweeterService} from '../shared/tweeter.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-tweeter-detail',
  templateUrl: './tweeter-detail.component.html',
  styleUrls: ['./tweeter-detail.component.scss']
})

export class TweeterDetailComponent implements OnInit {

  tweeter: Tweeter;
  canVote: boolean;

  constructor(private tweeterService: TweeterService,
              private location: Location,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const tweeterId = this.activatedRoute.snapshot.paramMap.get('id');
    this.tweeterService.getTweeterById(tweeterId).subscribe((tweeter: Tweeter) => {
      this.tweeter = tweeter;
    });
  }

  like(tweeter: Tweeter) {
    return new Promise((resolve, reject) => {
      this.tweeterService.follow(tweeter).subscribe(() => {
        this.canVote = TweeterService.checkIfUserCanVote();
        resolve(true);
      }, (error) => {
        reject(error);
      });
    });
  }

  dynamicImport() {
    import('html2canvas').then((html2canvas: any) => {
      html2canvas.default(document.getElementById('tweeter-detail')).then((canvas) => {
        window.open().document.write('<img src="' + canvas.toDataURL() + '" />');
      });
    });
  }

  goBack(): void {
    this.location.back();
  }
}
