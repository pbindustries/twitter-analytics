import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TweeterListComponent} from './tweeter-list/tweeter-list.component';
import {TweeterDetailComponent} from './tweeter-detail/tweeter-detail.component';
import {TweetersComponent} from './tweeters.component';

const tweetersRoutes: Routes = [
  {
    path: '',
    component: TweetersComponent,
    children: [
      {path: '', component: TweeterListComponent},
      {path: ':id', component: TweeterDetailComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(tweetersRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class TweeterRoutingModule {
}
