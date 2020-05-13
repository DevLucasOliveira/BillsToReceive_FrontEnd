import { OrdersService } from './../../../shared/providers/orders.service';
import { ModalPagarComponent } from './../../../shared/components/modal-pagar/modal-pagar.component';
import { OrderService } from './../../../shared/providers/order.service';
import { ModalItemComponent } from './../../../shared/components/modal-item/modal-item.component';
import { ClientService } from './../../../shared/providers/client.service';
import { Client } from 'src/app/shared/models/client';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Order } from 'src/app/shared/models/order';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as jsPDF from 'jspdf';
import { Orders } from 'src/app/shared/models/orders';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {

  form: FormGroup;
  order: Order;
  orderArray: Order[];
  orders: Orders;
  client: Client;
  total: number;
  partial: number;

  constructor(private fb: FormBuilder,
    private router: Router,
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private clientService: ClientService,
    private ordersService: OrdersService) { }


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
        this.clientService.getOneClient(params.id).subscribe(
          response => {
            this.getOrders(response.idClient);
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

  getOrders(idClient) {
    this.ordersService.getOrdersByClient(idClient).subscribe(
      response => {
        this.ordersService.getOneOrders(response.idOrders).subscribe(
          response => {
            console.log(response);
          });
      },
      error => {
        console.error(error)
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
      phone: client.phone
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
    this.client.phone = value.phone;
  }

  onSaveSucess() {
    this.router.navigate(['/client']);
  }


  loadPage() {
    this.ordersService.getOrdersByClient(this.client.idClient).subscribe(
      response => {
        if (response) {
          this.orderService.getOrderByOrders(this.orders.idOrders).subscribe(
            response => {
              this.orderArray = response;
              this.getTotal();
            },
            error => {
              console.error(error);
            });
        }
      },
      error => {
        console.error(error);
      });
  }


  addItem() {
    const modalRef = this.modalService.open(ModalItemComponent);
    modalRef.componentInstance.client = this.client;
    modalRef.componentInstance.orders = this.orders;
    modalRef.result.then(
      result => {
        this.loadPage();
      });
  }

  updateItem(order: Order) {
    const modalRef = this.modalService.open(ModalItemComponent);
    modalRef.componentInstance.order = order;
    modalRef.componentInstance.client = this.client;
    modalRef.result.then(
      result => {
        this.loadPage();
      });
  }

  delete(order: Order) {
    this.orderService.deleteOrder(order.idOrder).subscribe(
      response => {
        this.loadPage();
      },
      error => {
        console.error(error);
      });
  }

  getTotal() {
    this.total = this.orderArray.reduce((sum, current) => sum + current.total, 0);
  }

  @ViewChild('content') content: ElementRef;
  public SavePDF(): void {
    let content = this.content.nativeElement;
    let doc = new jsPDF();
    let _elementHandlers =
    {
      '#editor': function (element, renderer) {
        return true;
      }
    };
    doc.fromHTML(content.innerHTML, 15, 15, {

      'width': 190,
      'elementHandlers': _elementHandlers
    });

    doc.save('test.pdf');
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





