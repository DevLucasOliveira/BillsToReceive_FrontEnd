import { OrderComponent } from './pages/order/order.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClientComponent } from './pages/client/client.component';
import { ProfileComponent } from './pages/profile/profile.component';



@NgModule({
  declarations: [OrderComponent, ClientComponent, ProfileComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ClientModule { }
