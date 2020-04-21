import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ModalClientComponent } from './components/modal-client/modal-client.component';
import { OrderComponent } from '../modules/client/order/order.component';
import { OrdersComponent } from '../modules/client/orders/orders.component';

const routes: Routes = [
    {
        path: '', component: ModalClientComponent,
        children: [
            {
                path: 'order',
                component: OrderComponent
            },
            {
                path: 'orders', component: OrdersComponent
            },
            {
                path: 'client-edit/:id',
                component: OrderComponent
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SharedRoutingModule { }
