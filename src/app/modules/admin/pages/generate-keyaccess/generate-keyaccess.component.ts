import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../services/admin.service';
import { KeyAccess } from '../../models/keyAccess';

@Component({
  selector: 'app-generate-keyaccess',
  templateUrl: './generate-keyaccess.component.html',
  styleUrls: ['./generate-keyaccess.component.css']
})
export class GenerateKeyaccessComponent implements OnInit {

  form: FormGroup;
  keyAccess: KeyAccess;
  key: string;

  constructor(
    private toastr: ToastrService,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getIdAdmin();
  }

  private getIdAdmin() {
    this.activatedRoute.params.subscribe(
      params => {
        this.keyAccess = new KeyAccess(params.id);
      }
    )
  }

  public submit() {
    this.adminService.createAcessKey(this.keyAccess).subscribe(
      (response: any) => {
        if (!response.success) {
          this.toastr.error(response.message, 'Error');
          return;
        }
        this.toastr.success(response.message, 'Sucesso');
        this.key = response.data.key;
      },
      (err) => {
        console.error(err);
        this.toastr.error('Ocorreu um erro interno', 'Error');
        return;
      }
    );
  }



}
