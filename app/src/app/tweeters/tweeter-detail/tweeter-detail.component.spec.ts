import {async, TestBed} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {TweeterDetailComponent} from './tweeter-detail.component';
import {TweetersModule} from '../tweeters.module';
import {TestsModule} from '../../shared/modules/tests.module';
import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {TranslateModule} from '@ngx-translate/core';
import {TweeterService} from '../shared/tweeter.service';
import {ActivatedRoute, convertToParamMap} from '@angular/router';

describe('TweeterDetailComponent', () => {
  let fixture;
  let component;
  let tweeterService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot(),
        TweetersModule
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        {provide: APP_BASE_HREF, useValue: '/'},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: '1'
              })
            }
          }
        },
        TweeterService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TweeterDetailComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
    tweeterService = TestBed.get(TweeterService);
  }));

  it('should create tweeter detail component', (() => {
    expect(component).toBeTruthy();
  }));

  it('should follow a tweeter', async(() => {
    localStorage.setItem('votes', String(AppConfig.votesLimit - 1));
    component.follow({id: 1}).then((result) => {
      expect(result).toBe(true);
    });
  }));
});
