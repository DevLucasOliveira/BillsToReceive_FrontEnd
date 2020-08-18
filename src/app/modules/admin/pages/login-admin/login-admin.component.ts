import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Admin } from '../../models/admin';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  form: FormGroup;
  admin: Admin;

  constructor(
    private formbuilder: FormBuilder,
    private adminService: AdminService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.buildForm();
  }

  public buildForm() {
    this.form = this.formbuilder.group({
      pin: ['', Validators.required]
    })

  }

  public submit() {
    if (this.form.valid) {
      this.admin = this.createAdmin();

      this.adminService.authenticateAdmin(this.admin).subscribe(
        (response: any) => {
          if (!response.success) {
            this.toastr.error(response.message, 'Error');
            return;
          }
          this.toastr.success('Admin autenticado com sucesso','Sucesso');
          this.router.navigate(['/admin/keyaccess']);
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

  public createAdmin(): Admin {
    let value = this.form.value;

    return new Admin(value.pin);
  }

}
