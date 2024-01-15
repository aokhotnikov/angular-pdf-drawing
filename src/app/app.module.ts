import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AngularDraggableModule } from 'angular2-draggable';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ExtendedPdfViewerComponent } from './extended-pdf-viewer/extended-pdf-viewer.component';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    ExtendedPdfViewerComponent,
    AngularDraggableModule,
    BrowserModule,
    AppRoutingModule,
    PdfViewerModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
