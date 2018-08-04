import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {TweeterService} from '../../tweeters/shared/tweeter.service';
import {SearchBarComponent} from './search-bar.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {AppRoutingModule} from '../../app-routing.module';
import {TweeterTopComponent} from '../../tweeters/tweeter-top/tweeter-top.component';
import {APP_BASE_HREF} from '@angular/common';
import {TestsModule} from '../../shared/modules/tests.module';
import {Error404Component} from '../error404/error-404.component';

describe('SearchBarComponent', () => {
  let fixture;
  let component;
  let tweeterService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot(),
        AppRoutingModule
      ],
      declarations: [
        SearchBarComponent,
        TweeterTopComponent,
        Error404Component
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        {provide: APP_BASE_HREF, useValue: '/'},
        TweeterService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
    tweeterService = TestBed.get(TweeterService);
  }));

  it('should create tweeter search component', (() => {
    expect(component).toBeTruthy();
  }));

  it('should get all tweeters', fakeAsync(() => {
    spyOn(tweeterService, 'getTweeters').and.returnValue(Promise.resolve(true));
    tick();
    fixture.detectChanges();
    expect(component.defaultTweeters.length).toBeGreaterThan(0);
    for (const tweeter of component.defaultTweeters) {
      expect(tweeter.default).toBe(true);
    }
  }));

  it('should filter tweeters array', (() => {
    component.defaultTweeters = [
      {
        'id': 1,
        'name': 'Donald Trump',
        'default': true
      },
      {
        'id': 2,
        'name': 'Kanye West',
        'default': false
      }
    ];
    expect(component.filtertweeters('Donald Trump').length).toBe(1);
    expect(component.filtertweeters('Kanye West').length).toBe(0);
    expect(component.filtertweeters().length).toBe(2);
  }));
});
