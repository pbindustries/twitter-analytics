import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {TweeterRoutingModule} from './tweeters-routing.module';
import {SharedModule} from '../shared/modules/shared.module';

import {TweeterListComponent, RemoveTweeterDialogComponent} from './tweeter-list/tweeter-list.component';
import {TweeterService} from './shared/tweeter.service';
import {TweeterDetailComponent} from './tweeter-detail/tweeter-detail.component';
import {TweetersComponent} from './tweeters.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TweeterRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    TweetersComponent,
    TweeterListComponent,
    RemoveTweeterDialogComponent,
    TweeterDetailComponent
  ],
  entryComponents: [
    RemoveTweeterDialogComponent
  ],
  providers: [
    TweeterService
  ]
})

export class TweetersModule {
}
