import {async, TestBed} from '@angular/core/testing';
import {TweeterService} from './tweeter.service';
import {APP_BASE_HREF} from '@angular/common';
import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {TestsModule} from '../../shared/modules/tests.module';
import {TranslateModule} from '@ngx-translate/core';
import {HttpErrorResponse} from '@angular/common/http';

describe('TweeterService', () => {
  let tweeterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        {provide: APP_BASE_HREF, useValue: '/'},
        TweeterService
      ]
    });

    tweeterService = TestBed.get(TweeterService);
  });

  it('should contains tweeters', async(() => {
    tweeterService.getTweeters().subscribe((data: any) => {
      expect(data.length).toBeGreaterThan(AppConfig.topTweetersLimit);
    });
  }));

  it('should get tweeter by id 1', async(() => {
    tweeterService.getTweeterById('1').subscribe((tweeter) => {
      expect(tweeter.id).toEqual(1);
    });
  }));

  it('should fail getting tweeter by no id', async(() => {
    tweeterService.getTweeterById('noId').subscribe(() => {
    }, (error) => {
      expect(error).toEqual(jasmine.any(HttpErrorResponse));
    });
  }));

  it('should fail creating empty tweeter', async(() => {
    tweeterService.createTweeter({}).subscribe(() => {
    }, (error) => {
      expect(error).toEqual(jasmine.any(HttpErrorResponse));
    });
  }));

  it('should fail deleting noId Tweeter', async(() => {
    tweeterService.deleteTweeterById('noId').subscribe(() => {
    }, (error) => {
      expect(error).toEqual(jasmine.any(HttpErrorResponse));
    });
  }));

  it('should fail follow empty tweeter', async(() => {
    localStorage.setItem('votes', String(0));
    tweeterService.follow('noId').subscribe(() => {
    }, (error) => {
      expect(error).toEqual(jasmine.any(HttpErrorResponse));
    });
  }));

  it('should create tweeter', async(() => {
    tweeterService.createTweeter({
      'name': 'test',
      'handle': 'test'
    }).subscribe((tweeter) => {
      expect(tweeter.id).not.toBeNull();
      tweeterService.deleteTweeterById(tweeter.id).subscribe((response) => {
        expect(response).toEqual({});
      });
    });
  }));

  it('should not follow a tweeter because no votes', async(() => {
    localStorage.setItem('votes', String(AppConfig.votesLimit));
    expect(TweeterService.checkIfUserCanVote()).toBe(false);
    tweeterService.createTweeter({
      'name': 'test',
      'handle': 'test'
    }).subscribe((tweeter) => {
      tweeterService.follow(tweeter).subscribe(() => {
      }, (error) => {
        expect(error).toBe('maximum votes');
        tweeterService.deleteTweeterById(tweeter.id).subscribe((response) => {
          expect(response).toEqual({});
        });
      });
    });
  }));

  it('should follow a tweeter', async(() => {
    localStorage.setItem('votes', String(0));
    expect(TweeterService.checkIfUserCanVote()).toBe(true);
    tweeterService.createTweeter({
      'name': 'test',
      'handle': 'test'
    }).subscribe((tweeter) => {
      tweeterService.follow(tweeter).subscribe((response) => {
        expect(response).toEqual({});
        tweeterService.deleteTweeterById(tweeter.id).subscribe((res) => {
          expect(res).toEqual({});
        });
      });
    });
  }));

  it('should delete a tweeter', async(() => {
    tweeterService.createTweeter({
      'name': 'test',
      'handle': 'test'
    }).subscribe((tweeter) => {
      tweeterService.deleteTweeterById(tweeter.id).subscribe((response) => {
        expect(response).toEqual({});
      });
    });
  }));
});
