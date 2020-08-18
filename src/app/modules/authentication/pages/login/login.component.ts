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
          localStorage.setItem('token', response.tokenString);
          this.router.navigateByUrl('/client');
          this.toastr.success('Você está logado', 'Sucesso');
        },
        (err) => {
          this.toastr.error('Usuário ou senha incorreta', 'Error');
        }
      );
    } else {
      this.toastr.error('Preencha todos os campos', 'Error');
    }
  }

  public createUser(): UserLogin {
    return new UserLogin(
      this.form.controls.userName.value,
      this.form.controls.password.value
    );
  }


}

