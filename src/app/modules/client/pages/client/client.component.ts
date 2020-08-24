import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/modules/authentication/services/user.service';
import { ModalConfirmationComponent } from '../../components/modal-confirmation/modal-confirmation.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalClientComponent } from 'src/app/modules/client/components/modal-client/modal-client.component';
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
  idUser: string;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private clientService: ClientService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getIdUser();
    this.loadPage();
  }

  private getIdUser() {
    this.activatedRoute.params.subscribe(
      params => {
        this.idUser = params.id;
      }
    )
  }

  loadPage() {
    this.clientService.getClientByUser(this.userService.getLoggedIdUser()).subscribe(
      response => {
        // this.clients = response;
      },
      error => {
        console.error(error);
      });
  }

  delete(client: Client) {
    this.confirmDelete(client);
  }

  confirmDelete(client: Client) {
    const modalRef = this.modalService.open(ModalConfirmationComponent);
    modalRef.componentInstance.message = 'Deseja realmente excluir?';
    modalRef.result.then(
      result => {
        if (result) {
          this.clientService.deleteClient(client.user).subscribe(
            result => {
              this.loadPage();
            }
          );
        }
      });
  }

  addClient() {
    const modalRef = this.modalService.open(ModalClientComponent);
    modalRef.componentInstance.idUser = this.idUser;
    modalRef.result.then(
      result => {
        this.loadPage();
      });
  }



}
