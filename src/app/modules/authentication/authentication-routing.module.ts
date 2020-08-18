import { AuthGuard } from './../../shared/auth/auth.guard';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RegistrationComponent } from './pages/registration/registration.component';



const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent},
    { path: 'registration', component: RegistrationComponent},
    {
      path: 'client',
      loadChildren: () => import('../../modules/container/container.module').then(m => m.ContainerModule),
      canActivate: [AuthGuard]
    },
    {
      path: '**', canActivate: [AuthGuard]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
