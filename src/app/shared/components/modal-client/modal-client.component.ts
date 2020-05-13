import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from '../../models/client';
import { ClientService } from '../../providers/client.service';
import { OrdersService } from '../../providers/orders.service';
import { Orders } from '../../models/orders';

@Component({
  selector: 'app-modal-client',
  templateUrl: './modal-client.component.html',
  styleUrls: ['./modal-client.component.css']
})
export class ModalClientComponent implements OnInit {

  form: FormGroup;
  client: Client;
  closeResult: string;
  orders: Orders;
  @Input() idUser: number;

  constructor(private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private clientService: ClientService,
    private ordersService: OrdersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
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
        this.orders = new Orders(response.idClient, 0, 0);
        this.ordersService.createOrders(this.orders).subscribe(
          response => {
            console.log(response.idOrders);
            this.closeModal();
          }
        )
      },
      error => {
        console.error(error);
      });
  }

  saveWithRequests() {
    this.fillClient();
    this.clientService.createClient(this.client).subscribe(
      response => {
        this.orders = new Orders(response.idClient, 0, 0);
        this.ordersService.createOrders(this.orders).subscribe(
          response => {
            console.log(response.idOrders);
            this.closeModal();        
            this.onsaveSucess(response.idClient);
          }
        )
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
