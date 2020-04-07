import { OrderItemsComponent } from './order-items/order-items.component';
import { OrderComponent } from './order/order.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { InitialPageComponent } from './initial-page/initial-page.component';



const routes: Routes = [
    {
      path: '', component: InitialPageComponent,
    children: [
    {
      path: 'order', component: OrderComponent
    },
    {
      path: 'order-items', component: OrderItemsComponent
    },
    {
      path: '**',
      redirectTo: 'order'
    }
    ]
  }
];



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdersRoutingModule {}
