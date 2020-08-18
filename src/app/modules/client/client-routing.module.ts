import { ClientComponent } from './pages/client/client.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { OrderComponent } from './pages/order/order.component';
import { ProfileComponent } from './pages/profile/profile.component';


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
  },
    {
    path: 'profile',
    component: ProfileComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
