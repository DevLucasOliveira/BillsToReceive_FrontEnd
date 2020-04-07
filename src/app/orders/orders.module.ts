import { OrderComponent } from './order/order.component';
import { OrderItemsComponent } from './order-items/order-items.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OrdersRoutingModule } from './orders-routing.module';
import { InitialPageComponent } from './initial-page/initial-page.component';



@NgModule({
  declarations: [OrderItemsComponent, OrderComponent, InitialPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
