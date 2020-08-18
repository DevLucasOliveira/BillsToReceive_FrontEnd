import { AuthGuard } from './guard/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RegistrationComponent } from './pages/registration/registration.component';
import { FramePageComponent } from '@shared/frame/frame';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  {
    path: 'client',
    component: FramePageComponent,
    loadChildren: () => import('../../modules/client/client.module').then(m => m.ClientModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
