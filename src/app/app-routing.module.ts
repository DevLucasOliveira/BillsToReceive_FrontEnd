import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrameAuthenticationPageComponent } from '@shared/frame/frame-authentication';


const routes: Routes = [
  {
    path: '',
    component: FrameAuthenticationPageComponent,
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'admin',
    component: FrameAuthenticationPageComponent,
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
