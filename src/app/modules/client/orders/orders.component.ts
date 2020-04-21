import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from './../../../shared/providers/order.service';
import { ModalConfirmationComponent } from './../../../shared/components/modal-confirmation/modal-confirmation.component';
import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/shared/models/client';
import { ClientService } from 'src/app/shared/providers/client.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalClientComponent } from 'src/app/shared/components/modal-client/modal-client.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  form: FormGroup;
  client: Client;
  clients: Client[];

  constructor(private fb: FormBuilder,
    private router: Router,
    private service: ClientService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private clientService: ClientService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.buildForm();
    this.loadPage();
  }

  loadForm(client: Client) {
    this.form.patchValue({
      name: client.name,
      phone: client.phone
    });
  }

  buildForm() {
    this.form = this.fb.group({
      name: '',
      phone: ''
    });
  }

  delete(client: Client) {
    this.service.deleteClient(client.idClient).subscribe(
      response => {
        this.loadPage();
      },
      error => {
        console.error(error);
        this.confirmDelete(client);
      });
  }

  loadPage() {
    this.service.getClient().subscribe(
      response => {
        this.clients = response;
      },
      error => {
        console.error(error);
      });
  }

  confirmDelete(client: Client) {
    const modalRef = this.modalService.open(ModalConfirmationComponent);
    modalRef.componentInstance.message = 'Deseja realmente excluir? Esse cliente possui pedidos em aberto';
    modalRef.result.then(
      result => {
        if (result) {
          this.orderService.deleteOrdersOfClient(client.idClient).subscribe(
            result => {
              this.service.deleteClient(client.idClient).subscribe(
                result => {
                  this.loadPage();
                }
              );
            });
        }
      });
  }

  addItem() {
    const modalRef = this.modalService.open(ModalClientComponent);
    modalRef.result.then(
      result => {
        this.loadPage();
      });
  }

}
