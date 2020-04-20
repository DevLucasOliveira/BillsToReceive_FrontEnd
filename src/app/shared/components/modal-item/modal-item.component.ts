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
  client: Client;
  orders: Order[];
  order: Order;
  closeResult: string;

  constructor(private formBuilder: FormBuilder,
              public activeModal: NgbActiveModal,
              private activatedRoute: ActivatedRoute,
              private orderService: OrderService,
              ) { }


  ngOnInit() {
    this.buildForm();
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id === undefined) {
          return;
        }
        this.orderService.getOneOrder(params.id).subscribe(
          response => {
            this.loadForm(response);
            this.order = response;
          },
          error => {
            console.error(error);
          });
      });
  }

  buildForm(){
    this.form = this.formBuilder.group({
      idClient: 1036,
      productName: ['', Validators.required],
      price: [null, Validators.required],
      quantity: [1, Validators.compose([Validators.required, Validators.min(0)])],
      date: [new Date()],
      total: [0]
    });
  }

  loadForm(order: Order) {
    this.form.patchValue({
      idClient: order.idClient,
      productName: order.productName,
      price: order.price,
      quantity: order.quantity,
      date: order.date,
      total: order.total
    });
  }

  save() {
      this.fillOrder();
      this.orderService.createOrder(this.order).subscribe(
        response => {
          this.closeModal();
        },
        error => {
          console.error(error);
        });

  }

  fillOrder() {
    if (this.order === undefined) {
      this.order = new Order();
    }
    this.order.idClient = this.form.controls.idClient.value;
    this.order.productName = this.form.controls.productName.value;
    this.order.price = this.form.controls.price.value;
    this.order.quantity = this.form.controls.quantity.value;
    this.order.date = this.form.controls.date.value;
    this.order.total = this.form.controls.total.value;
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
