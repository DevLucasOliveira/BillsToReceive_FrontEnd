import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';

@Component({
  selector: 'app-modal-client',
  templateUrl: './modal-client.component.html',
  styleUrls: ['./modal-client.component.css']
})
export class ModalClientComponent implements OnInit {

  form: FormGroup;
  client: Client;
  closeResult: string;
  @Input() idUser: string;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private clientService: ClientService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.buildForm();
  }


  buildForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  loadForm(client: Client) {
    this.form.patchValue({
      name: client.name,
      phone: client.cellPhone
    });
  }

  save() {
    this.fillClient();
    this.clientService.createClient(this.client).subscribe(
      (response: any) => {
        if (!response.success) {
          this.toastr.warning(response.message, 'Atenção');
          return;
        }
        this.toastr.success('Cliente cadastrado', 'Sucesso');
        this.closeModal();
      },
      (err) => {
        console.error(err);
        this.toastr.error('Ocorreu um erro interno', 'Error');
      });
  }

  saveWithRequests() {
    this.fillClient();
    this.clientService.createClient(this.client).subscribe(
      (response: any) => {
        this.closeModal();
        this.onsaveSucess(response.id);
      },
      error => {
        console.error(error);
      });
  }

  onsaveSucess(id: number) {
    this.router.navigate(['client/client-edit/' + id]);
  }

  fillClient() {
    let value = this.form.value;
    this.client = new Client(
      this.idUser,
      value.name,
      value.phone);
  }


  closeModal() {
    this.activeModal.close();
  }

}
