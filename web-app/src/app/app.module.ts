import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { NotificationComponent } from './components/notification/notification.component';
import { CdkDrag } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CdkDrag,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
