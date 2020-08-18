import { UserLogin } from '@shared/models';
import { UserRegister } from './../../models/user-register';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/authentication/services/user.service';
import { Component, OnInit } from '@angular/core';
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
          this.toastr.warning('Usuário já cadastrado','Atenção');
        }
      )
    } else {
      this.toastr.error('Preencha todos os campos', 'Error')
    };
  }

  private getUserFromForm(): UserRegister {
    let value = this.form.value;

    return new UserRegister(value.fullName, value.userName, value.password);
  }

  private getAuthenticationFromForm(): UserLogin {
    let value = this.form.value;

    return new UserLogin(value.userName, value.password);
  }

  private authenticate(user: UserLogin) {
    this.userService.authenticate(user).subscribe(
      (response: any) => {
          localStorage.setItem('token', response.tokenString);
          this.router.navigateByUrl('/client');
      }
    )
  }

}
