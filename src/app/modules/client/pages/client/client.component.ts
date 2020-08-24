import { OrderItemService } from '../../../../shared/providers/order-item.service';
import { UserService } from 'src/app/modules/authentication/services/user.service';
import { ModalConfirmationComponent } from '../../components/modal-confirmation/modal-confirmation.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalClientComponent } from 'src/app/modules/client/components/modal-client/modal-client.component';
import { OrderService } from '@shared/providers/order.service';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  form: FormGroup;
  clients: Client[];
  client: Client;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private clientService: ClientService,
    private ordersService: OrderService,
    private orderItemService: OrderItemService,
    private userService: UserService) { }

  ngOnInit() {
    this.buildForm();
    this.loadPage();
  }

  loadForm(client: Client) {
    this.form.patchValue({
      name: client.name,
      phone: client.cellPhone
    });
  }


  buildForm() {
    this.form = this.fb.group({
      name: '',
      phone: ''
    });
  }

  delete(client: Client) {
    this.confirmDelete(client);
  }


  loadPage() {
    this.clientService.getClientByUser(this.userService.getLoggedIdUser()).subscribe(
      response => {
        //this.clients = response;
      },
      error => {
        console.error(error);
      });
  }


  confirmDelete(client: Client) {
    const modalRef = this.modalService.open(ModalConfirmationComponent);
    modalRef.componentInstance.message = 'Deseja realmente excluir?';
    modalRef.result.then(
      result => {
        if (result) {
          this.clientService.deleteClient(client.id).subscribe(
            result => {
              this.loadPage();
            }
          );
        }
      });
  }


  addItem() {
    const modalRef = this.modalService.open(ModalClientComponent);
    modalRef.componentInstance.idUser = this.userService.getLoggedIdUser();
    modalRef.result.then(
      result => {
        this.loadPage();
      });
  }




}
