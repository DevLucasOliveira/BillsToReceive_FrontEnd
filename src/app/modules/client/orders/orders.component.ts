import { Router } from '@angular/router';
import { OrderService } from './../../../shared/providers/order.service';
import { ModalConfirmationComponent } from './../../../shared/components/modal-confirmation/modal-confirmation.component';
import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/shared/models/client';
import { ClientService } from 'src/app/shared/providers/client.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  clients: Client[];

  constructor(private service: ClientService,
              private modalService: NgbModal,
              private orderService: OrderService
              ) { }

  ngOnInit() {
    this.loadPage();
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

}
