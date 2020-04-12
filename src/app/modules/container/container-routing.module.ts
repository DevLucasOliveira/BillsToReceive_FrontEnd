import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { InitialPageComponent } from './initial-page/initial-page.component';

const routes: Routes = [
    {
        path: '', component: InitialPageComponent,
        children: [
            {
                path: 'order',
                loadChildren: () => import('../order/order.module').then(m => m.OrderModule)
            },
            {
                path: 'client',
                loadChildren: () => import('../client/client.module').then(m => m.ClientModule)
              }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContainerRoutingModule { }