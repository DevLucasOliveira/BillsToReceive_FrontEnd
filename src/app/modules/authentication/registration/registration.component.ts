import { Authentication } from './../../../shared/models/authentication';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/providers/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) { }

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
        },
        error => {
          console.log(error);
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
        if (response.code === 200) {
          localStorage.setItem('token', response.tokenConf.original.acess_token);
          this.router.navigateByUrl('/client');
        }
      }
    )
  }

}
