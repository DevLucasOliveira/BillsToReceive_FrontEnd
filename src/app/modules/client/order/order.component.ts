import { OrderService } from './../../../shared/providers/order.service';
import { ModalItemComponent } from './../../../shared/components/modal-item/modal-item.component';
import { ClientService } from './../../../shared/providers/client.service';
import { Client } from 'src/app/shared/models/client';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/order';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  form: FormGroup;
  order: Order;
  orders: Order[];
  client: Client;

  constructor(private fb: FormBuilder,
              private router: Router,
              private service: ClientService,
              private activatedRoute: ActivatedRoute,
              private modalService: NgbModal,
              private orderService: OrderService) { }


  ngOnInit() {
    this.buildForm();
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id === undefined) {
          return;
        }
        this.service.getOneClient(params.id).subscribe(
          response => {
            this.loadForm(response);
            this.client = response;
            if(params.id){
              this.loadPage();
            }
          },
          error => {
            console.error(error);
          });
      });
  }

  buildForm() {
    this.form = this.fb.group({
      name: '',
      phone: ''
    });
  }

  loadForm(client: Client) {
    this.form.patchValue({
      name: client.name,
      phone: client.phone
    });
  }

  save() {
    if (this.client) {
      this.fillClient();
      this.service.updateClient(this.client).subscribe(
        response => {
          this.onSaveSucess();
        },
        error => {
          console.error(error);
        });
    }
    else {
      this.fillClient();
      this.service.createClient(this.client).subscribe(
        response => {
          this.onSaveSucess();
        },
        error => {
          console.error(error);
        });
    }
  }

  onSaveSucess() {
    this.router.navigate(['/client']);
  }


  fillClient() {
    if (this.client === undefined) {
      this.client = new Client();
    }
    this.client.name = this.form.controls.name.value;
    this.client.phone = this.form.controls.phone.value;
  }


  loadPage() {
    this.orderService.getOrder().subscribe(
      response => {
        this.orders = response;
      },
      error => {
        console.error(error);
      });
  }


  addItem(idClient) {
    const data = {idClient};
    const modalRef = this.modalService.open(ModalItemComponent);


    modalRef.result.then(
      result => {
        if (result) {
          this.orderService.createOrder(this.order).subscribe(
            result => {
              this.loadPage();
            });
        }
      });

  }

  delete(order: Order){
    this.orderService.deleteOrder(order.idOrder).subscribe(
      response => {
        this.loadPage();
      },
      error => {
        console.error(error);
      });
  }


  
}





