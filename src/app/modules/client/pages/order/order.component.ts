import { ModalPagarComponent } from '../../components/modal-pagar/modal-pagar.component';
import { ModalItemComponent } from '../../components/modal-item/modal-item.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderItem, Order } from '@shared/models';
import { OrderItemService } from '@shared/providers/order-item.service';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {

  form: FormGroup;
  orderItem: OrderItem;
  orderItems: OrderItem[];
  order: Order;
  client: Client;
  total: number;
  partial: number;

  constructor(private fb: FormBuilder,
    private router: Router,
    private orderItemService: OrderItemService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private clientService: ClientService) { }


  ngOnInit() {
    this.getIdClient();
    this.buildForm();
  }

  getIdClient() {
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id === undefined) {
          // Remover essa validação e colocar em um can activate
          return;
        }
        this.getClient(params.id);
      });
  }

  getClient(id) {
    this.clientService.getClientById(id).subscribe(
      (response: any) => {
        this.client = response;
        this.loadForm(this.client);
        //this.loadPage();
      },
      (err) => {
        console.error(err);
      });
  }


  buildForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: [null, Validators.required],
    });
  }

  loadForm(client: Client) {
    this.form.patchValue({
      name: client.name,
      phone: client.cellPhone
    });
  }

  save() {
    if (this.client) {
      this.fillClient();
      this.clientService.updateClient(this.client).subscribe(
        response => {
          this.onSaveSucess();
        },
        error => {
          console.error(error);
        });
    }
  }

  fillClient() {
    let value = this.form.value;

    this.client.name = value.name;
    this.client.cellPhone = value.phone;
  }

  onSaveSucess() {
    this.router.navigate(['/client']);
  }


  loadPage() {
    // this.orderItemService.getOrderByOrders(this.client.orders[0].idOrder).subscribe(
    //   response => {
    //     this.orderItems = response;
    //   },
    //   error => {
    //     console.error(error);
    //   });
  }


  addItem() {
    const modalRef = this.modalService.open(ModalItemComponent);
    modalRef.componentInstance.order = this.client.orders[0];
    modalRef.result.then(
      result => {
        //this.loadPage();
      });
  }

  updateItem(orderItem: OrderItem) {
    const modalRef = this.modalService.open(ModalItemComponent);
    modalRef.componentInstance.orderItem = orderItem;
    modalRef.componentInstance.order = this.client.orders[0];
    modalRef.result.then(
      result => {
        this.loadPage();
      });
  }

  delete(orderItem: OrderItem) {
    this.orderItemService.deleteOrderItem(orderItem.idOrderItem).subscribe(
      response => {
        this.loadPage();
      },
      error => {
        console.error(error);
      });
  }

  getTotal() {
    //     return this.order.items.reduce((sum, current) => sum + current.total, 0);
  }



}





