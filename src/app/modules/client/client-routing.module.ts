import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { OrdersComponent } from '../client/orders/orders.component';
import { OrderComponent } from './order/order.component';


const routes: Routes = [
    {
        path: '',
        component: OrdersComponent
    },
    {
        path: 'order',
        component: OrderComponent
    },
    {
        path: 'orders',
        component: OrdersComponent
    },
    {
        path: 'client-edit/:id',
        component: OrderComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRoutingModule { }
