import { OrderComponent } from './order/order.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderItemComponent } from './order-item/order-item.component';
import { OrdersComponent } from './orders/orders.component';
import { ClientRoutingModule } from './client-routing.module';



@NgModule({
  declarations: [OrderComponent, OrderItemComponent, OrdersComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
  ]
})
export class ClientModule { }
