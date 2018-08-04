import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {TweeterTopComponent} from './tweeter-top.component';
import {TweeterService} from '../shared/tweeter.service';
import {TestsModule} from '../../shared/modules/tests.module';
import {TranslateModule} from '@ngx-translate/core';
import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('TweeterTopComponent', () => {
  let fixture;
  let component;
  let tweeterService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot(),
      ],
      declarations: [
        TweeterTopComponent
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        {provide: APP_BASE_HREF, useValue: '/'},
        TweeterService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TweeterTopComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
    tweeterService = TestBed.get(TweeterService);
  }));

  it('should create tweeter top component', (() => {
    expect(component).toBeTruthy();
  }));

  it('should initialice component', fakeAsync(() => {
    fixture.detectChanges();
    spyOn(tweeterService, 'getTweeters').and.returnValue(Promise.resolve(true));
    tick();
    fixture.detectChanges();
    expect(component.tweeters.length).toBe(AppConfig.topTweetersLimit);
  }));

  it('should like a tweeter', async(() => {
    localStorage.setItem('votes', String(AppConfig.votesLimit - 1));
    component.like({id: 1}).then((result) => {
      expect(result).toBe(true);
    });
  }));

  it('should not like a tweeter', async(() => {
    localStorage.setItem('votes', String(AppConfig.votesLimit));
    component.like({id: 1}).then(() => {
    }, (error) => {
      expect(error).toBe('maximum votes');
    });
    expect(TweeterService.checkIfUserCanVote()).toBe(false);
  }));
});
