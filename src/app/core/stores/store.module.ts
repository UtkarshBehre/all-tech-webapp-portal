import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AppStore } from './app.store';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    AppStore
  ]
})
export class StoreModule { 
  constructor(@Optional() @SkipSelf() storeModule: StoreModule) {
    if (storeModule) {
      throw new Error('StoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
