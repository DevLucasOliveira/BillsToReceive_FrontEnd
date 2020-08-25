import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ModalConfirmationComponent } from '../../components/modal-confirmation/modal-confirmation.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
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
    private modalService: NgbModal,
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getIdUser();
    this.loadPage();
  }

  private getIdUser() {
    this.activatedRoute.params.subscribe(
      params => {
        this.idUser = params.id;
      });
  }

  private loadPage() {
    this.clientService.getClientsOfUser(this.idUser).subscribe(
      (response: any) => {
        if (!response.length) {
          this.clients == null;
          return;
        }
        this.clients = response;
      },
      (err) => {
        console.error(err);
        this.toastr.error('Ocorreu um erro interno', 'Error');
      });
  }

  public modalAddClient() {
    const modalRef = this.modalService.open(ModalClientComponent);
    modalRef.componentInstance.idUser = this.idUser;
    modalRef.result.then(
      (result) => {
        this.loadPage();
      });
  }

  public delete(client: Client) {
    this.modalConfirmDelete(client);
  }

  private modalConfirmDelete(client: Client) {
    const modalRef = this.modalService.open(ModalConfirmationComponent);
    modalRef.componentInstance.message = 'Deseja realmente excluir?';
    modalRef.result.then(
      result => {
        if (result) {
          this.deleteClient(client.id);
        }
      });
  }

  public deleteClient(id) {
    this.clientService.deleteClient(id).subscribe(
      (result) => {
        this.toastr.warning('Cliente deletado', 'Atenção');
        this.loadPage();
      },
      (err) => {
        console.error(err);
        this.toastr.error('Ocorreu um erro interno', 'Error');
      }
    );
  }


}
