import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

import { ClientService } from './shared/providers/client.service';
import { OrderService } from './shared/providers/order.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalConfirmationComponent } from './shared/components/modal-confirmation/modal-confirmation.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    ModalConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [ClientService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
