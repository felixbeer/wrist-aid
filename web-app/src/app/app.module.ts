import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { NotificationComponent } from './components/notification/notification.component';
import { CdkDrag, CdkDragPlaceholder, CdkDragPreview, CdkDropList } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import {
  NotificationDragPreviewComponent,
} from './components/notification-drag-preview/notification-drag-preview.component';
import { PopupComponent } from './components/map-pin/popup.component';
import { PopupService } from './components/map-pin/popup.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    NotificationComponent,
    NotificationDragPreviewComponent,
    PopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CdkDrag,
    PortalModule,
    CdkDragPreview,
    CdkDragPlaceholder,
    CdkDropList,
    BrowserAnimationsModule,
  ],
  providers: [PopupService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
