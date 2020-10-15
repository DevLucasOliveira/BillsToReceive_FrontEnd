import { ModalPagarComponent } from '../../components/modal-pagar/modal-pagar.component';
import { ModalItemComponent } from '../../components/modal-item/modal-item.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderItem, Order } from '@shared/models';
import { OrderItemService } from '@shared/providers/order-item.service';
import { OrderService } from '@shared/providers/order.service';
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
    private clientService: ClientService,
    private orderService: OrderService) { }


  ngOnInit() {
    this.buildForm();
    this.getClient();
  }

  getClient() {
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id === undefined) {
          return;
        }
        this.clientService.getClientById(params.id).subscribe(
          (response: any) => {
            this.loadForm(response);
            this.client = response;
            if (params.id) {
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
        this.loadPage();
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

  buyPartial() {
    const modalRef = this.modalService.open(ModalPagarComponent);
    modalRef.componentInstance.partial;
    modalRef.result.then(
      result => {
        debugger;
        if (this.partial == null) {
          this.partial = result;
        } else {
          this.partial += result;
        }
      },
      error => {
        console.error(error);
      }
    )
  }

}





