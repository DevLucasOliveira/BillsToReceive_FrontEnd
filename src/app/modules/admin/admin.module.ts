import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateKeyaccessComponent } from './pages/generate-keyaccess/generate-keyaccess.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [GenerateKeyaccessComponent, LoginAdminComponent]
})
export class AdminModule { }
