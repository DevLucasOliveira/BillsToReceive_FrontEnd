import { UserLogin } from '@shared/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/modules/authentication/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private userService: UserService,
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
      let user = this.createUser();

      this.userService.authenticate(user).subscribe(
        (response: any) => {
          if (!response.success) {
            this.toastr.error(response.message, 'Error');
            return;
          }
          this.toastr.success('Usuário autenticado com sucesso', 'Sucesso');
          localStorage.setItem('token', response.data);
          this.router.navigateByUrl('/client');
        },
        (err) => {
          console.error(err);
          this.toastr.error('Ocorreu um erro interno', 'Error');
          return;
        }
      );
    } else {
      this.toastr.warning('Preencha todos os campos', 'Atenção');
    }
  }

  public createUser(): UserLogin {
    let value = this.form.value;

    return new UserLogin(value.userName, value.password);
  }


}

