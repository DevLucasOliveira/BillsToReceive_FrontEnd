import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ModalClientComponent } from './components/modal-client/modal-client.component';
import { OrderComponent } from '../modules/client/order/order.component';
import { ClientComponent } from '../modules/client/client/client.component';

const routes: Routes = [
    {
        path: '', component: ModalClientComponent,
        children: [
            {
                path: 'order',
                component: OrderComponent
            },
            {
                path: 'client', component: ClientComponent
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
