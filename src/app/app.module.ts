import { OrderItemService } from './shared/providers/order-item.service';
import { OrderItem } from './shared/models/order-item';
import { AuthInterceptor } from './shared/auth/auth.interceptor';
import { UserService } from './shared/providers/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { ClientService } from './shared/providers/client.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalConfirmationComponent } from './shared/components/modal-confirmation/modal-confirmation.component';
import { SharedModule } from './shared/shared.module';
import { OrderService } from '@shared/providers/order.service';


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
    SharedModule,
    ToastrModule.forRoot()
  ],
  providers: [ClientService, OrderService, OrderItemService , UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
