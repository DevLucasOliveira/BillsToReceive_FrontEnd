import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from '../../providers/order.service';
import { Client } from '../../models/client';
import { ClientService } from '../../providers/client.service';

@Component({
  selector: 'app-modal-client',
  templateUrl: './modal-client.component.html',
  styleUrls: ['./modal-client.component.css']
})
export class ModalClientComponent implements OnInit {

  form: FormGroup;
  client: Client;
  closeResult: string;

  constructor(private formBuilder: FormBuilder,
              public activeModal: NgbActiveModal,
              private activatedRoute: ActivatedRoute,
              private clientService: ClientService,
            ) { }

  ngOnInit() {
    this.buildForm();
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id === undefined) {
          return;
        }
        this.clientService.getOneClient(params.id).subscribe(
          response => {
            this.loadForm(response);
            this.client = response;
          },
          error => {
            console.error(error);
          });
      });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      phone: [null, Validators.required],
    });
  }

  loadForm(client: Client) {
    this.form.patchValue({
      name: client.name,
      phone: client.phone
    });
  }

  save() {
    this.fillClient();
    this.clientService.createClient(this.client).subscribe(
      response => {
        this.closeModal();
      },
      error => {
        console.error(error);
      });
  }


  fillClient() {
    let name = this.form.controls.name.value;
    let phone = this.form.controls.phone.value;

    if (this.client === undefined) {
      this.client = new Client(name, phone);
    }
    this.client = new Client(name, phone);
  }

  closeModal() {
    this.activeModal.close();
  }

}