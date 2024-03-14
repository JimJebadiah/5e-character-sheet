import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import * as fetchIntercept from 'fetch-intercept';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));