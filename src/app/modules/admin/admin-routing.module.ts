import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { GenerateKeyaccessComponent } from './pages/generate-keyaccess/generate-keyaccess.component';
import { FrameAdminPageComponent } from '@shared/frame/frame-admin';


const routes: Routes = [
  {
    path: '',
    component: LoginAdminComponent
  },
  {
    path: 'keyaccess',
    component: FrameAdminPageComponent,
    children: [
      { path: ':id', component: GenerateKeyaccessComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
