import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './guard/auth.guard';



@NgModule({
  declarations: [LoginComponent, RegistrationComponent, AuthGuard],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthenticationRoutingModule,
    ToastrModule.forRoot(),
  ]
})
export class AuthenticationModule { }
