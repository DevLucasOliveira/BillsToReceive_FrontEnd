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
  userRegister: UserRegister;
  userLogin: UserLogin;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      keyAccess: ['', Validators.required]
    });
  }

  public register() {
    if (this.form.valid) {
      this.userRegister = this.createUserRegister();

      this.userService.register(this.userRegister).subscribe(
        (response: any) => {
          if (!response.success) {
            this.toastr.error(response.message, 'Error');
            return;
          }
          let userLogin = this.getUserFromAuthenticate();
          this.toastr.success('Você foi registrado', 'Sucesso');
          this.authenticate(userLogin);
        },
        (err) => {
          console.error(err);
          this.toastr.error('Ocorreu um erro interno', 'Error');
          return;
        }
      )
    } else {
      this.toastr.warning('Preencha todos os campos', 'Atenção');
    };
  }

  private createUserRegister(): UserRegister {
    let value = this.form.value;

    return new UserRegister(value.name, value.userName, value.password, value.keyAccess);
  }

  private getUserFromAuthenticate(): UserLogin {
    let value = this.form.value;

    return new UserLogin(value.userName, value.password);
  }

  private authenticate(user: UserLogin) {
    this.userService.authenticate(user).subscribe(
      (response: any) => {
        if (!response.success) {
          this.toastr.warning(response.message, 'Atenção');
          return;
        }
        localStorage.setItem('token', response.data.token);
        this.router.navigateByUrl('/client/' + response.data.id);
      }
    )
  }

}
