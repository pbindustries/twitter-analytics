import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
// import * as bluebird from 'bluebird';
// import * as mongoose from 'mongoose';
import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// mongoose.Promise = bluebird;
// mongoose.connect('mongodb://127.0.0.1:27017/twitter', { useMongoClient: true})
//   .then(()=> { console.log(`Succesfully Connected to the
// Mongodb Database  at URL : mongodb://127.0.0.1:27017/twitter`)})
//   .catch(() => { console.log(`Error Connecting to the Mongodb 
// Database at URL : mongodb://127.0.0.1:27017/twitter`)});

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

