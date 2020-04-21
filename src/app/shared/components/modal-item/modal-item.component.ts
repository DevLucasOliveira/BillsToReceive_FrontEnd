import { OrderService } from './../../providers/order.service';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from '../../models/client';
import { Order } from '../../models/order';

@Component({
  selector: 'app-modal-item',
  templateUrl: './modal-item.component.html',
  styleUrls: ['./modal-item.component.css']
})
export class ModalItemComponent implements OnInit {

  form: FormGroup;
  orders: Order[];
  closeResult: string;
  @Input() client: Client;
  @Input() order: Order;

  constructor(private formBuilder: FormBuilder,
              public  activeModal: NgbActiveModal,
              private activatedRoute: ActivatedRoute,
              private orderService: OrderService,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.getOrder();
  }

  getOrder() {
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id === undefined) {
          this.loadForm();
          return;
        }
        this.orderService.getOneOrder(params.id).subscribe(
          response => {
            this.order = response;
            this.loadForm();
          },
          error => {
            console.error(error);
          });
      });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      idClient: 1036,
      productName: ['', Validators.required],
      price: [null, Validators.required],
      quantity: [1, Validators.compose([Validators.required, Validators.min(0)])],
      date: [new Date()],
      total: [0]
    });
  }

  loadForm() {
    this.form.patchValue({
      productName: this.order.productName,
      price: this.order.price,
      quantity: this.order.quantity,
      date: this.order.date,
      total: this.order.total
    });
  }

  save() {
    if (this.order === undefined){
      this.fillOrder();
      this.orderService.createOrder(this.order).subscribe(
        response => {
          this.closeModal();
        },
        error => {
          console.error(error);
        });
    }else{
      this.fillOrder();
      this.orderService.updateOrder(this.order).subscribe(
        response => {
          this.closeModal();
        },
        error => {
          console.error(error);
        });
    }
  }

  fillOrder() {
    let value = this.form.value;

    if (this.order === undefined){
      this.order = new Order(
        this.client.idClient,
        value.productName,
        value.price,
        value.quantity,
        value.date,
        value.total);
    }
    this.order.idClient = this.client.idClient;
    this.order.productName = value.productName;
    this.order.price = value.price;
    this.order.quantity = value.quantity;
    this.order.date = value.date;
    this.order.total = value.total;
  }

  closeModal() {
    this.activeModal.close();
  }

  updateTotal() {
    if (this.form.controls.quantity.value < 1) {
      this.form.controls.quantity.setValue(null);
    }
    this.form.controls.total.setValue(parseFloat((this.form.controls.quantity.value * this.form.controls.price.value).toFixed(2)));
  }



}
