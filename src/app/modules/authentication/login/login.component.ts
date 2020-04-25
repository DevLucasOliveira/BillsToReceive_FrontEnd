import { Authentication } from './../../../shared/models/authentication';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/providers/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.verifyToken();
    this.buildForm();
  }

  private verifyToken() {
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/client');
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  public login() {
    if (this.form.valid) {
      let authentication = new Authentication(
        this.form.controls.userName.value,
        this.form.controls.password.value
      );

      this.userService.authenticate(authentication).subscribe(
        (response: any) => {
            console.log(response.tokenString);
            localStorage.setItem('token', response.tokenString);
            this.router.navigateByUrl('/client');
            this.toastr.success('Você está logado','Sucesso');
        },
        err => {
          if (err.status === 401) {
            console.log(err);
            this.toastr.error('Contate o administrador','Error');
          }
        }
      );
    }
  }

}
