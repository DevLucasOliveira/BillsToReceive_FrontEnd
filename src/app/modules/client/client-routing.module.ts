import { ClientComponent } from './client/client.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { OrderComponent } from './order/order.component';


const routes: Routes = [
    {
        path: '',
        component: ClientComponent
    },
    {
        path: 'order',
        component: OrderComponent
    },
    {
        path: 'client',
        component: ClientComponent
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
