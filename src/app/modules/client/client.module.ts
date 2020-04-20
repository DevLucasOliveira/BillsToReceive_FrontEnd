import { OrderComponent } from './order/order.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import { ClientRoutingModule } from './client-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [OrderComponent, OrdersComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ClientModule { }
