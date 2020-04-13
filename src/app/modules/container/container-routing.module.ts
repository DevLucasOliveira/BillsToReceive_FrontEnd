import { OrderComponent } from './../client/order/order.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { OrderItemComponent } from '../client/order-item/order-item.component';
import { OrdersComponent } from '../client/orders/orders.component';

const routes: Routes = [
    {
        path: '', component: InitialPageComponent,
        children: [
            {
                path: 'client',
                loadChildren: () => import('../client/client.module').then(m => m.ClientModule)
            },
            { 
                path: 'order',
                component: OrderComponent
            },
            {
                path: 'order-item',
                component: OrderItemComponent
            },
            {
                path: 'orders', component: OrdersComponent
            },
            {
                path: '**',
                redirectTo: 'orders'
            },
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContainerRoutingModule { }
