import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateKeyaccessComponent } from './pages/generate-keyaccess/generate-keyaccess.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [GenerateKeyaccessComponent, LoginAdminComponent]
})
export class AdminModule { }
