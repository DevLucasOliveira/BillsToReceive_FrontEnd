import { Authentication } from './../../../shared/models/authentication';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/providers/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(private userService: UserService, 
              private router: Router, 
              private formBuilder: FormBuilder,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      fullName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public register() {
    if (this.form.valid) {
      let user = this.getUserFromForm();

      this.userService.register(user).subscribe(
        response => {
          let authenticate = this.getAuthenticationFromForm();
          this.authenticate(authenticate);
          this.toastr.success('Você foi registrado','Sucesso');
        },
        error => {
          console.log(error);
          this.toastr.error('Contate o administrador','Error');
        }
      )
    };
  }

  private getUserFromForm(): User {
    let value = this.form.value;

    return new User(value.fullName, value.userName, value.password);
  }

  private getAuthenticationFromForm(): Authentication {
    let value = this.form.value;

    return new Authentication(value.userName, value.password);
  }

  private authenticate(authentication: Authentication) {
    this.userService.authenticate(authentication).subscribe(
      (response: any) => {
          localStorage.setItem('token', response.tokenString);
          this.router.navigateByUrl('/client');
      }
    )
  }

}
